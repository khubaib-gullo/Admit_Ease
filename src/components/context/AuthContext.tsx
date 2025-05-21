import React, {
  createContext,
  useContext,
  useState,
  // ReactNode,
  useEffect,
} from "react";


import type {ReactNode} from "react";

type User = {
  id: string;
  fullName: string;
  email: string;
  profilePicture?: string;
  applicationStatus: "pending" | "under_review" | "approved" | "rejected";
};

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: {
    fullName: string;
    email: string;
    password: string;
  }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data
const MOCK_USERS: (User & { password: string })[] = [
  {
    id: "1",
    fullName: "John Doe",
    email: "john@example.com",
    password: "password123",
    profilePicture: "/placeholder.svg",
    applicationStatus: "under_review",
  },
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  // Check for saved session on initial load
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Failed to parse saved user:", error);
        localStorage.removeItem("user");
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API request delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const foundUser = MOCK_USERS.find(
      (u) => u.email === email && u.password === password
    );
    if (!foundUser) {
      throw new Error("Invalid email or password");
    }

    // Exclude password from user object
    const { password: _, ...userWithoutPassword } = foundUser;
    setUser(userWithoutPassword);
    localStorage.setItem("user", JSON.stringify(userWithoutPassword));
  };

  const signup = async (userData: {
    fullName: string;
    email: string;
    password: string;
  }) => {
    // Simulate API request delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Check if email already exists
    if (MOCK_USERS.some((u) => u.email === userData.email)) {
      throw new Error("Email already registered");
    }

    const newUser: User & { password: string } = {
      id: String(MOCK_USERS.length + 1),
      fullName: userData.fullName,
      email: userData.email,
      password: userData.password,
      profilePicture: "/placeholder.svg",
      applicationStatus: "pending",
    };

    MOCK_USERS.push(newUser);

    // Exclude password from user object
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem("user", JSON.stringify(userWithoutPassword));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RoleSelector from "./RoleSelector";
import SocialLoginButtons from "./SocialLoginButtons";
import { toast } from "sonner";
import { emailSignIn, fetchUserRole } from "../../lib/firebase";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { setPersistence, browserLocalPersistence } from "firebase/auth";
import { auth } from "@/lib/firebase"; // use shared instance



const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("Select Role");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const cred = await emailSignIn(email, password);
      const role =
        (await fetchUserRole(cred.user.uid)) || selectedRole || "User";

      await setPersistence(auth, browserLocalPersistence);
      toast.success("Login successful!");
      await setDoc(
      doc(db, "users", cred.user.uid),
      {
        uid: cred.user.uid,
        email: cred.user.email,
        role,
      },
      { merge: true }          // only creates/updates if missing
    );

      navigate(role === "Admin" ? "/admin" : "/apply");
    } catch (err: any) {
      toast.error(err.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="auth-card w-full max-w-md bg-white rounded-2xl overflow-hidden shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-6">Sign in</h1>

        <SocialLoginButtons role={selectedRole} />

        <RoleSelector
          onRoleChange={setSelectedRole}
          className="w-full max-w-[180px] mx-auto my-6"
        />

        <p className="text-center text-gray-600 mb-4 text-sm">
          or use your email and password
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="auth-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="auth-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-numl-purple text-white py-3 rounded-md hover:bg-numl-purple-dark transition-colors"
          >
            SIGN IN
          </button>

          <div className="flex justify-center mt-4">
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="text-sm text-numl-purple hover:underline"
            >
              Don't have an account? Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RoleSelector from "./RoleSelector";
import SocialLoginButtons from "./SocialLoginButtons";
import { toast } from "sonner";
import { emailSignUp } from "../../lib/firebase";


const SignupForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("Select Role");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill in all required fields");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (selectedRole === "Select Role") {
      toast.error("Please select a role");
      return;
    }

    try {
      await emailSignUp(name, email, password, selectedRole);
      toast.success("Account created! Please log in.");
      navigate("/login");
    } catch (err: any) {
      toast.error(err.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="auth-card w-full max-w-md bg-white rounded-2xl overflow-hidden shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-6">Sign up</h1>

        <SocialLoginButtons role={selectedRole} />

        <RoleSelector
          onRoleChange={setSelectedRole}
          className="w-full max-w-[180px] mx-auto my-6"
        />

        <p className="text-center text-gray-600 mb-4 text-sm">
          or use your email to register
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            className="auth-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

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

          <input
            type="password"
            placeholder="Confirm Password"
            className="auth-input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-numl-purple text-white py-3 rounded-md hover:bg-numl-purple-dark transition-colors"
          >
            SIGN UP
          </button>

          <div className="flex justify-center mt-4">
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-sm text-numl-purple hover:underline"
            >
              Already have an account? Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;

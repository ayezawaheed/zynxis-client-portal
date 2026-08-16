import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaLock, FaEnvelope } from "react-icons/fa";
import FormInput from "../components/FormInput";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        {
          email,
          password,
        }
      );

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      console.log("Login successful");

      navigate("/dashboard");
    } catch (error) {
      console.error(
        "Login failed:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo / Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800">
            Zynxis
          </h1>

          <p className="text-slate-500 mt-2">
            Client Portal
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-slate-800 mb-2">
            Welcome Back
          </h2>

          <p className="text-slate-500 mb-6">
            Sign in to your account
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <FormInput
              label="Email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={FaEnvelope}
              required
            />

            {/* Password */}
            <FormInput
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={FaLock}
              required
            />

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
            >
              Sign In
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-slate-500 mt-6">
          Zynxis Client Portal
        </p>
      </div>
    </div>
  );
}

export default Login;
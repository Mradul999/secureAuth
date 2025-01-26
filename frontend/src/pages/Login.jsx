import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Fill both username and password");
      return;
    }

    try {
      const response = await axios.post("/api/auth/login", {
        username,
        password,
      });

      if (response.status === 200) {
        // console.log(response.data);

        sessionStorage.setItem("user", response.data.user);
        alert("Login successful!");

        // Navigate to the dashboard or home page
        navigate("/2fa");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          alert("User not registered ");
        } else if (error.response.status === 401) {
          alert("Invalid credentials");
        } else {
          alert("An error occurred while trying to login.");
        }
      }
    }
  };

  return (
    <div className="bg-gray-100 h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Login
          </h2>
          <div className="relative">
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Username"
              required
            />
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"} 
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)} 
              className="absolute right-2 top-2 text-sm text-blue-600 hover:underline focus:outline-none"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <a
              href="/Signup"
              onClick={(e) => {
                e.preventDefault();
                navigate("/signup");
              }}
              className="text-blue-600 hover:underline"
            >
              Sign Up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

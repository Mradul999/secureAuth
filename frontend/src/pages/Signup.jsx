import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLoginClick = (e) => {
    e.preventDefault();
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Fill both username and password");
      return;
    }

    try {
      const response = await axios.post("/api/auth/register", {
        username,
        password,
      });

      if (response.status === 200) {
        alert("User created successfully");
        
        navigate("/login");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="bg-gray-100 h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Sign Up
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
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>
          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a
              href="/Login"
              onClick={handleLoginClick}
              className="text-blue-600 hover:underline"
            >
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    checkStatus();
  }, []);
  const checkStatus = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/auth/status`,
        { withCredentials: true }
      );
      setStatus(response.data);
    } catch (error) {
      console.error("Error checking status:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-6">
      <div className="max-w-3xl text-center">
        <h1 className="text-4xl font-extrabold mb-4 drop-shadow-lg">
          Secure Your Account with <span className="text-blue-400">Two-Factor Authentication (2FA)</span>
        </h1>
        <p className="text-lg leading-relaxed mb-6 text-gray-300">
          Protect your online presence by enabling 2FA. This extra layer of security ensures that 
          only you can access your account, even if someone else knows your password. 
          <br /><br />
          2FA works by requiring a second step of verification, such as a one-time code sent to your 
          phone or email. This makes it significantly harder for hackers to gain unauthorized access.
        </p>
        <div className="bg-gray-800 text-gray-300 p-6 rounded-lg shadow-lg mb-6">
          <h2 className="text-2xl font-bold mb-3 text-blue-400">Why Enable 2FA?</h2>
          <ul className="list-disc list-inside text-left space-y-2">
            <li><strong className="text-blue-300">Enhanced Security:</strong> Even if your password is compromised, your account remains safe.</li>
            <li><strong className="text-blue-300">Prevent Unauthorized Access:</strong> Blocks hackers from logging in without verification.</li>
            <li><strong className="text-blue-300">Quick & Easy Setup:</strong> Enable 2FA in just a few simple steps.</li>
          </ul>
        </div>
        <button
          onClick={() => navigate("/2fa")}
          className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-transform transform hover:scale-105"
        >
          Set Up 2FA Now
        </button>
      </div>
    </div>
  );
};

export default Home;

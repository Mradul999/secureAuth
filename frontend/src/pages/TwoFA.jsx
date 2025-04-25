import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TwoFA = () => {
  const [status, setStatus] = useState(null);
  const [qrCode, setQrCode] = useState("");
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");

  const user = sessionStorage.getItem("user");

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

  const setup2FA = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/2fa/setup`
      );
      setQrCode(response.data.qrcode);
      setMessage("Scan the QR code with your authenticator app");
    } catch (error) {
      console.error("Error setting up 2FA:", error);
      setMessage("Error setting up 2FA");
    }
  };

  const verify2FA = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/2fa/verify`,
        { token }
      );
      setMessage(response.data.message);
      navigate("/success");
    } catch (error) {
      console.error("Error verifying 2FA:", error);
      setMessage("Invalid 2FA token");
    }
  };

  const reset2FA = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/2fa/reset`);
      setStatus(null);
      setQrCode("");
      setMessage("2FA reset successfully");
    } catch (error) {
      console.error("Error resetting 2FA:", error);
      setMessage("Error resetting 2FA");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white px-4">
      <div className="bg-gray-800 p-10 my-10 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-400">
          Two-Factor Authentication
        </h1>

        {status && (
          <div className="mb-4 text-gray-300">
            <p className="text-sm">Status: {status.message}</p>
            <p className="text-sm">Username: {status.username}</p>
            <p className="text-sm">
              MFA Active: {status.isMFAactive ? "Yes" : "No"}
            </p>
          </div>
        )}

        {!status && (
          <button
            onClick={checkStatus}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
          >
            Check Status
          </button>
        )}

        {status && !status.isMFAactive && (
          <button
            onClick={setup2FA}
            className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-200 mt-4"
          >
            Setup 2FA
          </button>
        )}

        {qrCode && (
          <div className="mt-4 flex flex-col items-center">
            <img
              src={qrCode || "/placeholder.svg"}
              alt="QR Code"
              className="rounded-lg shadow-md"
            />
            <p className="text-sm text-gray-400 mt-2 text-center">
              Scan this QR code with your authenticator app
            </p>
          </div>
        )}

        {qrCode && (
          <div className="mt-4">
            <input
              type="text"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Enter 2FA token"
              className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={verify2FA}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200 mt-2"
            >
              Verify 2FA
            </button>
          </div>
        )}

        {status && status.isMFAactive && (
          <button
            onClick={reset2FA}
            className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-200 mt-4"
          >
            Reset 2FA
          </button>
        )}

        {message && (
          <p className="mt-4 text-sm text-center text-gray-400">{message}</p>
        )}
      </div>
    </div>
  );
};

export default TwoFA;

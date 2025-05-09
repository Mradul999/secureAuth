import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TwoFA = () => {
  const [isMFAactive, setIsMFAactive] = useState(false);
  const [qrCode, setQrCode] = useState("");
  const [token, setToken] = useState("");
  console.log(token);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const fetchStatus = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/auth/status`,
        {
          withCredentials: true,
        }
      );
      setIsMFAactive(res.data.isMFAactive);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  const handleEnable2FA = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/setup2fa`,
        {},
        { withCredentials: true }
      );
      setQrCode(res.data.qrcode);
      setError("");
      setSuccess("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to set up 2FA");
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();

    try {
      // console.log("Verifying 2FA with token:", token);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/verify2fa`,
        { token },
        { withCredentials: true }
      );

      if (response.status === 200) {
        // console.log("2FA verification successful:", response.data);
        setSuccess("2FA verification successful");
        setError("");
        // Update user status in session storage
        // const userData = JSON.parse(sessionStorage.getItem("user"));
        // userData.isMFAactive = true;
        // sessionStorage.setItem("user", JSON.stringify(userData));
      }
    } catch (error) {
      console.error("2FA verification error:", error);
      if (error.response.status === 400) {
        alert("Invalid code");
      }
    }
  };

  const handleReset2FA = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/reset2fa`,
        { withCredentials: true }
      );
      setSuccess("2FA has been reset.");
      setIsMFAactive(false);
      setQrCode("");
      setToken("");
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reset 2FA");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Two-Factor Authentication</h1>

      {isMFAactive ? (
        <>
          <p className="text-green-600 font-semibold mb-4">
            2FA is already enabled ✅
          </p>
          <button
            onClick={handleReset2FA}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 mb-4"
          >
            Reset 2FA
          </button>
        </>
      ) : (
        <>
          {!qrCode ? (
            <button
              onClick={handleEnable2FA}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Enable 2FA
            </button>
          ) : (
            <>
              <p className="mb-2">
                Scan the QR token below in your Authenticator app:
              </p>
              <img src={qrCode} alt="QR Code" className="mb-4 w-56" />

              <form onSubmit={handleVerifyCode} className="w-full max-w-sm">
                <label className="block mb-1 text-gray-700">
                  Enter 6-digit token:
                </label>
                <input
                  type="text"
                  maxLength="6"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded mb-3"
                  required
                />
                {error && <p className="text-red-500 mb-2">{error}</p>}
                {success && <p className="text-green-500 mb-2">{success}</p>}
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
                >
                  Verify Code
                </button>
              </form>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default TwoFA;

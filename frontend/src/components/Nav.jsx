import React from "react";



import { useNavigate } from "react-router-dom";

const Nav = () => {
  const user = sessionStorage.getItem("user");

  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("user");

    navigate("/");

    try {
      
    } catch (error) {
      
    }
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <h1 className="text-xl font-bold">SecureAuth</h1>
      <div>
        {user ? (
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Nav;

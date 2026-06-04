import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold">School Management System</h1>
      <div className="flex items-center gap-4">
        <span>{user?.name || "Guest"}</span>
        {user && (
          <button
            onClick={logout}
            className="px-3 py-1 bg-red-500 text-white rounded"
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;

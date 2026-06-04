import React from "react";

const Button = ({ children, onClick, variant = "primary" }) => {
  const styles =
    variant === "primary"
      ? "bg-blue-600 text-white hover:bg-blue-700"
      : "bg-gray-200 hover:bg-gray-300";

  return (
    <button onClick={onClick} className={`px-4 py-2 rounded ${styles}`}>
      {children}
    </button>
  );
};

export default Button;

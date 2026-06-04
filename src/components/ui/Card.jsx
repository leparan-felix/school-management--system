import React from "react";

const Card = ({ title, children }) => (
  <div className="bg-white rounded-xl shadow p-4">
    {title && <h3 className="text-lg font-semibold mb-2">{title}</h3>}
    {children}
  </div>
);

export default Card;

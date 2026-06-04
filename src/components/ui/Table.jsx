import React from "react";

const Table = ({ columns, data }) => (
  <table className="min-w-full bg-white border">
    <thead>
      <tr>
        {columns.map((col) => (
          <th key={col} className="px-4 py-2 border-b bg-gray-100 text-left">
            {col}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {data.map((row, i) => (
        <tr key={i} className="hover:bg-gray-50">
          {columns.map((col) => (
            <td key={col} className="px-4 py-2 border-b">
              {row[col]}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

export default Table;

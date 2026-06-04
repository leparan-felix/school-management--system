import React, { useState } from "react";

const FileUpload = ({ onUpload }) => {
  const [file, setFile] = useState(null);

  const handleChange = (e) => setFile(e.target.files[0]);
  const handleSubmit = () => file && onUpload(file);

  return (
    <div className="flex items-center gap-2">
      <input type="file" onChange={handleChange} />
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-3 py-1 rounded"
      >
        Upload
      </button>
    </div>
  );
};

export default FileUpload;

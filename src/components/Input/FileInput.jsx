import React, { useState } from "react";

function FileInput({
  labelTitle,
  containerStyle,
  defaultValue,
  updateFormValue,
  updateType,
}) {
  const [selectedFile, setSelectedFile] = useState(defaultValue);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    updateFormValue({ updateType, value: file });
  };

  return (
    <div className={`flex flex-col ${containerStyle}`}>
      <label className="label">
        <span className={"label-text text-base-content text-lg"}>{labelTitle}</span>
      </label>
      <div className="mt-1 flex items-center space-x-2">
        <label
          htmlFor="file-upload"
          className="relative cursor-pointer flex items-center justify-center w-full h-10 px-3 py-2 border rounded-md font-medium border-gray-600 text-white">
          <span className="label-text text-base-content text-lg">Select File</span>
          <input
            id="file-upload"
            name="file-upload"
            type="file"
            className="sr-only border bg-transparent px-4 py-3.5 pr-8 rounded-lg"
            onChange={handleFileChange}
          />
        </label>
      </div>
      {selectedFile && (
        <span className="text-sm text-gray-400 mt-1">
          Selected image: {selectedFile.name}
        </span>
      )}
    </div>
  );
}

export default FileInput;

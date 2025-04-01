
import React, { useState, ChangeEvent } from 'react';

interface FileUploadProps {
  onFileSelect: (file: File | null) => void; // Callback to notify parent about the selected file
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>('No file chosen');

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setSelectedFile(file);
    setFileName(file ? file.name : 'No file chosen');
    onFileSelect(file); // Notify parent component
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-4 border border-dashed border-gray-300 rounded-lg">
      <label
        htmlFor="file-upload"
        // Standardized button style
        className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300 shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Choose File
      </label>
      <input
        id="file-upload"
        type="file"
        className="hidden" // Hide the default input
        onChange={handleFileChange}
        accept="audio/*,video/*" // Accept common audio/video formats
      />
      <span className="text-sm text-gray-500 mt-2">{fileName}</span>
    </div>
  );
};

export default FileUpload;

import { useState } from "react";
import { UploadIcon } from 'lucide-react';

const Upload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [progress, setProgress] = useState(0);


  return (
    <div className="upload">
      {!file ? (
        <div className={`upload-dropzone ${isDragging ? 'dragging' : ''}`}>
          <input
            type="file"
            className="drop-input"
            accept=".jpeg, .png, .webp"
          />

          <div className="drop-content">
            <div className="drop-icon">
              <UploadIcon size={20} lightingColor="bg-grey-dark"/>
            </div>
          </div>

        </div>
      ) : (
        <div className="upload-file"> </div>
      )}  
    </div>
  );
};

export default Upload;

import { useState, useCallback, useEffect, useRef } from "react";
import { CheckCircle2, ImageIcon, UploadIcon } from 'lucide-react';
import { PROGRESS_INCREMENT, REDIRECT_DELAY_MS, PROGRESS_INTERVAL_MS } from "./lib/constants.ts";

interface UploadProps {
    onComplete?: (base64Data: string) => void;
}

const Upload = ({ onComplete }: UploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
      return () => {
          if (intervalRef.current) {
              clearInterval(intervalRef.current);
              intervalRef.current = null;
          }
          if (timeoutRef.current) {
              clearTimeout(timeoutRef.current);
              timeoutRef.current = null;
          }
      };
  }, []);

  const processFile = useCallback((file: File) => {
    setFile(file);
    setProgress(0);

    const reader = new FileReader();
    reader.onerror = () => {
      setFile(null);
      setProgress(0);
    };
    reader.onloadend = () => {
      const base64Data = reader.result as string;

      intervalRef.current = setInterval(() => {
          setProgress((prev) => {
              const next = prev + PROGRESS_INCREMENT;
              if (next >= 100) {
                  if (intervalRef.current) {
                      clearInterval(intervalRef.current);
                      intervalRef.current = null;
                  }
                  timeoutRef.current = setTimeout(() => {
                      onComplete?.(base64Data);
                      timeoutRef.current = null;
                  }, REDIRECT_DELAY_MS);
                  return 100;
              }
              return next;
          });
      }, PROGRESS_INTERVAL_MS);
    };
  reader.readAsDataURL(file);
  }, [onComplete]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    const allowedTypes = ['image/jpeg', 'image/png'];
    if (droppedFile && allowedTypes.includes(droppedFile.type)) {
        processFile(droppedFile);
    }
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0];
      if (selectedFile) {
          processFile(selectedFile);
      }
  };

  return (
    <div className="upload">
      {!file ? (
        <div 
          className={`upload-dropzone ${isDragging ? 'dragging' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            type="file"
            className="drop-input"
            accept=".jpeg, .png, .webp"
            onChange={handleChange}
          />

          <div className="drop-content">
            <div className="drop-icon">
              <UploadIcon size={20} lightingColor="bg-grey-dark"/>
            </div>

            <p>Drag and drop your file here, or click to select a file.</p>
          </div>

        </div>
      ) : (
        <div className="upload-status"> 
          <div className="status-content">
            <div className="status-icon">
              {progress === 100 ? (
                <CheckCircle2 size={20} lightingColor="bg-green-dark" />
              ) : (
                <ImageIcon size={20} lightingColor="bg-grey-dark" />
              )}
            </div>

            <div className="status-details">
              <h3>{file.name}</h3>
              <div className="progress">
                <div className="progress-bar" style={{ width: `${progress}%` }} />
              </div>
              <p className="status-text">{progress < 100 ? 'Generating Floor Plan' : `Redirecting... ${progress}%`}</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Upload;

import { useState } from 'react';
import { generate3DView } from './ai.actions';

export const roomGeneration = () => {
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUploadComplete = (base64Data: string) => {
    setCurrentImage(null);
    setError(null);
    setSourceImage(base64Data);
  };

  
  const handleGenerate = async () => {
    if (!sourceImage) return;

    setError(null);
    setIsProcessing(true);

    try {
      const result = await generate3DView({ sourceImage });

      if (result.renderedImage) {
        setCurrentImage(result.renderedImage);
      } else {
        setError('Generation returned no image. Please try again.');
      }
    } catch (err) {
      console.error('Generation failed: ', err);
      setError('Generation failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleExport = () => {
    if (!currentImage) return;

    const link = document.createElement('a');
    link.href = currentImage;
    link.download = `roomify-design.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return {
    sourceImage,
    currentImage,
    isProcessing,
    error,
    handleUploadComplete,
    handleGenerate,
    handleExport,
  };
};
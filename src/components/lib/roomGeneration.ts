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
    link.download = `ai-design.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async () => {
    if (!currentImage) return;

    try {
      const response = await fetch(currentImage);
      const blob = await response.blob();
      const file = new File([blob], 'ai-design.png', { type: blob.type || 'image/png' });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'Room Rendered',
        });
      } else {
        setError('Sharing isn\'t supported in this browser D:.');
      }
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        console.error('Share failed:', err);
        setError('Something went wrong while sharing D:.');
      }
    }
  };

  return {
    sourceImage,
    currentImage,
    isProcessing,
    error,
    handleUploadComplete,
    handleGenerate,
    handleExport,
    handleShare
  };
};
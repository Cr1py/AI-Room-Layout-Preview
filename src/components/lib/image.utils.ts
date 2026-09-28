interface ResizedImage {
  dataUrl: string;
  width: number;
  height: number;
}

export const resizeImageIfNeeded = (dataUrl: string, maxDimension: number): Promise<ResizedImage> => {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => {
      const { width, height } = img;
      const largestSide = Math.max(width, height);

      if (largestSide <= maxDimension) {
        resolve({ dataUrl, width, height });
        return;
      }

      const scale = maxDimension / largestSide;
      const targetWidth = Math.round(width * scale);
      const targetHeight = Math.round(height * scale);

      const canvas = document.createElement('canvas');
      canvas.width = targetWidth;
      canvas.height = targetHeight;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Canvas not supported'));
        return;
      }

      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
      resolve({ dataUrl: canvas.toDataURL('image/png'), width: targetWidth, height: targetHeight });
    };

    img.onerror = () => reject(new Error('Failed to load image for resizing'));
    img.src = dataUrl;
  });
};
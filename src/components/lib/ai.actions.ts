import puter from "@heyputer/puter.js";
import { AI_RENDER_PROMPT } from "./constants";

interface Generate3DViewParams {
    sourceImage: string;
    width: number;
    height: number;
}

export const fetchAsDataUrl = async (url: string): Promise<string> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch image: ${response.statusText}`);
  }

  // converts response into a blob
  const blob = await response.blob();

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

export const generate3DView = async ({ sourceImage, width, height }: Generate3DViewParams) => {
    const dataUrl = sourceImage.startsWith('data:')
      ? sourceImage
      : await fetchAsDataUrl(sourceImage);

    const base64Data = dataUrl.split(',')[1];
    const mimeType = dataUrl.split(';')[0].split(':')[1];

    if (!mimeType || !base64Data) throw new Error('Invalid source image payload');

    const response = await puter.ai.txt2img(AI_RENDER_PROMPT, {
      provider: "gemini",
      model: "gemini-3.1-flash-image-preview",
      input_image: base64Data,
      input_image_mime_type: mimeType,
      ratio: { w: width, h: height },
    });

    const rawImageUrl = (response as HTMLImageElement).src ?? null;

    if (!rawImageUrl) return { renderedImage: null };

    const renderedImage = rawImageUrl.startsWith('data:')
      ? rawImageUrl
      : await fetchAsDataUrl(rawImageUrl);

    return { renderedImage };
}
import { useEffect, useState } from "react";
import { checkImageExists } from "@/utils/checkImageExists";

export const useImageUrls = (imagePaths: (string | File)[]) => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      const promises = imagePaths.map(async (path) => {
        const imageUrl = `${import.meta.env.VITE_API_URL}/${path}`;
        const imageExists = await checkImageExists(imageUrl);

        return imageExists
          ? imageUrl
          : `${import.meta.env.VITE_API_URL}/not-found.jpeg`;
      });

      const results = await Promise.all(promises);
      setImageUrls(results);
    };

    fetchImages();
  }, [imagePaths]);

  return imageUrls;
};

import { useEffect, useState } from "react";
import { checkImageExists } from "@/utils/checkImageExists";

export const useImageUrls = (imagePaths: (string | File)[]) => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      const promises = imagePaths.map(async (path) => {
        const imageUrl =
          typeof path === "string"
            ? `${
                import.meta.env.PROD
                  ? import.meta.env.VITE_API_PROD_URL
                  : import.meta.env.VITE_API_DEV_URL
              }/${path}`
            : URL.createObjectURL(path);

        const imageExists = await checkImageExists(imageUrl);

        return imageExists
          ? imageUrl
          : `${
              import.meta.env.PROD
                ? import.meta.env.VITE_API_PROD_URL
                : import.meta.env.VITE_API_DEV_URL
            }/not-found.jpeg`;
      });

      const results = await Promise.all(promises);
      setImageUrls(results);
    };

    fetchImages();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(imagePaths)]);

  return imageUrls;
};

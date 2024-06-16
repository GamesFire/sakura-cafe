export const loadCarouselImages = (): string[] => {
  const images = import.meta.glob("/public/images/carousel/*.jpg", {
    query: "?url",
    import: "default",
  });

  const imagesList = Object.keys(images).map((imagePath) => {
    const parts = imagePath.split("/");

    if (parts.length === 0) {
      throw new Error("Неправильний шлях до зображення.");
    }

    const fileName = parts[parts.length - 1];

    return fileName;
  });

  if (imagesList.length === 0) {
    throw new Error("Зображень з каруселлю не знайдено.");
  }

  return imagesList;
};

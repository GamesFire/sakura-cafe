export const createFormData = (requestData: any): FormData => {
  const formData = new FormData();

  for (const key in requestData) {
    if (Object.prototype.hasOwnProperty.call(requestData, key)) {
      const value = requestData[key];

      if (value instanceof File) {
        formData.append(key, value);
      } else if (Array.isArray(value)) {
        if (value.length > 0) {
          value.forEach((item) => {
            formData.append(key, String(item));
          });
        }
      } else {
        formData.append(key, String(value));
      }
    }
  }

  return formData;
};

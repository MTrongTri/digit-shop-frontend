import httpClient from "@/utils/request";

const upload = async (formData, onProgress) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress: (progressEvent) => {
      if (progressEvent.lengthComputable) {
        const percent = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total,
        );
        onProgress(percent);
      }
    },
  };

  try {
    const { data } = await httpClient.post("/medias", formData, config);
    return data;
  } catch (error) {
    throw error;
  }
};

export { upload };

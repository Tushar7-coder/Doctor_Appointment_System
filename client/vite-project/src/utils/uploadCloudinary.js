const uploadImageToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET); // ✅ Use Vite env variable
  formData.append("cloud_name", import.meta.env.VITE_CLOUD_NAME);

  try {
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    console.log("Cloudinary Response:", data); // ✅ Log response to debug

    if (!res.ok) {
      throw new Error(`Cloudinary Error: ${data.error?.message || "Unknown error"}`);
    }

    return data;
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
};

export default uploadImageToCloudinary;

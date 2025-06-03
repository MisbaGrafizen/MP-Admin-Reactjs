const hpanelUpload = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch("https://storage.server.grafizen.in/upload.php", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    console.log("Upload result:", result); // For future debugging

    if (result?.fileUrl) {
      return result.fileUrl; // ✅ correct key
    }

    console.error("Upload failed:", result);
    return null;
  } catch (error) {
    console.error("Upload error:", error);
    return null;
  }
};

export default hpanelUpload;

import uploadToCloudinary from "../utils/uploadToCloudinary.js";

const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "failed to upload file",
      });
    }

    const result = await uploadToCloudinary(req.file.buffer, {
      folder: "ats-resume",
      resource_type: "auto",
    });

    res.status(200).json({
      success: true,
      message: "file uploaded successfully",
      file: {
        url: result.secure_url,
        publicId: result.public_id,
        format: result.format,
        size: result.bytes,
      },
    });
  } catch (error) {
    console.error("Cloudinary upload error:", error);

    res.status(500).json({
      success: false,
      message: "File upload failed",
    });
  }
};

export {
  uploadFile,
};

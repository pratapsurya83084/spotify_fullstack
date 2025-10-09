import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.cloud_Name,
  api_key: process.env.Cloud_Api_key,
  api_secret: process.env.Cloud_Api_Secret,
});

const uploadOnCloudinary = async (localFilePath) => {
  if (!localFilePath) return null;

  try {
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto", // auto detects image, video, audio
    });

    return {
      url: response.secure_url || response.url,
      public_id: response.public_id,
    };
  } catch (error) {
    console.error("Cloudinary upload failed:", error.message);
    if (fs.existsSync(localFilePath)) fs.unlinkSync(localFilePath);
    return null;
  }
};

export { uploadOnCloudinary };

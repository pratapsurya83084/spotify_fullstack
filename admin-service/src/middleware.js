import axios from "axios";
import multer from "multer";


export const getUserProfile = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "Please Login",
        success: false,
      });
    }

    // Forward cookie to user-service
    const response = await axios.get(`${process.env.user_url}/api/v1/user/me`, {
      headers: { Cookie: `token=${token}` },
      withCredentials: true,
    });

    req.user = response.data.userProfile;
    next(); // pass control to AdminController
  } catch (error) {
    return res.status(error.response?.status || 500).json({
      success: false,
      message: error.response?.status || "Internal Server Error",
      error: error.message,
    });
  }
};




// middleware for upload media file first multer and then db store

const storage = multer.memoryStorage();

export const uploadFile = multer({ storage }).single("file");

export default uploadFile;


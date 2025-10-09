import axios from "axios";


export const isAuth = async (req, res, next) => {
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





import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images"); // make sure this path exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // unique filename
  },
});




const storageSong = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/songs");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
   
  },
});



const storageThumnail = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/thumbnail");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
   
  },
});





export const upload = multer({ storage });

export const uploadSong = multer({ storage: storageSong });

export const uploadThumnail = multer({ storage: storageThumnail });


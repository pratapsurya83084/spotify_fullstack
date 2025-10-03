import axios from "axios";

export const getUserProfile = async (req, res, next) => {
  try {
    const token = req.cookies.token;  // still needed

    if (!token) {
      return res.status(401).json({
        message: "Please Login",
        success: false,
      });
    }

    // forward cookie instead of Authorization header
    const response = await axios.get("http://localhost:5000/api/v1/user/me", {
      headers: {
        Cookie: `token=${token}`,
      },
    });

    req.user = response.data.user;
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching profile from user-service",
      error: error.message,
    });
  }
};

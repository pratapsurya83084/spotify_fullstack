import jwt from "jsonwebtoken";

export const AuthUser = (req, res, next) => {
  try {
    const token = req.cookies.token;
    // console.log(token);
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized: Token not found",
        success: false,
      });
    }

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRETE_KEY);

    req.user = decoded._id; // attach user id to request
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized: " + error.message,
      success: false,
    });
  }
};

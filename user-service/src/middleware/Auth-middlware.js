import jwt from "jsonwebtoken";

export const Verify_userIs_otpVerify = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Please Login first", IsLogged: false });

    const decoded = jwt.verify(token, process.env.JWT_SECRETE_KEY);

    // if (!decoded.login_verified)
    //   return res.status(401).json({ message: "Login not verified", IsLogged: false });

    if (!decoded.otp_verified)
      return res.status(403).json({ message: "session expired, Login please", OTPVerified: false, IsLogged: true });

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized, Login please", IsLogged: false });
  }
};




import jwt from "jsonwebtoken";

export const Verify_User_Islogged = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Not logged in", IsLogged: false });

    const decoded = jwt.verify(token, process.env.JWT_SECRETE_KEY);

    if (!decoded.login_verified)
      return res.status(401).json({ message: "Login not verified", IsLogged: false });

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized ,please Login", IsLogged: false });
  }
};




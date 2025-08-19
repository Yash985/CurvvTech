import jwt from "jsonwebtoken";

export const AuthenticateUser = (req, res, next) => {
  const token = req.cookies["token"];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {};
    req.user.id = decoded;
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid Token.Please Login" });
  }
};

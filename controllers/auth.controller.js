import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SignUpSchema, LoginSchema } from "../validations/auth.validation.js";
export const SignUp = async (req, res) => {
  const isValid = SignUpSchema.safeParse(req.body);
  if (!isValid.success) {
    const errorMessages = isValid.error.issues.map((err) => {
      return `${err.message}`;
    });
    return res.status(400).json({
      success: false,
      message: "Validation Failed",
      errors: errorMessages,
    });
  }
  const { name, password, email, role } = isValid.data;
  const user = await User.findOne({ email });
  if (user)
    return res
      .status(400)
      .json({ success: false, message: "User already exists" });
  if (password.length <= 5)
    return res.status(400).json({
      success: false,
      message: "Password must be aleast 6 characters",
    });
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    role,
  });

  try {
    await newUser.save();
    return res
      .status(201)
      .json({ success: true, message: "User registered successfully" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Error saving the user" });
  }
};

export const Login = async (req, res) => {
  try {
    const isValid = LoginSchema.safeParse(req.body);
    if (!isValid.success) {
      const errorMessages = isValid.error.issues.map((err) => {
        return `${err.message}`;
      });
      return res.status(400).json({
        success: false,
        message: "Validation Failed",
        errors: errorMessages,
      });
    }
    const { password, email } = isValid.data;

    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "User does not exists" });

    const passwordMatched = await bcrypt.compare(password, user.password);
    if (!passwordMatched)
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });

    const token = jwt.sign(user._id.toString(), process.env.JWT_SECRET);
    res.cookie("token", token, {
      maxAge: 30 * 60 * 1000,//30 minds
    });
    user.password = "undefined";
    return res.status(200).json({ sucess: true, token, user });
  } catch (err) {
    console.log("Error has occured", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

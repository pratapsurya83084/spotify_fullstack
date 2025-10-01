import { User } from "../model/user.model.js";
import bcrypt, { compareSync } from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashpassword = await bcrypt.hash(password, 10);

    // Create new user
    const createdUser = await User.create({
      name,
      email,
      password: hashpassword,
      role,
    });

    // const token = jwt.sign(
    //   { _id: createdUser._id },
    //   process.env.JWT_SECRETE_KEY,
    //   { expiresIn: "2d" }
    // );

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      // token,
      user: createdUser,
    });
  } catch (error) {
    console.error("Error while registering user:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//function for create a 6 digit code and
function generateCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// console.log(generateCode)

//send verification code on that logged user
// Example email sender

async function sendVerificationEmail(to, code) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL, // Gmail account
        pass: process.env.EMAIL_PASSWORD, //'muee uqoc cjcb pibs' //'qjrtkoxazcinowt',                // App password
      },
    });

    const info = await transporter.sendMail({
      from: process.env.EMAIL, // Must match authenticated Gmail
      to,
      subject: "Your spotify Verification Code",
      html: `Your verification code is: <b>${code}</b>`,
    });

    // console.log("Email sent: ", info.response);
    return { success: true };
  } catch (err) {
    console.error("Email sending failed:", err.message);
    return { success: false, error: err.message };
  }
}

//login user

export const LoginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.json({ message: "All fields are required", success: false });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "User not found", success: false });
    }

    const isPassCorrect = compareSync(password, user.password);
    if (!isPassCorrect) {
      return res.json({ message: "Incorrect password", success: false });
    }

    // Generate temporary token (login verified, OTP pending)
    const tempToken = jwt.sign(
      { _id: user._id, login_verified: true, otp_verified: false },
      process.env.JWT_SECRETE_KEY,
      { expiresIn: "5m" } // short-lived token
    );

    res.cookie("token", tempToken, {
      maxAge: 5 * 60 * 1000, // 5 min for temp token
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
    });

    // Generate OTP
    const code = generateCode();
    user.verifyCode = code;
    user.verifyCodeExpiry = Date.now() + 30 * 1000; // 30 seconds
    await user.save();

    // Send email
    const emailResult = await sendVerificationEmail(user.email, code);
    if (!emailResult.success) {
      return res.json({
        message: "Failed to send verification email",
        success: false,
      });
    }

    return res.json({
      tempToken:tempToken,
      verifyCode :code,
      message: "Login successful. Verification code sent.",
      success: true,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.json({ message: error.message, success: false });
  }
};

// check verify code

export const VerifyCode = async (req, res) => {
  try {
    
    const { verifyCode } = req.body;
    
    if (!verifyCode) {
      return res.json({ message: "Please enter verification code", success: false });
    }

    const userId = req.user._id;
    const otpVerified = req.user.otp_verified;
    console.log("user is founded :",userId +" "+ otpVerified);



    const user = await User.findById(userId);
    if (!user) {
      return res.json({ message: "User not found or unauthorized", success: false });
    }

    // Check OTP
    if (user.verifyCode !== verifyCode) {
      return res.json({ message: "Invalid verification code", success: false });
    }

    // Check expiry
    if (Date.now() > user.verifyCodeExpiry) {
      user.verifyCode = null;
      user.verifyCodeExpiry = null;
      await user.save();
      return res.json({ message: "Code expired. Please request a new one.", success: false });
    }

    // OTP verified: clear OTP fields
    user.verifyCode = null;
    user.verifyCodeExpiry = null;
    await user.save();

    // Generate final token with OTP verified
    const finalToken = jwt.sign(
      { _id: user._id, login_verified: true, otp_verified: true },
      process.env.JWT_SECRETE_KEY,
      { expiresIn: "2d" } // long-lived token
    );

    res.cookie("token", finalToken, {
      maxAge: 2 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
    });

    return res.json({ 

      message: "Verification successful", 
      finalToken:finalToken, 
      success: true 
    });

  } catch (error) {
    console.error("VerifyCode error:", error);
    return res.json({ message: error.message, success: false });
  }
};






//get All user

export const getUser = async(req,res)=>{
try {
  const isUser_verified_with_Otp = req.user.otp_verified;
  
  // console.log("isUser_verified_with_login_verified is verified :" , isUser_verified_with_login_verified);
  console.log("otp is verified :" , isUser_verified_with_Otp); //true


 if (isUser_verified_with_Otp) {

    const users = await User.find();

    return res.json({
      message:"All user retrieve successfully",
      users

    })
  }

  return res.json({
    message:"Unauthorized user not retrieve UserList",
    success:false
  })


} catch (error) {
  console.log("error while fetching user :" ,error);
}
}
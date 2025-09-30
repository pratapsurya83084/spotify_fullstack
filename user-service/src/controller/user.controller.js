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

    const token = jwt.sign(
      { _id: createdUser._id },
      process.env.JWT_SECRETE_KEY,
      { expiresIn: "2d" }
    );

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
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
        user: process.env.EMAIL ,   // Gmail account
        pass:process.env.EMAIL_PASSWORD              //'muee uqoc cjcb pibs' //'qjrtkoxazcinowt',                // App password
      },
    });

    const info = await transporter.sendMail({
      from:process.env.EMAIL, // Must match authenticated Gmail
      to,
      subject: "Your spotify Verification Code",
      html: `Your verification code is: <b>${code}</b>`,  
    });

    console.log("Email sent: ", info.response);
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
    // check all fields
    if (!email || !password) {
      return res.json({
        message: "All fields are required",
        success: false,
      });
    }

    // check email in DB
  const chekUser = await User.findOne({ email });

    if (!chekUser) {
      return res.json({
        message: "User not found. Enter correct email",
        success: false,
      });
    }

    // check password
    const isPassCorrect = compareSync(password, chekUser.password);

    if (!isPassCorrect) {
      return res.json({
        message: "Enter correct password",
        success: false,
      });
    }

    // create token
    const token = jwt.sign(
      { _id: chekUser._id },
      process.env.JWT_SECRETE_KEY,
      { expiresIn: "2d" }
    );

    res.cookie("token", token, {
      maxAge: 2 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
    });

    // generate MFA code
    const code = generateCode();
    console.log("verify code is:", code);

    // store code + expiry
    chekUser.verifyCode = code;
    chekUser.verifyCodeExpiry = Date.now() + 30 * 1000;  //  code crreation date + 30 second add 
    await chekUser.save();

    // send email
    const emailResult = await sendVerificationEmail(chekUser.email, code);
    console.log(emailResult);


    if (!emailResult.success) {
      return res.json({
        emailResult,
        message: "Email sending failed. Email is not associated with Gmail or invalid.",
        success: false,
      });
    }
 

    // success
    return res.json({
      token,
      message: "Login successful. Verification code sent.",
      success: true,
      chekUser,
    });

    
  } catch (error) {
    console.log("Error while login User:", error);

    return res.json({
      message: error.message,
      success: false,
    });
  }

};



// check verify code

export const VerifyCode = async (req, res) => {
  try {
    const { verifyCode } = req.body;

    if (!verifyCode) {
      return res.json({
        message: "Please enter verification code",
        success: false,
      });
    }

    const userId = req.user; // assuming you have user ID from JWT middleware
 console.log(userId)
    const user = await User.findById(userId);

    if (!user) {
      return res.json({
        message: "User not found or unauthorized",
        success: false,
      });
    }

    // Check if code matches
    if (user.verifyCode !== verifyCode) {
      return res.json({
        message: "Invalid verification code",
        success: false,
      });
    }

    // Check if code expired
    if (Date.now() > user.verifyCodeExpiry) {   // currenttime > code creation time + 30 second  ? then expires
      // clear code
      user.verifyCode = null;
      user.verifyCodeExpiry = null;
      await user.save();

      return res.json({
        message: "Code expired. Please request a new one.",
        success: false,
      });
    }


    
    // Verification success
    user.verifyCode = null;
    user.verifyCodeExpiry = null;
    await user.save();

    return res.json({
      message: "Verification successful",
      success: true,
    });
  } catch (error) {
    console.log("Error while verifying code:", error);
    return res.json({
      message: error.message,
      success: false,
    });
  }
};

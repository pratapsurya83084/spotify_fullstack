import { User } from "../model/user.model.js";
import bcrypt, { compareSync } from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password ) {
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

//resend email 
export const ResendCode = async (req, res) => {
  try {
    const userId = req.user._id;

    if (!userId) {
      return res.json({ message: "User not authorized, please login", success: false });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.json({ message: "User not found", success: false });
    }

    const code = generateCode();

    // Send email
    const emailResult = await sendVerificationEmail(user.email, code);
    if (!emailResult.success) {
      return res.json({ message: "Failed to send verification code", success: false });
    }

    // Save OTP and expiry in DB
    user.verifyCode = code; // ✅ save the actual OTP code
    user.verifyCodeExpiry = new Date(Date.now() + 60 * 1000); // 60 seconds expiry
    await user.save(); // ✅ await to ensure DB is updated

    return res.json({
      message: "Resend code successfully",
      success: true,
    });

  } catch (error) {
    console.log("Error resending verification code:", error);
    return res.json({ message: error.message, success: false });
  }
};

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
      { _id: user._id, isAdmin:user.isAdmin,login_verified: true, otp_verified: false },
      process.env.JWT_SECRETE_KEY,
      { expiresIn: "5m" } // short-lived token
    );

    res.cookie("token", tempToken, {
      httpOnly: true,     
      secure: false,    
      sameSite:"lax",   
      maxAge: 24 * 24 * 60 * 60 * 1000,   // 2 day's expiry
});


    // Generate OTP
    const code = generateCode();
    user.verifyCode = code;
    user.verifyCodeExpiry = new Date(Date.now() + 60 * 1000);

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
      tempToken: tempToken,
      verifyCode: code,
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
console.log("receive code :",verifyCode)
    if (!verifyCode) {
      return res.json({
        message: "Please enter verification code",
        success: false,
      });
    }

    const userId = req.user._id;
    
    const otpVerified = req.user.otp_verified;
    console.log("user is founded :", userId + " " + otpVerified);

    const user = await User.findById(userId);
    if (!user) {
      return res.json({
        message: "User not found or unauthorized",
        success: false,
      });
    }

    // Check OTP
    if (user.verifyCode !== verifyCode) {
      return res.json({ message: "Invalid verification code", success: false });
    }

  

 
  
    // Generate final token with OTP verified
    const finalToken = jwt.sign(
      { _id: user._id,isAdmin:user.isAdmin, login_verified: true, otp_verified: true },
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
    

    
     res.json({
      message: "Verification successful",
      finalToken: finalToken,
      success: true,
    });
   // OTP verified: clear OTP fields
      user.verifyCode = null;
    user.verifyCodeExpiry = null;
    await user.save();

  
    return;


  } catch (error) {
    console.error("VerifyCode error:", error);
    return res.json({ message: error.message, success: false });
  }
};

// get myprofile
export const myProfile = async (req, res) => {
  const userId = req.user._id; //user token

  // console.log(userId)
  let userProfile = await User.findById({ _id: userId }).select("-password");
  if (userId || userProfile) {
    if (userProfile) {
      return res.json({
        message: "profile retrieved",
        userProfile,
        success: true,
      });
    }
  }

  if (!userId) {
    return res.json({
      message: "UnAuthorized User,  Login please",
      success: false,
    });
  }

  if (!userProfile) {
    return res.json({
      message: "User not found",
      success: false,
    });
  }
};

//get All user

export const getUser = async (req, res) => {
  try {
    const isUser_verified_with_Otp = req.user.otp_verified;

    // console.log("isUser_verified_with_login_verified is verified :" , isUser_verified_with_login_verified);
    console.log("otp is verified :", isUser_verified_with_Otp); //true

    if (isUser_verified_with_Otp) {
      const users = await User.find();

      return res.json({
        message: "All user retrieve successfully",
        users,
      });
    }

    return res.json({
      message: "Unauthorized user not retrieve UserList",
      success: false,
    });
  } catch (error) {
    console.log("error while fetching user :", error);
  }
};

//forgot password
// step 1 . take email from user
// step 2. send password-reset link on that email with token expiration 60 second
// step 3.

export const ForgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    // Step 1: Check if email is provided
    if (!email) {
      return res.json({ message: "Please enter email", success: false });
    }

    // Step 2: Check if user exists in DB
    const userExists = await User.findOne({ email });
    if (!userExists) {
      return res.json({
        message: "User not found, please signup",
        success: false,
      });
    }

    // Step 3: Create token (valid for 15 minutes)
    const secretKey = process.env.JWT_SECRETE_KEY || "dev_secret_key";
    const token = jwt.sign({ _id: userExists._id }, secretKey, {
      expiresIn: "5m",
    });

    // Step 4: Create local reset link
    const link = `http://localhost:5173/user/reset-password/${userExists._id}/${token}`;

    // Step 5: Nodemailer transport (local Gmail)
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD, // Gmail App Password
      },
    });

    // Step 6: Mail options
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Spotify Password Reset Request (Local)",
      html: `
        <h2>Password Reset Request</h2>
        <p>Hello,</p>
        <p>You requested to reset your password. Please click the button below to set a new password:</p>
        <a href="${link}" style="display:inline-block;padding:12px 20px;background:#4f46e5;color:#fff;text-decoration:none;border-radius:6px;">Reset Password</a>
        <p>If you didn’t request this, you can ignore this email.</p>
        <br/>
        <small>(This is a local development email, valid for 5 minutes)</small>
      `,
    };

    // Step 7: Send mail
    transport.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res.json({
          message: "Error while sending mail",
          success: false,
        });
      }

      // For local dev: log reset link so you can test directly
      console.log("Password reset link (for testing):", link);

      return res.json({
        message: "Password Reset Link is sent on Email ,please check email ",
        success: true,
      });
    });


  } catch (error) {
    console.error(error.message);
    return res.json({
      message: error.message,
      success: false,
    });
  }
};

// reset - password

export const ResetPassword = async (req, res) => {
  const { newPassword, conFirmPassword } = req.body;
  const { id, token } = req.params;

  try {
    // Step 1: Validate inputs
    if (!newPassword || !conFirmPassword) {
      return res.status(400).json({ message: "All fields are required", success: false });
    }

    if (newPassword !== conFirmPassword) {
      return res.status(400).json({ message: "Passwords do not match", success: false });
    }

    // Step 2: Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRETE_KEY);
    } catch (err) {
      return res.status(400).json({ message: "Invalid or expired link", success: false });
    }

    // Step 3: find user by ID
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    // Step 4: Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Step 5: Update password
    await User.findByIdAndUpdate(id, { password: hashedPassword });

    // Step 6: Return success
    return res.json({ message: "Password reset successfully", success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message, success: false });
  }
};

// logout functionality
export const LogoutUser = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,   // must match cookie creation
      secure: false,    // true only if using HTTPS
      sameSite: "lax",
      path: "/",        // important if you set it earlier
    });

    return res.status(200).json({
      message: "Logged out successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error while logging out user",
      success: false,
      error: error.message,
    });
  }
};








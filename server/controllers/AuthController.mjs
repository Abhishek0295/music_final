import { Token } from "../helpers/authToken.mjs";
import { decryptPassword, hashPassword } from "../helpers/hash.mjs";
import { sendForgotEmail, sendRegistrationEmail } from "../helpers/mailer.mjs";
import userModalSchema from "../models/userModalSchema.mjs";


export const userPhotoController = async (req, res) => {
    try {
      // console.log(req.file.path);
      res.status(200).send({
        success: true,
        message: "File uploaded successfully",
        file: req.file.path,
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: "An error occurred during file upload",
        error: err.message,
      });
    }
  };


export const registerController = async (req, res, next) => {
    try {
      const { firstName, lastName, email, password, photo } = req.body;
  
      const existingUser = await userModalSchema.findOne({ email: email });
      if (existingUser) {
        return res.status(200).send({
          success: false,
          message: "User already exists. Please login instead.",
        });
      }
  
      const hashedPassword = await hashPassword(password);
  
      const newUser = await new userModalSchema({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashedPassword,
        photo: photo
      }).save();
  
      sendRegistrationEmail(email, firstName)

      return res.status(200).send({
        success: true,
        message: "User registered successfully",
      });

    } catch (err) {
      console.log(err);
      return res.status(500).send({
        success: false,
        message: "Error while registering User",
        err: err.message,
      });
    }
  };
  
export const loginController = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(200).send({
          success: false,
          message: "Enter valid Credentials",
        });
      }
  
      const existingUser = await userModalSchema.findOne({ email: email });
      if (!existingUser) {
        return res.status(404).send({
          success: false,
          message: "User not found",
        });
      }
  
      const matchPassword = await decryptPassword(
        password,
        existingUser.password
      );
      if (!matchPassword) {
        return res.status(401).send({
          success: false,
          message: "Invalid Password",
        });
      }
  
      //JWT----
      const token = Token(existingUser._id)
  
      return res.status(200).send({
        success: true,
        message: "Logged in Successfully",
        user: {
          firstName: existingUser.firstName,
          lastName : existingUser.lastName,
          email: existingUser.email,
          id: existingUser._id,
        },
        token
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        success: false,
        message: "Error while login",
        error: err.message,
      });
    }
  };

export const forgotPassController = async (req, res) => {
    const { email } = req.body;
  
    if (!email) {
      return res.status(400).json({ message: "Please enter your email" });
    }
  
    const user = await userModalSchema.findOne({ email });
  
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }
  
    const resetCode = Math.floor(1000 + Math.random() * 9000);
    user.resetCode = resetCode;
    user.resetCodeExpiry = Date.now() + 300000; // 5 minutes
  
    await user.save();
  
    const link = `http://localhost:5173/change_password/${resetCode}`;
    sendForgotEmail(email, link);
  
    res.json({ message: "Reset password link sent to your email" });
  }

 // Change password route-----------------
export const resetPasswordController = async (req, res) => {
  const { resetCode } = req.params;
  const { newPassword, confirmPassword } = req.body;

  const user = await userModalSchema.findOne({
    resetCode,
    resetCodeExpiry: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).json({ message: "Invalid or expired reset code" });
  }

  if (!newPassword || !confirmPassword) {
    return res.status(400).json({ message: "Please enter all fields" });
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  user.password = await hashPassword(newPassword, 12);
  user.resetCode = undefined;
  user.resetCodeExpiry = undefined;

  await user.save();

  res.json({ message: "Password changed successfully" });
};

// Check the valid route
export const validRoute = async (req, res) => {
  const { resetCode } = req.params;

  const user = await userModalSchema.findOne({
    resetCode,
    resetCodeExpiry: { $gt: Date.now() },
  });
  // console.log(user)

  if (user) {
    return res.json({ valid: true });
  } else {
    return res.json({ valid: false });
  }
};



  export const singleUserController = async (req, res) => {
    try {
      const { id } = req.params;
      const singleUser = await userModalSchema.findById(id);
      if (!singleUser) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
  
      res.status(200).json({
        success: true,
        message: "Single User found successfully",
        user: singleUser,
      });
    } catch (err) {
      console.error("Error fetching single User:", err);
      res.status(500).send({
        success: false,
        message: "Error in fetching single User",
        err: err.message,
      });
    }
  };
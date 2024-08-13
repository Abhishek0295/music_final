import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema(
    {
      firstName: {
        type: String,
        required: [true, "First Name Is Required!"],
        minLength: [3, "First Name Must Contain At Least 3 Characters!"],
        trim: true,
      },
      lastName: {
        type: String,
        required: [true, "Last Name Is Required!"],
        minLength: [3, "Last Name Must Contain At Least 3 Characters!"],
        trim: true,
      },
      email: {
        type: String,
        required: [true, "Email Is Required!"],
        unique: true,
        validate: [validator.isEmail, "Provide A Valid Email!"],
      },
      password: {
        type: String,
        required: [true, "Password Is Required!"],
        minLength: [6, "Password Must Contain At Least 6 Characters!"],
      },
      photo: {
        type: String,
      },
      resetCode: {
        type: String
      },
      resetCodeExpiry: Date,
    },
    { timestamps: true }
  );

  
export default mongoose.model("User", userSchema);
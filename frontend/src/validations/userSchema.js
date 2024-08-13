import * as Yup from "yup";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const UserSchema = Yup.object({
  firstName: Yup.string()
    .min(3, "First Name must be at least 3 characters long")
    .max(25, "First Name must be at most 25 characters long")
    .required("Please enter your first name"),

  lastName: Yup.string()
    .min(3, "Last Name must be at least 3 characters long")
    .max(25, "Last Name must be at most 25 characters long")
    .required("Please enter your last name"),

  email: Yup.string()
    .email("Invalid email format")
    .matches(emailRegex, "Invalid email format")
    .required("Please enter your email"),

  password: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character"
    )
    .required("Please enter your password"),
});

import {body, validationResult} from "express-validator";

const UserValidation = (req, res, next) => {
    let error = validationResult(req);
    console.log(error);
    if (error.isEmpty()) {
      next();
    } else {
      res.status(400).send({ message: error.errors[0].msg });
    }
  };

export const checkUser = [
    body("firstName")
    .trim()
    .isString()
    .isLength({ min: 3 })
    .withMessage("First name must be at least 3 characters long"),

    body("lastName")
    .trim()
    .isString()
    .notEmpty()
    .withMessage("Last name is required"),

  body("email").trim().isEmail().withMessage("Invalid email address"),

  body("password")
    .trim()
    .isStrongPassword({
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage(
      "Password must be at least 6 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special character"
    ),

    body("photo")
        .isString()
        .notEmpty(),

  UserValidation,
]

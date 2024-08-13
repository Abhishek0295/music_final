import * as Yup from "yup"

export const loginSchema = Yup.object({
    email: Yup.string()
    .email("Please enter a valid email")
    .required("Please enter your email"),
    
    password: Yup.string()
    .min(5, "Password must have at least 5 characters")
    .required("Please enter your password"),
})
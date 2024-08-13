import express from "express"
import { upload } from "../middleware/multer.mjs"
import { forgotPassController, loginController, registerController, resetPasswordController, singleUserController, userPhotoController, validRoute } from "../controllers/AuthController.mjs"
import { checkUser } from "../middleware/validation.mjs";

const router = express.Router()

router.post("/user_photo", upload.single('photo'), userPhotoController);
router.post("/register", checkUser, registerController)

router.post("/login", loginController)
router.get("/user/:id", singleUserController)

router.post("/forgot", forgotPassController)
router.get("/change_password/:resetCode", validRoute)
router.post("/change_password/:resetCode", resetPasswordController)


export default router;
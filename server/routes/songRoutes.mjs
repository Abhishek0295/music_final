import Express from "express"
import { uploadSong } from "../middleware/multer.mjs"
import { getAllSongsController, getSingleSongController, uploadSongController } from "../controllers/songController.mjs";

const router = Express.Router()

router.post('/upload', uploadSong.single('song'), uploadSongController);
router.get('/', getAllSongsController);
router.get('/:id', getSingleSongController);

export default router;
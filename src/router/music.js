import Express from "express";
const router = Express.Router()

import {uploadAudio} from "../middleware/multer.js"
import musicControllers from "../controllers/musicControllers.js"
import verifyToken from "../middleware/verifyToken.js";


router.post('/create/:listId', verifyToken , uploadAudio.single("music"),  musicControllers.create);
router.get('/getMusic/:musicId', verifyToken , musicControllers.getMusic)
router.get('/getMusics/:listId', verifyToken , musicControllers.getMusics)

export default router
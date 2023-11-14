import Express from "express";
const router = Express.Router()

import {uploadAudio} from "../middleware/multer.js"
import authJwt from "../middleware/authJwt.js"
import musicControllers from "../controllers/musicControllers.js"


router.post('/create/:listId', authJwt, uploadAudio.single("music"),  musicControllers.create);
router.get('/getMusic/:musicId', authJwt, musicControllers.getMusic)
router.get('/getMusics/:listId', authJwt, musicControllers.getMusics)

export default router
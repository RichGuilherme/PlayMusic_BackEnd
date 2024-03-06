import Express from "express";
const router = Express.Router()

import {uploadAudio} from "../middleware/multer.js"
import musicControllers from "../controllers/music.controllers.js"

router.post('/create/:idPlaylist',  uploadAudio.single("music"),  musicControllers.create);
router.get('/getMusic/:idMusic',  musicControllers.getMusic)
router.get('/getMusics/:idPlaylist',  musicControllers.getMusics)
router.delete('/delete',  musicControllers.deleteMusic)

export default router
import Express from "express";
const router = Express.Router()

import {uploadAudio} from "../middleware/multer.js"
import musicControllers from "../controllers/music.controllers.js"

router.post('/create/:id',  uploadAudio.single("music"),  musicControllers.create);
router.get('/getMusic/:id',  musicControllers.getMusic)
router.get('/getMusics/:id',  musicControllers.getMusics)
router.get('/TimeMusics/:id',  musicControllers.durationTimeMusics)
router.delete('/delete',  musicControllers.deleteMusic)

export default router
import Express from "express";
const router = Express.Router()

import {uploadAudio} from "../middleware/multer.js"
import musicControllers from "../controllers/musicControllers.js"

router.post('/create',  uploadAudio.single("music"),  musicControllers.create);
router.get('/getMusic',  musicControllers.getMusic)
router.get('/getMusics',  musicControllers.getMusics)
router.delete('/delete',  musicControllers.deleteMusic)

export default router
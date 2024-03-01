import Express from "express";
const router = Express.Router()

import {uploadAudio} from "../middleware/multer"
import musicControllers from "../controllers/musicControllers"

router.post('/create',  uploadAudio.single("music"),  musicControllers.create);
router.get('/getMusic',  musicControllers.getMusic)
router.get('/getMusics',  musicControllers.getMusics)
router.delete('/delete',  musicControllers.deleteMusic)

export default router
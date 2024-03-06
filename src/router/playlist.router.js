import Express from "express"
const router = Express.Router()

import playListController from "../controllers/playList.controllers.js"
import {uploadAudio} from "../middleware/multer.js"


router.post("/create",   playListController.create)
router.get("/lists",  playListController.getListsUser)
router.get("/List/:listId",  playListController.getList)

export default router
import Express from "express"
const router = Express.Router()

import playListController from "../controllers/playListControllers.js"
import {uploadAudio} from "../middleware/multer.js"
import authJwt from "../middleware/authJwt.js"

router.post("/create", authJwt, uploadAudio.single("thumbnail"), playListController.create)
router.get("/getlists", authJwt, playListController.getLists)
router.get("/getList/:listId", authJwt, playListController.getList)

export default router
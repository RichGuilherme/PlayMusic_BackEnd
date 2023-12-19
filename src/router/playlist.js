import Express from "express"
const router = Express.Router()

import playListController from "../controllers/playListControllers.js"
import {uploadAudio} from "../middleware/multer.js"
import verifyToken from "../middleware/verifyToken.js"

router.post("/create", verifyToken, uploadAudio.single("thumbnail"), playListController.create)
router.get("/getlists", verifyToken, playListController.getLists)
router.get("/getList/:listId", verifyToken, playListController.getList)

export default router
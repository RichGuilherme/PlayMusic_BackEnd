import Express from "express"
const router = Express.Router()

import playListController from "../controllers/playList.controllers.js"


router.post("/create",   playListController.create)
router.get("/lists",  playListController.getListsUser)
router.get("/list/:id",  playListController.getListById)
router.get("/duration/:id",  playListController.playlistDuration)
router.put("/updateList", playListController.updateList)

export default router
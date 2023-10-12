import Express from "express";
const router = Express.Router()
import userController from "../controllers/userController.js"

router.post('/register', userController.register)

router.post('/login', userController.login);

export default router
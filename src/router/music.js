import Express from "express";
const router = Express.Router()

import {uploadAudio} from "../middleware/multer.js"
import authJwt from "../middleware/authJwt.js"
import musicControllers from "../controllers/musicControllers.js"


router.post('/create/:listId', authJwt, uploadAudio.single("music"),  musicControllers.create);


// Rota para listar as listas de reprodução de um usuário
router.get('/:userId', async (req, res) => {
    // Implemente a listagem de listas de reprodução de um usuário aqui
});

export default router
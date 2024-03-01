import Express, { Request, Response } from "express";
const router = Express.Router()
import authController from "../controllers/authController"
import passport from "passport";
import verifyToken from "../middleware/verifyToken";

import { generateToken } from "../middleware/authJWT.js";
import userController from "../controllers/userController";

router.post('/register', authController.register)
router.post('/login', authController.login)
router.get('/getDescritionPlaylist', verifyToken, userController.getDescritionPlaylist)
router.get('/getDataUser', verifyToken, userController.getDataUser)


// google oauth20
router.get('/auth/google',
    passport.authenticate('google', { scope: ['email', 'profile'] })
)

// Rota de retorno após a autenticação bem-sucedida com o Google
router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/authenticate' }),
    (req: Request, res: Response) => {
        const user = req.user

        if (user) {
            const token = generateToken(user);
            res.cookie("token", token, {
                maxAge: 300000,
                secure: true
            });
            res.redirect('http://localhost:5173/home');
        } else {
            // Trate o caso em que req.user é undefined
            res.status(401).send('Usuário não autenticado');
        }

    }
)

export default router
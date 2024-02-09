import Express from "express";
const router = Express.Router()
import authController from "../controllers/authController.js"
import passport from "passport";
import verifyToken from "../middleware/verifyToken.js";
import userController from "../controllers/userController.js";
import { generateToken } from "../authJWT.js";

router.post('/register', authController.register)
router.post('/login', authController.login)
router.get('/getDescritionPlaylist', verifyToken, userController.getDescritionPlaylist)
router.get('/getDataUser', verifyToken, userController.getDataUser)


// google oauth20
router.get('/auth/google',
    passport.authenticate('google', { scope: ['email', 'profile'] })
);

// Rota de retorno após a autenticação bem-sucedida com o Google
router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/authenticate' }),
    (request, response) => {
        const user = request.user

        const token = generateToken(user)
        response.cookie("token", token, {
            maxAge: 300000,
            secure: true
        })


        response.redirect('http://localhost:5173/home')

    }
);

export default router
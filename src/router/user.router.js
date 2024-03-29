import Express from "express";
const router = Express.Router()
import authController from "../controllers/auth.controller.js"
import passport from "passport";
import verifyToken from "../middleware/verifyToken.middleware.js";
import userController from "../controllers/user.controller.js";
import { generateToken } from "../middleware/authJWT.middleware.js";

router.post('/register', authController.register)
router.post('/login', authController.login)
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
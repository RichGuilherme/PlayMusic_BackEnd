import Express from "express";
const router = Express.Router()
import authController from "../controllers/authController.js"
import passport from "passport";
import verifyToken from "../middleware/verifyToken.js";
import userController from "../controllers/userController.js";

router.post('/register', authController.register)
router.post('/login', authController.login)
router.get('/getUser', verifyToken, userController.getUser)

// google oauth20
router.get('/auth/google',
    passport.authenticate('google', { scope: [ 'email', 'profile'] })
);

// Rota de retorno após a autenticação bem-sucedida com o Google
router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('/')
    }
);

export default router
import Express from "express";
const router = Express.Router()
import userController from "../controllers/userController.js"
import passport from "passport";

router.post('/register', userController.register)
router.post('/login', userController.login)


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
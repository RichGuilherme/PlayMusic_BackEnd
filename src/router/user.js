import Express from "express";
const router = Express.Router()
import { User } from "../model/User.js";
import { comparePasswords, generateToken, hashPassword } from '../auth.js'

router.post('/register', async (request, response) => {
    const { username, password, email } = request.body

    const hashedPassword = await hashPassword(password)

    await User.create({ username, password: hashedPassword, email })
        .then(user => {
            const token = generateToken(user)
            response.status(201).json({ token })
        })
        .catch(err => {
            if (err.code === 11000) {
                console.log(err)
                console.error('Erro: Username ou email já existem.');
            } else {
                console.error('Erro ao criar usuário:', err);
            }
            response.status(500).json({ error: 'Erro ao criar usuário' })
        })
})

router.post('/login', async (request, response) => {
    const { password, email } = request.body
    const user = await User.findOne({ email })

    if (!user) {
        return response.status(401).json({ error: 'Email invalido' })
    }

    const passwordsMatch = await comparePasswords(password, user.password)
    if (!passwordsMatch) {
        return response.status(401).json({ error: 'Password errado' })
    }

    const token = generateToken(user)
    response.json({ token })
});

export default router
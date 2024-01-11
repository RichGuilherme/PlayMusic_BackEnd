import { comparePasswords, generateToken, hashPassword } from "../authJWT.js";
import { User } from "../model/User.js";


class UserController {
    register = async (request, response) => {
        const { username, password, email } = request.body

        const hashedPassword = await hashPassword(password)

        await User.create({ username, password: hashedPassword, email })
            .then(user => {

                const token = generateToken(user)
                response.cookie("token", token, {
                    maxAge: 300000,
                    secure: true
                })

                const { username } = user
                response.status(200).json({ username, email })
            })
            .catch(err => {
                if (err.code === 11000) {
                    console.error('Erro: Username ou email já existem.');
                } else {
                    console.error('Erro ao criar usuário');
                }
                response.status(500).json({ error: 'Erro ao criar usuário' })
            })
    }

    login = async (request, response) => {
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
        response.cookie("token", token, {
            maxAge: 300000,
            secure: true
        })


        const { username, id } = user
        response.status(200).json({ username, email, id })
    }

}

export default new UserController
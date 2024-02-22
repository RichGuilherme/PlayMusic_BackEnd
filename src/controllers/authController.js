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
                    response.status(401).json({ error: 'Username ou email já existem.' })
                } else {
                    response.status(500).json('Erro ao criar usuário')
                }
            })
    }

    login = async (request, response) => {
        const { password, email } = request.body
        const user = await User.findOne({ email })

        const passwordsMatch = await comparePasswords(password, user.password)

        if (!user || !passwordsMatch) {
            return response.status(401).json({ error: 'Email ou senha invalida!' })
        }

        const token = generateToken(user)
        response.cookie("token", token, {
            maxAge: 300000,
            secure: true
        })


        
        response.status(200).json(user)
    }


    googleAuth20 = async (request, response) => {
        const user = request.user.id
        const token = generateToken(user)
        response.cookie("token", token, {
            maxAge: 300000,
            secure: true
        })


        const { username, email, id } = user
        response.status(200).json({ username, email, id })
    }
}

export default new UserController
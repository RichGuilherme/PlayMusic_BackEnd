import { comparePasswords, generateToken, hashPassword } from "../middleware/authJWT";
import { Request, Response } from "express";
import { User } from "../model/User";


class UserController {
    register = async (req: Request, res: Response) => {
        const { username, password, email } = req.body

        const hashedPassword = await hashPassword(password)


        await User.create({ username, password: hashedPassword, email })
            .then(user => {

                const token = generateToken(user)
                res.cookie("token", token, {
                    maxAge: 300000,
                    secure: true
                })

                const { username } = user
                res.status(200).json({ username, email })
            })
            .catch(err => {
                if (err.code === 11000) {
                    res.status(401).json({ error: 'Username ou email já existem.' })
                } else {
                    res.status(500).json('Erro ao criar usuário')
                }
            })
    }

    login = async (req: Request, res: Response) => {
        const { password, email } = req.body
        const userEmail = await User.findOne({ email })

        if (!userEmail) {
            return res.status(401).json({ error: 'Email ou senha inválida!' })
        }

        const passwordsMatch = await comparePasswords(password, userEmail.password)

        if (!passwordsMatch) {
            return res.status(401).json({ error: 'Email ou senha inválida!' })
        }

        const token = generateToken(userEmail)
        res.cookie("token", token, {
            maxAge: 300000,
            secure: true
        })

        res.status(200).json(userEmail)
    }


    googleAuth20 = async (req: Request, res: Response) => {
        const user = req.user.id
        const token = generateToken(user)
        res.cookie("token", token, {
            maxAge: 300000,
            secure: true
        })


        const { username, email, id } = user
        res.status(200).json({ username, email, id })
    }
}

export default new UserController
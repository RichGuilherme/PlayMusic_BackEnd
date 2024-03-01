import { Music } from "../model/Songs.js";
import { User } from "../model/User.js"
import { Request, Response } from "express"

class userController {
    getDataUser = async (req: Request, res: Response) => {
        const userId = req.user?._id
        const user = await User.findById(userId);

        if (user) {
            const { username, email, id, imagProfile } = user;
            res.status(200).json({ username, email, id, imagProfile });
        } else {
            res.status(404).json({ error: 'Usuário não encontrado' });
        }
    }

    // Pegar a descrição da playlist
    getDescritionPlaylist = async (req: Request, res: Response) => {
        const user = await User.findById(req.user._id)
        const musics = await Music.find({ user_id: user._id })

        const durations = musics.map(value => value.duration)
        const sumDurations = durations.reduce((accumulator: number, value) => accumulator + value, 0)

        const sumMusics = durations.length

        const { namePlayList, descritionPlayList } = user
        res.status(200).json({ namePlayList, descritionPlayList, sumDurations, sumMusics })
    }
}


export default new userController
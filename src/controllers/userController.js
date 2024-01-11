import { Music } from "../model/Songs.js";
import { User } from "../model/User.js"

class userController {
    getDescritionPlaylist = async (request, response) => {
        const user = await User.findById(request.user._id)
        const musics = await Music.find({ user_id: user._id })
        
        const durations = musics.map(value => value.duration)
        const sumDurations = durations.reduce((accumulator, value) => accumulator + value, 0)

        const sumMusics = durations.length

        const { namePlayList, descritionPlayList } = user
        response.status(200).json({ namePlayList, descritionPlayList, sumDurations, sumMusics})
    }
}


export default new userController
import { PlayList } from "../model/MusicList.js"
import { User } from "../model/User.js";

class PlayListControllers {
    create = async (request, response) => {
        const { title } = request.body
        const user = await User.findById(request.user._id)
        
        if(user.playList.length >= 3){
            return response.status(403).json("Limite máximo de lista alcançado.")
        }
        
        const playList = await PlayList({
            title,
            user_id: user._id
        }).save()

        user.playList.push(playList._id)
        await user.save()

        return response.status(200).json(playList)
    }
    
    // Pega todas as lista do usuário
    getLists = async (request, response) => {
        const user = await User.findById(request.user._id)

        response.status(200).json(user.playList)
    }

    // Pega uma lista especifica do usuário
    getList = async (request, response) => {
        const list = await PlayList.findById(request.params.listId)

        response.status(200).json(list)
    }
}

export default new PlayListControllers
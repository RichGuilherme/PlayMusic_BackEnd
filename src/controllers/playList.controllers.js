import { PlayList } from "../model/Playlist.js"
import { User } from "../model/User.js";

class PlayListControllers {

    create = async (request, response) => {
        const { title } = request.body

        const idUser = request.user._id
        const user = await User.findById(idUser)

        // if(user.playList.length >= 2){
        //     return response.status(403).json("Limite máximo de lista alcançado.")
        // }

        const playList = await PlayList({
            user_id: user._id,
            title: title
        }).save()


        user.playlist.push(playList._id)

        await user.save()

        return response.status(200).json(playList)
    }

    // Pega todas as lista do usuário
    getListsUser = async (request, response) => {
        const idUser = request.user._id
        const user = await User.findById(idUser)
        
        // const playlists = await PlayList.find({ user_id: user._id })

        const playlists = await Promise.all(user.playlist.map(async (value) => {
            const playlist = await PlayList.findById(value)

            return { _id: playlist._id, title: playlist.title,  thumbnailPlayList: playlist.thumbnailPlayList }
        }))

        response.status(200).json(playlists)
    }

    // Pega uma lista especifica do usuário
    getList = async (request, response) => {
        const idList = request.params.idList
        const list = await PlayList.findById(idList)

        response.status(200).json(list)
    }

    // Deletar listar 
    deleteList = async (request, response) => {
        await PlayList.findByIdAndDelete(request.params.listId)

        response.status(200).send("Lista deletada")
    }
}

export default new PlayListControllers
import { PlayList } from "../model/Playlist.js"
import { User } from "../model/User.js";

class PlayListControllers {
    create = async (request, response) => {
        const idUser = request.user._id
        const user = await User.findById(idUser)

        const amountPlaylist = user.playlist.length

        const playList = await PlayList({
            user_id: user._id,
            title: `Minha playlist n° ${amountPlaylist + 1}`
        }).save()


        user.playlist.push(playList._id)

        await user.save()

        return response.status(200).json(playList)
    }


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


    getListById = async (request, response) => {
        const idList = request.params.idList
        const list = await PlayList.findById(idList)

        response.status(200).json(list)
    }

    updateList = async (request, response) => {
        const idList = request.params.idList
        const {title, thumbnailPlayList, descritionPlayList} = request.body

        const list = await PlayList.findByIdAndUpdate(idList, {
            title,
            thumbnailPlayList,
            descritionPlayList
        })

        response.status(200).send("Lista atualizada!" + list)

    }

    deleteList = async (request, response) => {
        await PlayList.findByIdAndDelete(request.query.listId)

        response.status(200).send("Lista deletada!")
    }
}

export default new PlayListControllers
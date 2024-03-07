import { PlayList } from "../model/Playlist.js"
import { Music } from "../model/Songs.js";
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
        const {id}= request.params
        const list = await PlayList.findById(id)

        const {title, thumbnailPlayList, descritionPlayList} = list

        response.status(200).json({title, thumbnailPlayList, descritionPlayList})
    }

    playlistDuration = async (request, response) => {
        const { id }= request.params
        const playlist = await PlayList.findById(id)
        const musics = await Music.find({ playlist_id: playlist._id })
        
        
        const durations = musics.map(value => value.duration)
        const sumDurations = durations.reduce((accumulator, value) => accumulator + value, 0)

        const sumMusics = durations.length

        response.status(200).json({ sumDurations, sumMusics})
    }

    updateList = async (request, response) => {
        const { id }= request.params
        const {title, thumbnailPlayList, descritionPlayList} = request.body

        const list = await PlayList.findByIdAndUpdate(id, {
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
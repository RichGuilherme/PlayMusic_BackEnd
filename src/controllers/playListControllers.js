// import { PlayList } from "../model/MusicList.js"
// import { User } from "../model/User.js";

// class PlayListControllers {
    // create = async (request, response) => {
    //     const { title } = request.body
    //     const user = await User.findById(request.user._id)
        
    //     if(user.playList.length >= 2){
    //         return response.status(403).json("Limite máximo de lista alcançado.")
    //     }
        
    //     const playList = await PlayList({
    //         title,
    //         user_id: user._id
    //     }).save()


    //     user.playList.push({
    //         playlistName: title,
    //         playlistId: playList._id
    //       })

    //     await user.save()

    //     return response.status(200).json(playList)
    // }
    
    // Pega todas as lista do usuário
    // getListsUser = async (request, response) => {
    //     const user = await User.findById(request.user._id)
    //     const playlists = await PlayList.find({ user_id:  user.playList})
    //     response.status(200).json(playlists)
    // }

    // Pega uma lista especifica do usuário
    // getList = async (request, response) => {
    //     const list = await PlayList.findById(request.params.listId)

    //     response.status(200).json(list)
    // }

    // Deletar listar 
    // deleteList = async (request, response) => {
    //     const list = await PlayList.findByIdAndDelete(request.params.listId)

    //     response.status(200).send("Lista deletada")
    // }
// }

// export default new PlayListControllers
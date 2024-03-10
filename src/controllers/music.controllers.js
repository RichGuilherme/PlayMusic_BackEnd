import { Music } from "../model/Songs.js";
import { User } from "../model/User.js";
import { parseBuffer } from 'music-metadata';
import { ref, getDownloadURL, uploadBytesResumable, deleteObject } from "firebase/storage";
import storage from "../config/firebase.js";
import { PlayList } from "../model/Playlist.js";

class MusicControllers {
    create = async (request, response) => { 
        const {id}= request.params
        const playlist = await PlayList.findById(id)

        // const maxMusic = 10
        // if (playList.songs.length >= maxMusic) {
        //     return response.status(403).json("Limite de música alcançado")
        // }

        const musicFile = request.file
        const infoMusic = await parseBuffer(musicFile.buffer) // Pega informações extra com o music-metadata


        // // configurações do firebase para armazenamento
        // const storageRef = ref(storage, `${request.file.originalname}`)

        // const metadata = {
        //     contentType: request.file.mimetype,
        // }

        // const snapshot = await uploadBytesResumable(storageRef, request.file.buffer, metadata)
        // const downloadURL = await getDownloadURL(snapshot.ref)


        // let thumbnailURL;

        // // Tenta obter a URL da thumbnail (capa do álbum) a partir dos metadados
        // if (infoMusic.common.picture && infoMusic.common.picture.length > 0) {
        //     const thumbnailBuffer = infoMusic.common.picture[0].data
        //     const thumbnailStorageRef = ref(storage, `musicThumbnail/${request.file.originalname}.jpg`)
        //     const thumbnailSnapshot = await uploadBytesResumable(thumbnailStorageRef, thumbnailBuffer, { contentType: 'image/jpeg' })

        //     thumbnailURL = await getDownloadURL(thumbnailSnapshot.ref)
        // }

        const music = await Music({
            playlist_id: playlist._id,
            title: infoMusic.common.title,
            artist: infoMusic.common.artist || infoMusic.common.album,
            duration: infoMusic.format.duration,
            thumbnail: "thumbnailUR",
            storage_url: "downloadURL",
        }).save()

        playlist.songs.push(music._id)
        await playlist.save()

        return response.status(200).json(music)
    }

    getMusic = async (request, response) => {
        const { id }= request.params
        const music = await Music.findById(id)

        response.status(200).json({ music })
    }


    getMusics = async (request, response) => {
        const { id }= request.params
        const playlist = await PlayList.findById(id)
        const musics = await Music.find({ playlist_id: playlist._id })

        response.status(200).json({ musics })
    }


    deleteMusic = async (request, response) => {
        const { musicId }= request.query
        const music = await Music.findById(musicId)
        const userId = request.user._id;
        const musicIdToDelete = request.query.musicId;

        User.findByIdAndUpdate(userId, {
            $pull: { musicList: musicIdToDelete }
        }, { new: true })
            .then(updatedUser => {
                console.log('Música deletada com sucesso:')
            })
            .catch(err => {
                console.error('Erro ao deletar música da lista:', err)
            })

        if (!music) {
            return response.status(404).send("Música não encontrada")
        }

        await Music.findByIdAndDelete(musicId)


        // const storageRef = ref(storage, music.storage_url)
        // await deleteObject(storageRef)


        // if (music.thumbnail) {
        //     const thumbnailRef = ref(storage, music.thumbnail)
        //     await deleteObject(thumbnailRef)
        // }

        response.status(200).send("Música deletada com sucesso")
    }
}

export default new MusicControllers
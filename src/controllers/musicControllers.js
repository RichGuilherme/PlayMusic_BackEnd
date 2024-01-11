import { Music } from "../model/Songs.js";
import { User } from "../model/User.js";
import { parseBuffer } from 'music-metadata';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import storage from "../config/firebase.js";

class MusicControllers {
    create = async (request, response) => {
        const user = await User.findById(request.user._id)

        // if (playList.songs.length >= 10) {
        //     return response.status(403).json("Limite de música alcançado")
        // }

        const musicFile = request.file
        const infoMusic = await parseBuffer(musicFile.buffer) // Pega informações extra com o music-metadata


        // configurações do firebase para armazenamento
        const storageRef = ref(storage, `${request.file.originalname}`)

        const metadata = {
            contentType: request.file.mimetype,
        }
      
        const snapshot = await uploadBytesResumable(storageRef, request.file.buffer, metadata)
        const downloadURL = await getDownloadURL(snapshot.ref)


        let thumbnailURL;

        // Tenta obter a URL da thumbnail (capa do álbum) a partir dos metadados
        if (infoMusic.common.picture && infoMusic.common.picture.length > 0) {
            const thumbnailBuffer = infoMusic.common.picture[0].data
            const thumbnailStorageRef = ref(storage, `musicThumbnail/${request.file.originalname}.jpg`)
            const thumbnailSnapshot = await uploadBytesResumable(thumbnailStorageRef, thumbnailBuffer, { contentType: 'image/jpeg' })

            thumbnailURL = await getDownloadURL(thumbnailSnapshot.ref)
        }

        const music = await Music({
            user_id: user._id,
            title: infoMusic.common.title,
            artist: infoMusic.common.artist || infoMusic.common.album,
            duration: infoMusic.format.duration,
            thumbnail: thumbnailURL,
            storage_url: downloadURL,
        }).save()

        user.musicList.push(music._id)
        await user.save()

        return response.status(200).json(music)
    }

    getMusic = async (request, response) => {
        const music = await Music.findById(request.params.musicId)
        

        response.status(200).json({ music })
    }

    deleteMusic = async (request, response) => {
        const music = await Music.findByIdAndDelete(request.query.musicId)

        response.status(200).send("Música deletada com sucesso")
    }
    
    getMusics = async (request, response) => {
        const user = await User.findById(request.user._id)
        const musics = await Music.find({ user_id: user._id })

        response.status(200).json({ musics })
    }
}

export default new MusicControllers
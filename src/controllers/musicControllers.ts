import { Music } from "../model/Songs.js";
import { User } from "../model/User.js";
import { parseBuffer } from 'music-metadata';
import { ref, getDownloadURL, uploadBytesResumable, deleteObject } from "firebase/storage";
import storage from "../config/firebase";
import { Response, Request } from "express";

class MusicControllers {
    create = async (req: Request, res: Response) => {
        const user = await User.findById(req.user._id)

        // const maxMusic = 10
        // if (playList.songs.length >= maxMusic) {
        //     return res.status(403).json("Limite de música alcançado")
        // }

        const musicFile: Express.Multer.File  = req.file 
        const infoMusic = await parseBuffer(musicFile.buffer) // Pega informações extra com o music-metadata


        // configurações do firebase para armazenamento
        const storageRef = ref(storage, `${req.file.originalname}`)

        const metadata = {
            contentType: req.file.mimetype,
        }

        const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata)
        const downloadURL = await getDownloadURL(snapshot.ref)


        let thumbnailURL;

        // Tenta obter a URL da thumbnail (capa do álbum) a partir dos metadados
        if (infoMusic.common.picture && infoMusic.common.picture.length > 0) {
            const thumbnailBuffer = infoMusic.common.picture[0].data
            const thumbnailStorageRef = ref(storage, `musicThumbnail/${req.file.originalname}.jpg`)
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

        return res.status(200).json(music)
    }

    getMusic = async (req: Request, res: Response) => {
        const music = await Music.findById(req.params.musicId)

        res.status(200).json({ music })
    }

    deleteMusic = async (req: Request, res: Response) => {
        const musicId = req.query.musicId
        const music = await Music.findById(musicId)
        const userId = req.user._id;
        const musicIdToDelete = req.query.musicId;

        User.findByIdAndUpdate(userId, {
            $pull: { musicList: musicIdToDelete }
        }, { new: true })
            .then(updatedUser => {
                console.log('Música deletada com sucesso:', updatedUser);
            })
            .catch(err => {
                console.error('Erro ao deletar música da lista:', err);
            });

        if (!music) {
            return res.status(404).send("Música não encontrada")
        }

        await Music.findByIdAndDelete(musicId)


        const storageRef = ref(storage, music.storage_url)
        await deleteObject(storageRef)


        if (music.thumbnail) {
            const thumbnailRef = ref(storage, music.thumbnail)
            await deleteObject(thumbnailRef)
        }

        res.status(200).send("Música deletada com sucesso")
    }

    getMusics = async (req: Request, res: Response) => {
        const user = await User.findById(req.user._id)
        const musics = await Music.find({ user_id: user._id })

        res.status(200).json({ musics })
    }
}

export default new MusicControllers
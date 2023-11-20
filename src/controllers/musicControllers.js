import {  PlayList } from "../model/MusicList.js";
import { Music } from "../model/Songs.js";
import { parseBuffer } from 'music-metadata';
import {  ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import storage from "../config/firebase.js";

class MusicControllers {
    create = async (request, response) => {
        const playList = await PlayList.findById(request.params.listId)

        if(playList.songs.length >= 6){
            return response.status(403).json("Limite de música alcançado")
        }

        const musicFile = request.file
        const infoMusic = await parseBuffer(musicFile.buffer) // Pega informações extra com o music-metadata
    
        // configurações do firebase para armazenamento
        const storageRef = ref(storage, `${request.file.originalname}`)

        const metadata = {
            contentType: request.file.mimetype,
        };

        const snapshot = await uploadBytesResumable(storageRef, request.file.buffer, metadata)
        const downloadURL = await getDownloadURL(snapshot.ref)

        // Buscar o id da playlist pelo params
        
        const music = await Music({
           title: infoMusic.common.title,
           artist: infoMusic.common.artist || infoMusic.common.album,
           duration: infoMusic.format.duration,
           storage_url: downloadURL,
        }).save()
  
        playList.songs.push(music._id)
        await playList.save()

        return response.status(200).json(music)
    }

    getMusic = async (request, response) => {
        const music = await Music.findById(request.params.musicId)

        response.status(200).json(music)
    }

    getMusics = async (request, response) => {
        const playList = await PlayList.findById(request.params.listId)

        response.status(200).json(playList.songs)
    }
}

export default new MusicControllers
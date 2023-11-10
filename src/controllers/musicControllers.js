import {  PlayList } from "../model/MusicList.js";
import { Music } from "../model/Songs.js";
import { parseBuffer } from 'music-metadata';

class MusicControllers {
    create = async (request, response) => {
        const musicFile = request.file
        
        const infoMusic = await parseBuffer(musicFile.buffer)
        
        const playList = await PlayList.findById(request.params.listId);
         
        
        const music = await Music({
           title: infoMusic.common.title,
           artist: infoMusic.common.artist || infoMusic.common.album,
           duration: infoMusic.format.duration,
           storage_url: "https//:teste.com",
        }).save()
  
        playList.songs.push(music._id)
        await playList.save()

        return response.status(200).json(music)
        
    }
}

export default new MusicControllers
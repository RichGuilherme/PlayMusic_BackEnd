import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        select: true
    },
    imagProfile: {
       type: String,
       default: ""
    }, 
    favoritSongs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Music'
    }],
    playlist: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Playlist',
    }],
    dataUP: {
        type: Date,
        default: Date.now
    }
})

const User = mongoose.model('User', userSchema)

export { User }
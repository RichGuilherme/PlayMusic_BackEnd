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
    namePlayList: {
        type: String,
        default: "Minha playlist"
    },
    descritionPlayList: {
        type: String,
        default: ""
    },
    imagProfile: {
       type: String,
       default: ""
    }, 
    musicList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Music',
    }],
    dataUP: {
        type: Date,
        default: Date.now
    }
})

const User = mongoose.model('User', userSchema)

export { User }
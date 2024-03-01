import mongoose, { Schema } from "mongoose";

export interface IUser extends Document{
    _id: string
    username: String
    email: String
    password: String
    namePlayList: String
    descritionPlayList: String
    imagProfile: String
    musicList: mongoose.Types.ObjectId
    dataUP: Date
}

const userSchema = new Schema<IUser>({
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
        type: Schema.Types.ObjectId,
        ref: 'Music',
    }],
    dataUP: {
        type: Date,
        default: Date.now
    }
})

const User = mongoose.model<IUser>('User', userSchema)

export { User }
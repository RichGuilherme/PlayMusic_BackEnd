import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required:true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        select: true
    },
    playList: [
        {
            type: mongoose.Types.ObjectId,
            ref: "PlayList",
        }],
    dataUP: {
        type: Date,
        default: Date.now
    }
  });
  
const User = mongoose.model('User', userSchema);

export {User}
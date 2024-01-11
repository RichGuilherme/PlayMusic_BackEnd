import mongoose from "mongoose"

const musicSchema = {
    user_id: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: String,
    artist: String,
    duration: Number,
    thumbnail: {
        type: String,
        required: false,
        default: "",
    },
    storage_url: {
        type: String,
        required: true,
    },
}

const Music = mongoose.model('Music', musicSchema)

export { Music }
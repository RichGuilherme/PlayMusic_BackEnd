import mongoose from "mongoose"

const musicSchema = {
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

export { Music}
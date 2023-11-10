import mongoose from "mongoose"

const musicSchema = {
    title: String,
    artist: String,
    duration: Number,
    storage_url: {
        type: String,
        required: true,
    },
}

const Music = mongoose.model('Music', musicSchema)

export { Music}
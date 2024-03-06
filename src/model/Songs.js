import mongoose from "mongoose"

const musicSchema = {
    playlist_id: {
        type: mongoose.Types.ObjectId,
        ref: "Playlist",
        required: true
    },
    title: String,
    artist: String,
    duration: Number,
    thumbnailMusic: {
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
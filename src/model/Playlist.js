import mongoose from "mongoose"

const PlayListSchema = {
  title: { type: String },
  descritionPlayList: {
    type: String,
    default: ""
  },
  user_id: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true
  },
  songs: [
    {
      type: String,
      ref: "Music",
    }
  ],
  thumbnailPlayList: {
    type: String,
    default: ""
  }
}

const PlayList = mongoose.model('PlayList', PlayListSchema)

export { PlayList }
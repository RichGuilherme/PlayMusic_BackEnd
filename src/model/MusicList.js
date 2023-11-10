import mongoose from "mongoose"


const PlayListSchema = {
  title: String,
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
}

const PlayList = mongoose.model('PlayList', PlayListSchema)

export { PlayList }
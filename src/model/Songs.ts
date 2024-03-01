import mongoose, { Document, Schema} from "mongoose"



interface IMusic extends Document{
    user_id: mongoose.Types.ObjectId;
    title?: string;
    artist?: string;
    duration?: number;
    thumbnail?: string;
    storage_url: string;
}

const musicSchema = new Schema<IMusic>({
    user_id: {
        type: Schema.Types.ObjectId,
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
})


const Music = mongoose.model<IMusic>('Music', musicSchema)

export { Music }
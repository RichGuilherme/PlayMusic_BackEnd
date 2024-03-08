import multer from "multer"

const uploadAudio = multer({ storage: multer.memoryStorage()})

export {uploadAudio}
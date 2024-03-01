// arquivo onde conectamos o banco de dados 

import mongoose from "mongoose"

const connectToDb = () => {
   mongoose.connect(process.env.DB_URI || "")
   .then(() => "").
   catch((erro) => console.error("erro"))
} 

export default connectToDb;


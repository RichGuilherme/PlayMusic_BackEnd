import "dotenv/config.js"
import express from "express";
import session from "express-session"
import connectToDb from './database/db.js'
import musicRouter from "./router/music.js"
// import playListRouter from "./router/playlist.js"
import userRouter from "./router/user.js"
import "./passport.js"
import passport from "passport";
import cookieParser from 'cookie-parser'
import cors from 'cors'
import verifyToken from "./middleware/verifyToken.js";

const app = express()
const port = process.env.PORT

connectToDb()

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ['POST', 'GET', 'HEAD', 'DELETE', 'PATCH']
}))


app.use(cookieParser())
app.use(express.json())


app.use(passport.initialize())

// app.use("/playList" , verifyToken, playListRouter )
app.use("/music", verifyToken, musicRouter)
app.use("/user", userRouter)

app.listen(port, () => {
    console.log(`Servido rodando na porta ${port}`)
})
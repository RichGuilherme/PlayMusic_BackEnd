import "dotenv/config.js"
import express from "express";
import session from "express-session"
import connectToDb from './database/db.js'
import musicRouter from "./router/music.js"
import playListRouter from "./router/playlist.js"
import userRouter from "./router/user.js"
import "./passport.js"
import passport from "passport";

const app = express()
const port = process.env.PORT

connectToDb()

app.use(express.json())

app.use(
    session({
        secret: process.env.SESSION,
        resave: false,
        saveUninitialized: true,
        cookie: {secure: true}
    })
)
app.use(passport.initialize())

app.use("/playList", playListRouter )
app.use("/music", musicRouter )
app.use("/user", userRouter)

app.listen(port, () => {
   console.log(`Servido rodando na porta ${port}`)
})
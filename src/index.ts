import "dotenv/config.js"
import express from "express";
import session from "express-session"
import connectToDb from './database/db'
import musicRouter from "./router/music"
// import playListRouter from "./router/playlist.js"
import userRouter from "./router/user"
import "./passport.js"
import passport from "passport";
import cookieParser from 'cookie-parser'
import cors from 'cors'
import verifyToken from "./middleware/verifyToken";


const app = express()
const port = process.env.PORT
const portOrigin = process.env.PORTORIGIN

connectToDb()

app.use(cors({
    origin: portOrigin,
    credentials: true,
    methods: ['POST', 'GET', 'HEAD', 'DELETE', 'PATCH']
}))


app.use(cookieParser())
app.use(express.json())
app.use(session({
    secret: process.env.SESSION || "",
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false}
}))
app.use(passport.session())

app.use(passport.initialize())

// app.use("/playList" , verifyToken, playListRouter )
app.use("/music", verifyToken, musicRouter)
app.use("/user", userRouter)

app.listen(port, () => {
    console.log(`Servido rodando na porta ${port}`)
})
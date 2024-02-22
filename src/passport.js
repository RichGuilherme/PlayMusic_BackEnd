import passport from "passport";
import "dotenv/config.js"
import GoogleStrategy from "passport-google-oauth20"
import { User } from "./model/User.js";
import { generateToken} from "./authJWT.js";

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:4000/user/auth/google/callback",
},
    async (accessToken, refreshToken, profile, done) => {
        try {
            // Verificar se o usuário já existe no banco de dados
            let user = await User.findOne({ email: profile.emails[0].value })

            if (!user) {
                // Se não existir, criar um novo usuário
                user = await User.create({
                    username: profile.displayName ,
                    email: profile.emails[0].value,
                    imagProfile: profile.photos[0].value
                })
            }

            return done(null, user)
        } catch (error) {
            return done(error, null)
        }
    }
))


// Serialização e desserialização de usuário
passport.serializeUser((user, done) => {
    done(null, user)
  })
  
passport.deserializeUser((obj, done) => {
    done(null, obj)
  })
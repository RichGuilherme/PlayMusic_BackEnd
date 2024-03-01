import passport from "passport";
import "dotenv/config.js"
import { Strategy as GoogleStrategy, Profile, VerifyCallback } from "passport-google-oauth20"
import { IUser, User } from "./model/User";


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID || "",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    callbackURL: "http://localhost:4000/user/auth/google/callback",
},
    async (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => {
        // Verificar se o usuário já existe no banco de dados
        let user = await User.findOne({ email:  profile.emails && profile.emails[0]?.value })

        if (!user) {
            // Se não existir, criar um novo usuário
            user = await User.create({
                username: profile.displayName,
                email:  profile.emails && profile.emails[0]?.value,
                imagProfile: profile.photos && profile.photos[0]?.value
            })
        }

        return done(null, user)
    }
))


// Serialização e desserialização de usuário
passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((obj: false | IUser | null | undefined, done) => {
    return done(null, obj)
})
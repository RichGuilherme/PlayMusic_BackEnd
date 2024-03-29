import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const generateToken = (user) => {
  return jwt.sign({ _id: user._id }, process.env.SESSION, {
    expiresIn: '3h',
  })
}

const hashPassword = async (password) => {
  const saltRounds = 10
  return await bcrypt.hash(password, saltRounds);
}

const comparePasswords = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword)
}

export { generateToken, hashPassword, comparePasswords }
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

type UserProps = {
  _id?: string 
  id?: string 
  username?: string 
  email?: string, 
  imagProfile?: string
}


const generateToken = (user: UserProps) => {

  return jwt.sign({ _id: user._id }, 'admin@', {
    expiresIn: '3h',
  })
}

const hashPassword = async (password: string) => {
  const saltRounds = 10
  return await bcrypt.hash(password, saltRounds);
}

const comparePasswords = async (password: string, hashedPassword: string) => {
  return await bcrypt.compare(password, hashedPassword)
}

export { generateToken, hashPassword, comparePasswords }
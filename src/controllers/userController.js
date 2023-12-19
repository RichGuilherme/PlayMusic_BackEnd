import { User } from "../model/User.js"

class userController {
    getUser = async (request, response) => {
        const user = await User.findById(request.query.userId)
        
        const {email, username, playList} = user
        response.status(200).json({email, username, playList})
    }
}


export default new userController
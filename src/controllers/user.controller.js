import { Music } from "../model/Songs.js";
import { User } from "../model/User.js"

class userController {
   getDataUser = async (request, response) => {
       const user = await User.findById(request.user._id)
       const {username, email, id, imagProfile} = user
       response.status(200).json({username, email, id, imagProfile})
   }
}


export default new userController
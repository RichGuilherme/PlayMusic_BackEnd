import  Jwt  from "jsonwebtoken";
import {Request, Response, NextFunction} from "express"

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
	// const token = req.header("x-access-token");
	const token = req.cookies ? req.cookies.token : null 
    
	if (!token)
		return res
			.status(400)
			.send({ message: "Access denied, no token provided." });

	Jwt.verify(token, "admin@", (err: any, validToken: Express.User | undefined) => {
		if (err) {
            console.log(err)
			return res.status(400).send({ message: "invalid token" });
		} else {
			req.user = validToken;
			next();
		}
	})
}

export default verifyToken
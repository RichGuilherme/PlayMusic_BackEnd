import  Jwt  from "jsonwebtoken";

const verifyToken = (request, response, next) => {
	const token = request.header("x-access-token");
	if (!token)
		return response
			.status(400)
			.send({ message: "Access denied, no token provided." });

	Jwt.verify(token, "admin@", (err, validToken) => {
		if (err) {
            console.log(err)
			return response.status(400).send({ message: "invalid token" });
		} else {
			request.user = validToken;
			next();
		}
	})
}

export default verifyToken
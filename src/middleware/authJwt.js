import  Jwt  from "jsonwebtoken";

export default  (request, response, next) => {
	const token = request.header("x-auth-token");
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
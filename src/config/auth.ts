import './dotenv'

const jwtConfig = {
	secret: process.env.JWT_SECRET,
	expiresIn: 86400 * 2 //2 days

}

export {jwtConfig}

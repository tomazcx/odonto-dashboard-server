import './dotenv'

const jwtConfig = {
	secret: process.env.JWT_SECRET,
	expiresIn: 86400 //1 day

}

export {jwtConfig}

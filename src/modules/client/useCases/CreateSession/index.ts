import {jwtConfig} from "@config/auth";
import {ISession} from "@modules/client/domain/models/ISession";
import {AppError} from "@shared/errors/AppError";
import jwt from 'jsonwebtoken'
import {CreateSessionDTO} from "./domain/CreateSessionDTO";
import '@config/dotenv'

export class CreateSessionUseCase {

	public async execute({user, password}: CreateSessionDTO): Promise<ISession> {

		if (password !== process.env.USER_PASSWORD || user !== process.env.USER_LOGIN) {
			throw new AppError("Credenciais inválidas", 401)
		}

		const token = jwt.sign({
			user: process.env.USER_LOGIN
		}, jwtConfig.secret!, {
			expiresIn: jwtConfig.expiresIn
		})

		return {token}

	}
}

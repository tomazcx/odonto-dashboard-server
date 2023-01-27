import {jwtConfig} from "@config/auth";
import {AppError} from "@shared/errors/AppError";
import {NextFunction, Request, Response} from "express";
import jwt from 'jsonwebtoken'

export const authenticate = (request: Request, response: Response, next: NextFunction) => {
	const headerAuth = request.headers.authorization
	const token = headerAuth?.split(' ')[1]

	if (!token) {
		throw new AppError('Missing JWT', 401)
	}

	try {
		jwt.verify(token, jwtConfig.secret!)
	} catch (err) {
		throw new AppError('Invalid JWT', 401)
	}

	next()
}

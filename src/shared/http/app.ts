import express, {Request, Response, NextFunction} from "express"
import 'reflect-metadata'
import 'express-async-errors'
import {AppError} from "@shared/errors/AppError"
import cors from 'cors'
import {router} from "./routes"
const app = express()

app.use(express.json())
app.use(cors())
app.use(router)

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
	if (error instanceof AppError) {
		return response.status(error.statusCode).json({
			status: "error",
			message: error.message
		})
	}

	console.log(error)
	return response.status(500).json({
		status: "error",
		message: "Internal server error"
	})

})

export {app}

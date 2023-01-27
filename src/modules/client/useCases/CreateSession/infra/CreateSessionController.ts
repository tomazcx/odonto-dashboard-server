import {Request, Response} from "express";
import {container} from "tsyringe";
import {CreateSessionUseCase} from "..";

export class CreateSessionController {
	public async handle(request: Request, response: Response): Promise<Response> {
		const createSessionUseCase = container.resolve(CreateSessionUseCase)
		const {user, password} = request.body

		const {token} = await createSessionUseCase.execute({user, password})

		return response.status(200).json({
			status: "Autenticado",
			token
		})


	}
}

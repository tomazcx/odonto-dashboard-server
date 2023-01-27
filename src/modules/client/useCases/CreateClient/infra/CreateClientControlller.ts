import {Request, Response} from "express";
import {container} from "tsyringe";
import {CreateClientUseCase} from "..";

export class CreateClientController {
	public async handle(request: Request, response: Response): Promise<Response> {
		const createClientUseCase = container.resolve(CreateClientUseCase)
		const client = await createClientUseCase.execute(request.body)

		return response.status(201).json({
			status: "Paciente criado",
			client: client
		})

	}
}

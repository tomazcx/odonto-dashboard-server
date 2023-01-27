import {container} from "tsyringe";
import {ShowClientUseCase} from "..";
import {Request, Response} from "express";

export class ShowClientController {
	public async handle(request: Request, response: Response): Promise<Response> {
		const showClientUseCase = container.resolve(ShowClientUseCase)
		const {id} = request.params

		const client = await showClientUseCase.execute({id})

		return response.status(200).json(client)
	}
}

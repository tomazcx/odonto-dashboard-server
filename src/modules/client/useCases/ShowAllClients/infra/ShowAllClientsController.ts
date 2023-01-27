import {container} from "tsyringe";
import {ShowAllClientsUseCase} from "..";
import {Request, Response} from "express";

export class ShowAllClientsController {
	public async handle(request: Request, response: Response): Promise<Response> {
		const showAllClientsUseCase = container.resolve(ShowAllClientsUseCase)

		const clients = await showAllClientsUseCase.execute()

		return response.status(200).json(clients)
	}
}

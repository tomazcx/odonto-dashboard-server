import {Request, Response} from "express";
import {container} from "tsyringe";
import {DeleteClientUseCase} from "..";

export class DeleteClientController {
	public async handle(request: Request, response: Response): Promise<Response> {
		const deleteClientUseCase = container.resolve(DeleteClientUseCase)
		const {id} = request.params

		const deleted = await deleteClientUseCase.execute({id})

		return response.status(200).json({
			status: "Client deletado",
			message: deleted
		})
	}
}

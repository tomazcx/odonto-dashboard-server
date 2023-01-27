import {Request, Response} from "express"
import {container} from "tsyringe"
import {UpdateClientUseCase} from ".."

export class UpdateClientController {
	public async handle(request: Request, response: Response): Promise<Response> {
		const updateClientUseCase = container.resolve(UpdateClientUseCase)
		const {id} = request.params
		const clientData = request.body

		const updatedClient = await updateClientUseCase.execute({id, clientData})

		return response.status(200).json({
			status: "Dados do paciente atualizados",
			updatedClient
		})
	}
}



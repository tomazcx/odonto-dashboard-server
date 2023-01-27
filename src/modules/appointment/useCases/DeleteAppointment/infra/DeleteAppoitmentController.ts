import {Request, Response} from "express";
import {container} from "tsyringe";
import {DeleteAppointmentUseCase} from "..";

export class DeleteAppointmentController {
	public async handle(request: Request, response: Response): Promise<Response> {
		const {id} = request.params
		const deleteAppointmentUseCase = container.resolve(DeleteAppointmentUseCase)

		const deleted = await deleteAppointmentUseCase.execute({id})

		return response.status(200).json({
			status: "Consulta deletada",
			message: deleted
		})
	}
}


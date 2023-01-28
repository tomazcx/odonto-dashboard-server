import {Request, Response} from "express";
import {container} from "tsyringe";
import {ShowAllClientAppointmentsUseCase} from "..";

export class ShowAllClientAppointmentsController {
	public async handle(request: Request, response: Response): Promise<Response> {
		const {clientId} = request.params
		const showAllClientAppointmentsUseCase = container.resolve(ShowAllClientAppointmentsUseCase)

		const appointments = await showAllClientAppointmentsUseCase.execute({clientId})

		return response.status(200).json(appointments)
	}
}

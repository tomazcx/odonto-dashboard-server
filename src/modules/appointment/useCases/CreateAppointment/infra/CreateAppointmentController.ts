import {container} from "tsyringe"
import {CreateAppointmentUseCase} from ".."
import {Request, Response} from "express"

export class CreateAppointmentController {
	public async handle(request: Request, response: Response): Promise<Response> {
		const reqData = request.body
		const {clientId} = request.params

		const appointmentData = Object.assign(reqData, {clientId: clientId})


		const createAppointmentUseCase = container.resolve(CreateAppointmentUseCase)
		const appointment = await createAppointmentUseCase.execute(appointmentData)

		return response.status(201).json(appointment)
	}
}

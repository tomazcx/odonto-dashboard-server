import {IAppointmentsRepository} from "@modules/appointment/domain/repositories/IAppointmentsRepository";
import {AppError} from "@shared/errors/AppError";
import {inject, injectable} from "tsyringe";
import {DeleteAppointmentDTO} from "./domain/DeleteAppointmentDTO";

@injectable()
export class DeleteAppointmentUseCase {

	constructor(@inject('AppointmentsRepository') private appointmentsRepository: IAppointmentsRepository) {}

	public async execute({id}: DeleteAppointmentDTO): Promise<boolean> {
		const appointment = await this.appointmentsRepository.exists(id)

		if (!appointment) {
			throw new AppError('Consulta não encontrada', 404)
		}
		const deleted = await this.appointmentsRepository.delete({id})

		return deleted
	}
}

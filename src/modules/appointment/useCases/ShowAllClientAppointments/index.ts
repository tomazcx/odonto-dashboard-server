import {IAppointment} from "@modules/appointment/domain/models/IAppointment";
import {IAppointmentsRepository} from "@modules/appointment/domain/repositories/IAppointmentsRepository";
import {IClientsRepository} from "@modules/client/domain/repositories/IClientsRepository";
import {AppError} from "@shared/errors/AppError";
import {inject, injectable} from "tsyringe";
import {ShowAllClientAppointmentsDTO} from "./domain/ShowAllClientAppointmentsDTO";

@injectable()
export class ShowAllClientAppointmentsUseCase {

	constructor(
		@inject('AppointmentsRepository') private appointmentsRepository: IAppointmentsRepository,
		@inject('ClientsRepository') private clientsRepository: IClientsRepository
	) {}

	public async execute({clientId}: ShowAllClientAppointmentsDTO): Promise<IAppointment[]> {

		const clientExists = await this.clientsRepository.exists(clientId)

		if (!clientExists) {
			throw new AppError("Paciente não encontrado", 404)
		}

		const appointments = await this.appointmentsRepository.showAllClientAppointments({clientId})

		return appointments
	}
}

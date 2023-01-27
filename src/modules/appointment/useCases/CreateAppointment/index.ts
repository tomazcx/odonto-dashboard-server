import {IAppointment} from "@modules/appointment/domain/models/IAppointment";
import {IAppointmentsRepository} from "@modules/appointment/domain/repositories/IAppointmentsRepository";
import {IClientsRepository} from "@modules/client/domain/repositories/IClientsRepository";
import {AppError} from "@shared/errors/AppError";
import {inject, injectable} from "tsyringe";
import {CreateAppointmentDTO} from "./domain/CreateAppointmentDTO";

@injectable()
export class CreateAppointmentUseCase {

	constructor(
		@inject('AppointmentsRepository') private appointmentsRepository: IAppointmentsRepository,
		@inject('ClientsRepository') private clientsRepository: IClientsRepository) {}

	public async execute(data: CreateAppointmentDTO): Promise<IAppointment> {
		const clientId = data.clientId

		const client = await this.clientsRepository.exists(clientId)

		if (!client) {
			throw new AppError("O paciente do id informado não pode ser encontrado.", 404)
		}

		const appointment = await this.appointmentsRepository.create(data)

		return appointment


	}
}

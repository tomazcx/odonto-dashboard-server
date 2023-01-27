import {IAppointment} from "@modules/appointment/domain/models/IAppointment";
import {IAppointmentsRepository} from "@modules/appointment/domain/repositories/IAppointmentsRepository";
import {CreateAppointmentDTO} from "@modules/appointment/useCases/CreateAppointment/domain/CreateAppointmentDTO";
import {DeleteAppointmentDTO} from "@modules/appointment/useCases/DeleteAppointment/domain/DeleteAppointmentDTO";
import {ShowAllClientAppointmentsDTO} from "@modules/appointment/useCases/ShowAllClientAppointments/domain/ShowAllClientAppointmentsDTO";
import {PrismaClient} from "@prisma/client";
import {prismaClient} from "@shared/database/client";

export class AppointmentsRepository implements IAppointmentsRepository {
	private ormRepository: PrismaClient['appointment']

	constructor() {
		this.ormRepository = prismaClient.appointment
	}

	public async exists(id: string): Promise<boolean> {
		const appointment = await this.ormRepository.findFirst({where: {id}})
		return !!appointment
	}

	public async findById(id: string): Promise<IAppointment> {
		const appointment = await this.ormRepository.findFirst({where: {id}})
		return appointment as IAppointment
	}

	public async showAllClientAppointments({clientId}: ShowAllClientAppointmentsDTO): Promise<IAppointment[]> {
		const appointments = await this.ormRepository.findMany({where: {clientId}})
		return appointments as IAppointment[]
	}

	public async create({clientId, date, teeth, proccedure}: CreateAppointmentDTO): Promise<IAppointment> {
		const appointment = await this.ormRepository.create({
			data: {
				date,
				clientId,
				teeth,
				proccedure
			}
		})

		return appointment
	}

	public async delete({id}: DeleteAppointmentDTO): Promise<boolean> {
		await this.ormRepository.delete({where: {id}})
		return true
	}


}

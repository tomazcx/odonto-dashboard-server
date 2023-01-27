import {CreateAppointmentDTO} from "@modules/appointment/useCases/CreateAppointment/domain/CreateAppointmentDTO";
import {DeleteAppointmentDTO} from "@modules/appointment/useCases/DeleteAppointment/domain/DeleteAppointmentDTO";
import {ShowAllClientAppointmentsDTO} from "@modules/appointment/useCases/ShowAllClientAppointments/domain/ShowAllClientAppointmentsDTO";
import {IAppointment} from "../../models/IAppointment";
import {v4 as uuid} from 'uuid'
import {IAppointmentsRepository} from "../IAppointmentsRepository";

export class MockAppointmentsRepository implements IAppointmentsRepository {
	private appointments: IAppointment[] = []

	public async exists(id: string): Promise<boolean> {
		const appointment = this.appointments.find(appointment => appointment.id === id)
		return !!appointment
	}

	public async findById(id: string): Promise<IAppointment> {
		const appointment = this.appointments.find(appointment => appointment.id === id)
		return appointment as IAppointment
	}

	public async showAllClientAppointments({clientId}: ShowAllClientAppointmentsDTO): Promise<IAppointment[]> {
		const appointments = this.appointments.filter(appointment => appointment.clientId === clientId)
		return appointments
	}

	public async create(data: CreateAppointmentDTO): Promise<IAppointment> {
		const id = uuid()

		const appointment = Object.assign(data, {
			id
		})

		this.appointments.push(appointment)

		return appointment as IAppointment
	}

	public async delete({id}: DeleteAppointmentDTO): Promise<boolean> {
		this.appointments = this.appointments.filter(appointment => appointment.id !== id)
		return true
	}
}

import {CreateAppointmentDTO} from "@modules/appointment/useCases/CreateAppointment/domain/CreateAppointmentDTO";
import {DeleteAppointmentDTO} from "@modules/appointment/useCases/DeleteAppointment/domain/DeleteAppointmentDTO";
import {ShowAllClientAppointmentsDTO} from "@modules/appointment/useCases/ShowAllClientAppointments/domain/ShowAllClientAppointmentsDTO";
import {IAppointment} from "../models/IAppointment";

export interface IAppointmentsRepository {
	exists(id: string): Promise<boolean>
	findById(id: string): Promise<IAppointment>
	create(data: CreateAppointmentDTO): Promise<IAppointment>
	delete(data: DeleteAppointmentDTO): Promise<boolean>
	showAllClientAppointments(data: ShowAllClientAppointmentsDTO): Promise<IAppointment[]>
}

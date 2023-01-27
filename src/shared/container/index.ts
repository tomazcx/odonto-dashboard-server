import {IAppointmentsRepository} from "@modules/appointment/domain/repositories/IAppointmentsRepository";
import {AppointmentsRepository} from "@modules/appointment/infra/repositories/AppointmentsRepository";
import {IClientsRepository} from "@modules/client/domain/repositories/IClientsRepository";
import {ClientsRepository} from "@modules/client/infra/repositories/ClientsRepository";
import {container} from "tsyringe";

container.registerSingleton<IClientsRepository>('ClientsRepository', ClientsRepository)
container.registerSingleton<IAppointmentsRepository>('AppointmentsRepository', AppointmentsRepository)




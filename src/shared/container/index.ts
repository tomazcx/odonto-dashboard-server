import {IClientsRepository} from "@modules/client/domain/repositories/IClientsRepository";
import {ClientsRepository} from "@modules/client/infra/repositories/ClientsRepository";
import {container} from "tsyringe";

container.registerSingleton<IClientsRepository>('ClientsRepository', ClientsRepository)



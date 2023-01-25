import {CreateClientDTO} from "@modules/client/useCases/CreateClient/domain/CreateClientDTO";
import {UpdateClientDTO} from "@modules/client/useCases/UpdateClient/domain/UpdateClientDTO";
import {IClient} from "../models/IClient";

export interface IClientsRepository {
	findAll(): Promise<IClient[]>
	findById(id: string): Promise<IClient | undefined>
	create(data: CreateClientDTO): Promise<IClient>
	update(data: UpdateClientDTO): Promise<IClient>
	delete(id: string): Promise<void>
}

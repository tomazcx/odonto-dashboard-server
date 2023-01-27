import {CreateClientDTO} from "@modules/client/useCases/CreateClient/domain/CreateClientDTO";
import {DeleteClientDTO} from "@modules/client/useCases/DeleteClient/domain/DeleteClientDTO";
import {UpdateClientDTO} from "@modules/client/useCases/UpdateClient/domain/UpdateClientDTO";
import {IClient} from "../models/IClient";

export interface IClientsRepository {
	exists(id: string): Promise<boolean>
	findAll(): Promise<IClient[]>
	findById(id: string): Promise<IClient | undefined>
	create(data: CreateClientDTO): Promise<IClient>
	update(data: UpdateClientDTO): Promise<IClient>
	delete(data: DeleteClientDTO): Promise<boolean>
}

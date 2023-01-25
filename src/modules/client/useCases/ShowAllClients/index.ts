import {IClient} from "@modules/client/domain/models/IClient";
import {IClientsRepository} from "@modules/client/domain/repositories/IClientsRepository";
import {inject, injectable} from "tsyringe";

@injectable()
export class ShowAllClientsUseCase {

	constructor(@inject('ClientsRepository') private clientsRepository: IClientsRepository) {}

	public async execute(): Promise<IClient[]> {
		const clients = await this.clientsRepository.findAll()
		return clients
	}
}

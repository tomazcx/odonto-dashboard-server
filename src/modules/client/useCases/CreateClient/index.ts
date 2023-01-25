import 'reflect-metadata'
import {IClient} from "@modules/client/domain/models/IClient";
import {IClientsRepository} from "@modules/client/domain/repositories/IClientsRepository";
import {inject, injectable} from "tsyringe";
import {CreateClientDTO} from "./domain/CreateClientDTO";

@injectable()
export class CreateClientUseCase {

	constructor(@inject('ClientsRepository') private clientsRepository: IClientsRepository) {}

	public async execute(data: CreateClientDTO): Promise<IClient> {
		const client = await this.clientsRepository.create(data)
		return client
	}
}

import {IClient} from '@modules/client/domain/models/IClient';
import {IClientsRepository} from '@modules/client/domain/repositories/IClientsRepository';
import {AppError} from '@shared/errors/AppError';
import 'reflect-metadata'
import {inject, injectable} from "tsyringe";
import {UpdateClientDTO} from "./domain/UpdateClientDTO";

@injectable()
export class UpdateClientUseCase {

	constructor(@inject('ClientsRepository') private clientsRepository: IClientsRepository) {}

	public async execute({id, clientData}: UpdateClientDTO): Promise<IClient> {
		const clientExists = await this.clientsRepository.exists(id)

		if (!clientExists) {
			throw new AppError("Id do paciente não encontrado", 404)
		}

		const updatedClient = await this.clientsRepository.update({id, clientData})

		return updatedClient

	}
}

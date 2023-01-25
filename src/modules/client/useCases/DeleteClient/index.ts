import {IClientsRepository} from "@modules/client/domain/repositories/IClientsRepository";
import {AppError} from "@shared/errors/AppError";
import {inject, injectable} from "tsyringe";
import {DeleteClientDTO} from "./domain/DeleteClientDTO";

@injectable()
export class DeleteClientUseCase {

	constructor(@inject('ClientsRepository') private clientsRepository: IClientsRepository) {}

	public async execute({id}: DeleteClientDTO): Promise<void> {
		const client = await this.clientsRepository.findById(id)

		if (!client) {
			throw new AppError("Id do cliente não encotrado", 404)
		}

		await this.clientsRepository.delete(id)
	}
}

import {IClient} from "@modules/client/domain/models/IClient";
import {IClientsRepository} from "@modules/client/domain/repositories/IClientsRepository";
import {AppError} from "@shared/errors/AppError";
import {inject, injectable} from "tsyringe";
import {ShowClientDTO} from "./domain/ShowClientDTO";

@injectable()
export class ShowClientUseCase {

	constructor(@inject('ClientsRepository') private clienstRepository: IClientsRepository) {}

	public async execute({id}: ShowClientDTO): Promise<IClient> {
		const client = await this.clienstRepository.findById(id)

		if (!client) {
			throw new AppError("Cliente não encontrado", 404)
		}

		return client as IClient
	}
}

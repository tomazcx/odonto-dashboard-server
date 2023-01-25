import 'reflect-metadata'
import {IClientsRepository} from "@modules/client/domain/repositories/IClientsRepository";
import {MockClientsRepository} from "@modules/client/domain/repositories/mocks/MockClientsRepository";
import {AppError} from "@shared/errors/AppError";
import {DeleteClientUseCase} from "..";
import {CreateClientUseCase} from "../../CreateClient";
import {ShowClientUseCase} from "../../ShowClient";

let mockClientsRepository: IClientsRepository
let deleteClientUseCase: DeleteClientUseCase
let createClientUseCase: CreateClientUseCase
let showClientUseCase: ShowClientUseCase

describe('DeleteClient', () => {

	beforeAll(() => {
		mockClientsRepository = new MockClientsRepository()
		deleteClientUseCase = new DeleteClientUseCase(mockClientsRepository)
		createClientUseCase = new CreateClientUseCase(mockClientsRepository)
		showClientUseCase = new ShowClientUseCase(mockClientsRepository)
	})

	it('should delete the client with the informed id', async () => {
		const client = {
			name: "tomaz xavier",
			age: 18,
			phoneNumber: "49998123812",
			city: 'Florianópolis',
			streetAndNumber: 'Rua da alvorada, 134',
			district: 'Centro',
			budget: 'R$139,00',
			budgetDescription: 'limpeza dental',
			anamnese: 'Doença cardiovascular'
		}

		const registeredClient = await createClientUseCase.execute(client)

		const idClient = registeredClient.id

		await deleteClientUseCase.execute({id: idClient})

		await expect(
			showClientUseCase.execute({id: idClient})
		).rejects.toBeInstanceOf(AppError)

	})
})

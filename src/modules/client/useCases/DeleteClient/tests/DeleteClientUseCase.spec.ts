import 'reflect-metadata'
import {IClientsRepository} from "@modules/client/domain/repositories/IClientsRepository";
import {MockClientsRepository} from "@modules/client/domain/repositories/mocks/MockClientsRepository";
import {AppError} from "@shared/errors/AppError";
import {DeleteClientUseCase} from "..";
import {CreateClientUseCase} from "../../CreateClient";

let mockClientsRepository: IClientsRepository
let deleteClientUseCase: DeleteClientUseCase
let createClientUseCase: CreateClientUseCase


describe('DeleteClient', () => {

	beforeAll(() => {
		mockClientsRepository = new MockClientsRepository()
		deleteClientUseCase = new DeleteClientUseCase(mockClientsRepository)
		createClientUseCase = new CreateClientUseCase(mockClientsRepository)
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

		expect(
			deleteClientUseCase.execute({id: idClient})
		).toBeTruthy()
	})

	it('should fail by informing a wrong id', async () => {
		const wrongId = 'wrong-id'

		await expect(
			deleteClientUseCase.execute({id: wrongId})
		).rejects.toBeInstanceOf(AppError)

	})
})

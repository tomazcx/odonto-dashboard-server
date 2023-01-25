import {IClientsRepository} from "@modules/client/domain/repositories/IClientsRepository";
import {MockClientsRepository} from "@modules/client/domain/repositories/mocks/MockClientsRepository";
import {AppError} from "@shared/errors/AppError";
import {UpdateClientUseCase} from "..";
import {CreateClientUseCase} from "../../CreateClient";

let mockClientsRepository: IClientsRepository
let updateClientUseCase: UpdateClientUseCase
let createClientUseCase: CreateClientUseCase

describe('UpdateClient', () => {

	beforeAll(() => {
		mockClientsRepository = new MockClientsRepository()
		updateClientUseCase = new UpdateClientUseCase(mockClientsRepository)
		createClientUseCase = new CreateClientUseCase(mockClientsRepository)
	})

	it('should be able to update the data from a registerd client', async () => {
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

		const clientId = registeredClient.id
		registeredClient.name = 'tomaz cantarelli xavier'

		const updatedClient = await updateClientUseCase.execute({id: clientId, clientData: registeredClient})

		expect(updatedClient.name).toEqual('tomaz cantarelli xavier')
	})

	it('should fail because of wrong id', async () => {
		const client = {
			name: "tomaz xavier",
			age: 18,
			phoneNumber: "49998123812",
			city: 'Florianópolis',
			streetAndNumber: 'Rua da alvorada, 134',
			district: 'Centro'
		}

		const registeredClient = await createClientUseCase.execute(client)

		const clientId = 'id-falso'
		registeredClient.name = 'tomaz cantarelli xavier'

		await expect(
			updateClientUseCase.execute({id: clientId, clientData: registeredClient})
		).rejects.toBeInstanceOf(AppError)

	})

})

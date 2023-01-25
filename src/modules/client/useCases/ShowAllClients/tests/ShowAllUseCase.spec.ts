import 'reflect-metadata'
import {IClientsRepository} from "@modules/client/domain/repositories/IClientsRepository";
import {MockClientsRepository} from "@modules/client/domain/repositories/mocks/MockClientsRepository";
import {ShowAllClientsUseCase} from "..";
import {CreateClientUseCase} from "../../CreateClient";
import {IClient} from '@modules/client/domain/models/IClient';

let mockClientsRepository: IClientsRepository
let showAllClientsUseCase: ShowAllClientsUseCase
let createClientUseCase: CreateClientUseCase

describe('ShowAllClients', () => {

	beforeAll(() => {
		mockClientsRepository = new MockClientsRepository()
		showAllClientsUseCase = new ShowAllClientsUseCase(mockClientsRepository)
		createClientUseCase = new CreateClientUseCase(mockClientsRepository)
	})

	it('should show all registerd clients', async () => {
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

		const client_2 = {
			name: "joão",
			age: 24,
			phoneNumber: "499982939212",
			city: 'São Paulo',
			streetAndNumber: 'Rua da alvorada, 134',
			district: 'Centro',
			budget: 'R$139,00',
			budgetDescription: 'limpeza dental',
			anamnese: 'Doença cardiovascular'
		}

		await createClientUseCase.execute(client)
		await createClientUseCase.execute(client_2)

		const clients = await showAllClientsUseCase.execute()

		expect(clients satisfies IClient[]).toBeTruthy()
	})
})

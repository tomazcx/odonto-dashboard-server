import 'reflect-metadata'
import {IClientsRepository} from "@modules/client/domain/repositories/IClientsRepository"
import {MockClientsRepository} from "@modules/client/domain/repositories/mocks/MockClientsRepository"
import {CreateClientUseCase} from ".."

let mockClientsRepository: IClientsRepository
let createClientUseCase: CreateClientUseCase

describe("CreateClient", () => {

	beforeAll(() => {
		mockClientsRepository = new MockClientsRepository()
		createClientUseCase = new CreateClientUseCase(mockClientsRepository)
	})

	it('should create a new client', async () => {
		const client = {
			name: "tomaz xavier",
			age: 18,
			phoneNumber: "49998123812",
			city: 'Florianópolis',
			streetAndNumber: 'Rua da alvorada, 134',
			district: 'Centro'
		}

		const registeredClient = await createClientUseCase.execute(client)

		expect(registeredClient).toHaveProperty('id')
	})
})

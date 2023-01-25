import 'reflect-metadata'
import {IClientsRepository} from "@modules/client/domain/repositories/IClientsRepository";
import {MockClientsRepository} from "@modules/client/domain/repositories/mocks/MockClientsRepository";
import {ShowClientUseCase} from "..";
import {CreateClientUseCase} from "../../CreateClient";
import {AppError} from '@shared/errors/AppError';

let mockClientsRepository: IClientsRepository
let showClientUseCase: ShowClientUseCase
let createClientUseCase: CreateClientUseCase

describe('ShowClient', () => {

	beforeAll(() => {
		mockClientsRepository = new MockClientsRepository()
		showClientUseCase = new ShowClientUseCase(mockClientsRepository)
		createClientUseCase = new CreateClientUseCase(mockClientsRepository)
	})

	it('should show the client data', async () => {
		const client = {
			name: "tomaz xavier",
			age: 18,
			phoneNumber: "49998123812",
			city: 'Florianópolis',
			streetAndNumber: 'Rua da alvorada, 134',
			district: 'Centro'
		}

		const registeredClient = await createClientUseCase.execute(client)

		const id = registeredClient.id

		const clientFound = await showClientUseCase.execute({id})

		expect(clientFound).toEqual(registeredClient)

	})

	it('it should fail when informed a wrong id', async () => {
		const client = {
			name: "tomaz xavier",
			age: 18,
			phoneNumber: "49998123812",
			city: 'Florianópolis',
			streetAndNumber: 'Rua da alvorada, 134',
			district: 'Centro'
		}

		await createClientUseCase.execute(client)

		const id = 'wrong-id'

		await expect(
			showClientUseCase.execute({id})
		).rejects.toBeInstanceOf(AppError)


	})
})

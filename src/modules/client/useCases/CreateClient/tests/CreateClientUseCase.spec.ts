import 'reflect-metadata'
import {CreateClientUseCase} from ".."
import {v4 as uuid} from 'uuid'
import {IClient} from '@modules/client/domain/models/IClient'

let createClientUseCase: CreateClientUseCase
let expectedOutputClient: IClient
let mockClientRepository: any //defining only method create

describe("CreateClient", () => {

	beforeAll(() => {
		const clientId = uuid()
		expectedOutputClient = {
			id: clientId,
			name: 'test-name',
			age: 18,
			phoneNumber: 'test-number',
			address: {
				id: uuid(),
				city: 'test-city',
				streetAndNumber: 'test-address',
				district: 'test-district',
				clientId
			}
		}
		mockClientRepository = {
			create: jest.fn().mockReturnValue(Promise.resolve(expectedOutputClient))
		}

		createClientUseCase = new CreateClientUseCase(mockClientRepository)
	})

	it('should create a new client', async () => {

		const createClientDto = {
			name: 'test-name',
			age: 18,
			phoneNumber: 'test-number',
			city: 'test-city',
			streetAndNumber: 'test-address',
			district: 'test-district'
		}

		const registeredClient = await createClientUseCase.execute(createClientDto)

		expect(mockClientRepository.create).toBeCalled()
		expect(registeredClient).toStrictEqual(expectedOutputClient)
	})
})

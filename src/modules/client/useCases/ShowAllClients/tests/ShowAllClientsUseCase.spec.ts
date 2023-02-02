import 'reflect-metadata'
import {ShowAllClientsUseCase} from "..";
import {IClient} from '@modules/client/domain/models/IClient';
import {v4 as uuid} from 'uuid'

let showAllClientsUseCase: ShowAllClientsUseCase
let expectedOutputListClients: IClient[]
let mockClientRepository: any //defining only method create

describe('ShowAllClients', () => {

	beforeAll(() => {
		const clientId = uuid()
		expectedOutputListClients = [{
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
		}]
		mockClientRepository = {
			findAll: jest.fn().mockReturnValue(Promise.resolve(expectedOutputListClients))
		}

		showAllClientsUseCase = new ShowAllClientsUseCase(mockClientRepository)
	})

	it('should show all registerd clients', async () => {

		const clients = await showAllClientsUseCase.execute()

		expect(mockClientRepository.findAll).toBeCalled()
		expect(clients).toStrictEqual(expectedOutputListClients)
	})
})

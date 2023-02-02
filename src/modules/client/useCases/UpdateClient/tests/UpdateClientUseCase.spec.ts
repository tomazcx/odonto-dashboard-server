import {AppError} from "@shared/errors/AppError";
import {UpdateClientUseCase} from "..";
import {v4 as uuid} from 'uuid'

describe('UpdateClient', () => {
	const clientId = uuid()
	const addressId = uuid()

	it('should be able to update the data from a registerd client', async () => {
		const expectedOutputClient = {
			id: clientId,
			name: 'test-name',
			age: 18,
			phoneNumber: 'test-number',
			address: {
				id: addressId,
				city: 'test-city',
				streetAndNumber: 'test-address',
				district: 'test-district',
				clientId
			}
		}
		const mockClientsRepository = {
			exists: jest.fn().mockReturnValue(Promise.resolve(true)),
			update: jest.fn().mockReturnValue(Promise.resolve(expectedOutputClient))
		}

		//@ts-expect-error define part of methods
		const updateClientUseCase = new UpdateClientUseCase(mockClientsRepository)

		const updateClientDTO = {
			id: clientId,
			name: 'test-name',
			age: 18,
			phoneNumber: 'test-number',
			address: {
				id: addressId,
				city: 'test-city',
				clientId
			}
		}

		const updatedClient = await updateClientUseCase.execute({id: clientId, clientData: updateClientDTO})

		expect(mockClientsRepository.exists).toBeCalled()
		expect(mockClientsRepository.update).toBeCalled()
		expect(updatedClient).toStrictEqual(expectedOutputClient)

	})

	it('should fail by informing a wrong id', async () => {
		const updateClientDTO = {
			id: clientId,
			name: 'test-name',
			age: 18,
			phoneNumber: 'test-number',
			address: {
				id: addressId,
				city: 'test-city',
				clientId
			}
		}

		const mockClientRepository = {
			exists: jest.fn().mockReturnValue(Promise.resolve(false))
		}

		//@ts-expect-error defined part of the methods
		const updateClientUseCase = new UpdateClientUseCase(mockClientRepository)

		const wrongId = 'wrong-id'

		await expect(
			updateClientUseCase.execute({id: wrongId, clientData: updateClientDTO})
		).rejects.toBeInstanceOf(AppError)
		expect(mockClientRepository.exists).toBeCalled()

	})

})

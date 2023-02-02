import 'reflect-metadata'
import {ShowClientUseCase} from "..";
import {AppError} from '@shared/errors/AppError';
import {v4 as uuid} from 'uuid'

describe('ShowClient', () => {


	it('should show the client data', async () => {
		const clientId = uuid()
		const expectedOutputClient = {
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

		const mockClientRepository = {
			findById: jest.fn().mockReturnValue(Promise.resolve(expectedOutputClient))
		}

		//@ts-expect-error defined part of the methods
		const showClientUseCase = new ShowClientUseCase(mockClientRepository)

		const client = await showClientUseCase.execute({id: clientId})

		expect(mockClientRepository.findById).toBeCalled()
		expect(client).toStrictEqual(expectedOutputClient)

	})

	it('should fail by informing a wrong id', async () => {
		const mockClientRepository = {
			findById: jest.fn().mockReturnValue(Promise.resolve(undefined))
		}

		//@ts-expect-error defined part of the methods
		const showClientUseCase = new ShowClientUseCase(mockClientRepository)

		const wrongId = 'wrong-id'

		await expect(
			showClientUseCase.execute({id: wrongId})
		).rejects.toBeInstanceOf(AppError)
		expect(mockClientRepository.findById).toBeCalled()

	})
})

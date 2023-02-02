import 'reflect-metadata'
import {AppError} from "@shared/errors/AppError";
import {DeleteClientUseCase} from "..";
import {v4 as uuid} from 'uuid'

describe("delete client", () => {

	it('should delete the client with the informed id', async () => {

		const clientId = uuid()

		const mockClientRepository = {
			exists: jest.fn().mockReturnValue(Promise.resolve(true)),
			delete: jest.fn().mockReturnValue(Promise.resolve(true))
		}

		//@ts-expect-error defined part of the methods
		const deleteClientUseCase = new DeleteClientUseCase(mockClientRepository)

		const deleteResult = await deleteClientUseCase.execute({id: clientId})

		expect(mockClientRepository.exists).toBeCalled()
		expect(mockClientRepository.delete).toBeCalled()
		expect(deleteResult).toBe(true)

	})

	it('should fail by informing a wrong id', async () => {
		const mockClientRepository = {
			exists: jest.fn().mockReturnValue(Promise.resolve(false))
		}

		//@ts-expect-error defined part of the methods
		const deleteClientUseCase = new DeleteClientUseCase(mockClientRepository)

		const wrongId = 'wrong-id'

		await expect(
			deleteClientUseCase.execute({id: wrongId})
		).rejects.toBeInstanceOf(AppError)
		expect(mockClientRepository.exists).toBeCalled()

	})
})

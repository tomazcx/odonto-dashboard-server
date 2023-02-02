import {AppError} from '@shared/errors/AppError'
import 'reflect-metadata'
import {v4 as uuid} from 'uuid'
import {DeleteAppointmentUseCase} from '..'

describe('DeleteAppointment', () => {

	let id: string

	beforeEach(() => {
		id = uuid()
	})

	it('should delete an existing appointment', async () => {
		const mockAppointmentsRepository = {
			exists: jest.fn().mockReturnValue(Promise.resolve(true)),
			delete: jest.fn().mockReturnValue(Promise.resolve(true))
		}

		//@ts-expect-error defined part of methods
		const deleteAppointmentUseCase = new DeleteAppointmentUseCase(mockAppointmentsRepository)

		const deleteResult = await deleteAppointmentUseCase.execute({id})

		expect(deleteResult).toBe(true)
		expect(mockAppointmentsRepository.exists).toBeCalled()
		expect(mockAppointmentsRepository.delete).toBeCalled()

	})

	it('should fail by informing a wrong id', async () => {
		const mockAppointmentsRepository = {
			exists: jest.fn().mockReturnValue(Promise.resolve(false)),
		}

		//@ts-expect-error defined part of methods
		const deleteAppointmentUseCase = new DeleteAppointmentUseCase(mockAppointmentsRepository)

		await expect(deleteAppointmentUseCase.execute({id: 'wrong-id'})).rejects.toBeInstanceOf(AppError)
		expect(mockAppointmentsRepository.exists).toBeCalled()


	})

})

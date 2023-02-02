import {IAppointment} from '@modules/appointment/domain/models/IAppointment'
import {AppError} from '@shared/errors/AppError'
import 'reflect-metadata'
import {v4 as uuid} from 'uuid'
import {ShowAllClientAppointmentsUseCase} from '..'

describe('ShowAllCLientAppointments', () => {

	let clientId: string
	let id: string
	let expectedAppoitnemtnsOutput: IAppointment[]
	let mockAppointmentsRepository: any //defined part of methods

	beforeEach(() => {
		id = uuid()
		clientId = uuid()

		expectedAppoitnemtnsOutput = [
			{
				id,
				date: 'test-date',
				teeth: 'test-teeth',
				proccedure: 'test-proccedure',
				clientId
			}
		]

		mockAppointmentsRepository = {
			showAllClientAppointments: jest.fn().mockReturnValue(Promise.resolve(expectedAppoitnemtnsOutput))
		}
	})

	it('should return the data from all the appointments of the informed client', async () => {
		const mockClientsRepository = {
			exists: jest.fn().mockReturnValue(Promise.resolve(true))
		}

		//@ts-expect-error defined part of methods
		const showAllClientAppointmentsUseCase = new ShowAllClientAppointmentsUseCase(mockAppointmentsRepository, mockClientsRepository)

		const appointments = await showAllClientAppointmentsUseCase.execute({clientId})

		expect(mockClientsRepository.exists).toBeCalled()
		expect(mockAppointmentsRepository.showAllClientAppointments).toBeCalled()
		expect(appointments).toStrictEqual(expectedAppoitnemtnsOutput)
	})

	it('should fail due to wrong client id', async () => {
		const mockClientsRepository = {
			exists: jest.fn().mockReturnValue(Promise.resolve(false))
		}

		//@ts-expect-error defined part of methods
		const showAllClientAppointmentsUseCase = new ShowAllClientAppointmentsUseCase(mockAppointmentsRepository, mockClientsRepository)

		await expect(
			showAllClientAppointmentsUseCase.execute({clientId: 'wrong-id'})
		).rejects.toBeInstanceOf(AppError)
		expect(mockClientsRepository.exists).toBeCalled()
	})
})

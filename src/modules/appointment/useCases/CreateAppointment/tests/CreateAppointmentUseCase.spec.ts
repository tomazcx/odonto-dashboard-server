import 'reflect-metadata'
import {IAppointment} from '@modules/appointment/domain/models/IAppointment'
import {AppError} from '@shared/errors/AppError'
import {v4 as uuid} from 'uuid'
import {CreateAppointmentUseCase} from '..'
import {CreateAppointmentDTO} from '../domain/CreateAppointmentDTO'

describe('CreateAppointment', () => {
	let clientId: string
	let id: string
	let expectedAppointmentOutput: IAppointment
	let createAppoitnmentDTO: CreateAppointmentDTO
	let mockAppointmentsRepository: any //defined part of methods

	beforeEach(() => {
		clientId = uuid()
		id = uuid()

		expectedAppointmentOutput = {
			id,
			date: 'test-date',
			teeth: 'test-teeth',
			proccedure: 'test-proccedure',
			clientId: clientId
		}

		mockAppointmentsRepository = {
			create: jest.fn().mockReturnValue(Promise.resolve(expectedAppointmentOutput))
		}

		createAppoitnmentDTO = {
			date: 'test-date',
			teeth: 'test-teeth',
			proccedure: 'test-proccedure',
			clientId: clientId

		}
	})

	it('should create a new appointment', async () => {

		const mockClientsRepository = {
			exists: jest.fn().mockReturnValue(Promise.resolve(true))
		}

		//@ts-expect-error defined part of methods
		const createAppointmentUseCase = new CreateAppointmentUseCase(mockAppointmentsRepository, mockClientsRepository)

		const createdAppointment = await createAppointmentUseCase.execute(createAppoitnmentDTO)

		expect(mockClientsRepository.exists).toBeCalled()
		expect(mockAppointmentsRepository.create).toBeCalled()
		expect(createdAppointment).toStrictEqual(expectedAppointmentOutput)
	})

	it('shoudl fail due to invalid client id', async () => {
		const mockClientsRepository = {
			exists: jest.fn().mockReturnValue(Promise.resolve(false))
		}
		//@ts-expect-error defined part of methods
		const createAppointmentUseCase = new CreateAppointmentUseCase(mockAppointmentsRepository, mockClientsRepository)

		await expect(
			createAppointmentUseCase.execute(createAppoitnmentDTO)
		).rejects.toBeInstanceOf(AppError)

	})
})

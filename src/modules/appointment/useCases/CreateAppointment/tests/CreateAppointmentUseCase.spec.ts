import {IAppointmentsRepository} from "@modules/appointment/domain/repositories/IAppointmentsRepository"
import {MockAppointmentsRepository} from "@modules/appointment/domain/repositories/mocks/MockAppointmentsRepository"
import {IClientsRepository} from "@modules/client/domain/repositories/IClientsRepository"
import {MockClientsRepository} from "@modules/client/domain/repositories/mocks/MockClientsRepository"
import {CreateClientUseCase} from "@modules/client/useCases/CreateClient"
import {AppError} from "@shared/errors/AppError"
import {CreateAppointmentUseCase} from ".."

let mockClientsRepository: IClientsRepository
let mockAppointmentsRepository: IAppointmentsRepository
let createClientUseCase: CreateClientUseCase
let createAppointmentUseCase: CreateAppointmentUseCase

describe('CreateAppointment', () => {

	beforeAll(() => {
		mockClientsRepository = new MockClientsRepository()
		mockAppointmentsRepository = new MockAppointmentsRepository()
		createClientUseCase = new CreateClientUseCase(mockClientsRepository)
		createAppointmentUseCase = new CreateAppointmentUseCase(mockAppointmentsRepository, mockClientsRepository)
	})

	it('should create a new appointment', async () => {

		const client = {
			name: "tomaz xavier",
			age: 18,
			phoneNumber: "49998123812",
			city: 'Florianópolis',
			streetAndNumber: 'Rua da alvorada, 134',
			district: 'Centro'
		}

		const {id} = await createClientUseCase.execute(client)

		const appointment = {
			date: '01/01/2000',
			teeth: 'test-teeth',
			proccedure: 'test-proccedure',
			clientId: id
		}

		const createdAppointment = await createAppointmentUseCase.execute(appointment)

		expect(createdAppointment).toHaveProperty('id')
	})

	it('shoudl fail due to invalid client id', async () => {
		const appointment = {
			date: '01/01/2000',
			teeth: 'test-teeth',
			proccedure: 'test-proccedure',
			clientId: 'invalid-id'
		}

		await expect(
			createAppointmentUseCase.execute(appointment)
		).rejects.toBeInstanceOf(AppError)

	})
})

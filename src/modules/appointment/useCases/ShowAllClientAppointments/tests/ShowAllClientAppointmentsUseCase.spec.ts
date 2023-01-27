import {IAppointmentsRepository} from "@modules/appointment/domain/repositories/IAppointmentsRepository"
import {MockAppointmentsRepository} from "@modules/appointment/domain/repositories/mocks/MockAppointmentsRepository"
import {IClientsRepository} from "@modules/client/domain/repositories/IClientsRepository"
import {MockClientsRepository} from "@modules/client/domain/repositories/mocks/MockClientsRepository"
import {CreateClientUseCase} from "@modules/client/useCases/CreateClient"
import {ShowAllClientAppointmentsUseCase} from ".."
import {CreateAppointmentUseCase} from '@modules/appointment/useCases/CreateAppointment'
import {IAppointment} from "@modules/appointment/domain/models/IAppointment"
import {AppError} from "@shared/errors/AppError"

let mockAppointmentsRepository: IAppointmentsRepository
let mockClientsRepository: IClientsRepository
let showAllClientAppointmentsUseCase: ShowAllClientAppointmentsUseCase
let createClientUseCase: CreateClientUseCase
let createAppointmentUseCase: CreateAppointmentUseCase

describe('ShowAllCLientAppointments', () => {
	beforeAll(() => {
		mockClientsRepository = new MockClientsRepository()
		mockAppointmentsRepository = new MockAppointmentsRepository()
		showAllClientAppointmentsUseCase = new ShowAllClientAppointmentsUseCase(mockAppointmentsRepository, mockClientsRepository)
		createClientUseCase = new CreateClientUseCase(mockClientsRepository)
		createAppointmentUseCase = new CreateAppointmentUseCase(mockAppointmentsRepository, mockClientsRepository)
	})

	it('should return the data from all the appointments of the informed client', async () => {
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

		await createAppointmentUseCase.execute(appointment)

		const appointmentsClient = await showAllClientAppointmentsUseCase.execute({clientId: id})

		expect(
			appointmentsClient satisfies IAppointment[]
		).toBeTruthy()

	})

	it('should fail due to wrong client id', async () => {
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

		await createAppointmentUseCase.execute(appointment)

		await expect(
			showAllClientAppointmentsUseCase.execute({clientId: 'wrong-id'})

		).rejects.toBeInstanceOf(AppError)

	})
})

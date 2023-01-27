import {IAppointmentsRepository} from "@modules/appointment/domain/repositories/IAppointmentsRepository"
import {MockAppointmentsRepository} from "@modules/appointment/domain/repositories/mocks/MockAppointmentsRepository"
import {IClientsRepository} from "@modules/client/domain/repositories/IClientsRepository"
import {MockClientsRepository} from "@modules/client/domain/repositories/mocks/MockClientsRepository"
import {CreateClientUseCase} from "@modules/client/useCases/CreateClient"
import {AppError} from "@shared/errors/AppError"
import {DeleteAppointmentUseCase} from ".."
import {CreateAppointmentUseCase} from "../../CreateAppointment"

let mockClientsRepository: IClientsRepository
let mockAppointmentsRepository: IAppointmentsRepository
let createClientUseCase: CreateClientUseCase
let deleteAppointmentUseCase: DeleteAppointmentUseCase
let createAppointmentUseCase: CreateAppointmentUseCase

describe('DeleteAppointment', () => {

	beforeAll(() => {
		mockClientsRepository = new MockClientsRepository()
		mockAppointmentsRepository = new MockAppointmentsRepository()
		createClientUseCase = new CreateClientUseCase(mockClientsRepository)
		deleteAppointmentUseCase = new DeleteAppointmentUseCase(mockAppointmentsRepository)
		createAppointmentUseCase = new CreateAppointmentUseCase(mockAppointmentsRepository, mockClientsRepository)
	})

	it('should delete an existing appointment', async () => {
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

		const appointmentId = createdAppointment.id

		expect(
			deleteAppointmentUseCase.execute({id: appointmentId})
		).toBeTruthy()
	})

	it('should fail by informing a wrong id', async () => {
		const wrongId = 'wrong-id'

		await expect(
			deleteAppointmentUseCase.execute({id: wrongId})
		).rejects.toBeInstanceOf(AppError)

	})

})

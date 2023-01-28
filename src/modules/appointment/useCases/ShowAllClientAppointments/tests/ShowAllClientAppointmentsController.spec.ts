/**
 * @jest-environment ./prisma/prisma-environment-jest.mjs
*/
import {IAppointment} from '@modules/appointment/domain/models/IAppointment'
import {prismaClient} from '@shared/database/client'
import {app} from '@shared/http/app'
import request from 'supertest'
import {v4 as uuid} from 'uuid'

let token = ''
let clientId = ''
describe("ShowAllClientsAppointments", () => {

	//Get auth token and register client 
	beforeAll(async () => {
		const response = await request(app).post('/auth/login').send({
			user: process.env.USER_LOGIN,
			password: process.env.USER_PASSWORD
		})

		token = JSON.parse(response.text).token

		const client = await prismaClient.client.create({
			data: {
				name: "testname",
				age: 18,
				phoneNumber: "testnumber",
				address: {
					create: {
						city: "testcity"
					}
				}
			}
		})

		await prismaClient.appointment.create({
			data: {
				date: '01/01/2000',
				teeth: 'testteeth',
				proccedure: 'testproccedure',
				clientId: client.id
			}
		})

		clientId = client.id
	})

	it('should fail due to lack of authentication', async () => {
		const response = await request(app).get(`/appointments/all/${clientId}`)
		expect(response.status).toBe(401)
	})

	it('should show all the appointments from the informed client', async () => {
		const response = await request(app).get(`/appointments/all/${clientId}`).set({
			'Authorization': `Bearer: ${token}`
		})

		const data = JSON.parse(response.text)
		const appointmentTest = data[0]

		expect(appointmentTest.teeth).toBe('testteeth')
	})

	it('should fail due to wrong client id format', async () => {
		const response = await request(app).get(`/appointments/all/wronguuid`).set({
			'Authorization': `Bearer: ${token}`
		})

		expect(response.status).toBe(400)
	})

	it('should fail due to inexistent client id', async () => {
		const response = await request(app).get(`/appointments/all/${uuid()}`).set({
			'Authorization': `Bearer: ${token}`
		})

		expect(response.status).toBe(404)

	})

})

/**
 * @jest-environment ./prisma/prisma-environment-jest.mjs
*/

import {prismaClient} from '@shared/database/client'
import {app} from '@shared/http/app'
import request from 'supertest'
import {v4 as uuid} from 'uuid'

let token = ''
let appointmentId = ''
describe('DeleteAppointment', () => {

	//Get auth token
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

		const appointment = await prismaClient.appointment.create({
			data: {
				date: '01/01/2000',
				teeth: 'testteeth',
				proccedure: 'testproccedure',
				clientId: client.id
			}
		})

		appointmentId = appointment.id
	})

	it('should delete an appointment', async () => {
		const response = await request(app).delete(`/appointments/${appointmentId}`).set('Authorization', `Bearer: ${token}`)
		const statusMessage = JSON.parse(response.text)

		expect(statusMessage.status).toBe('Consulta deletada')
	})
})

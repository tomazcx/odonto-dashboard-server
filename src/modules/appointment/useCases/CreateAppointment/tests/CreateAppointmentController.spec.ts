/**
 * @jest-environment ./prisma/prisma-environment-jest.mjs
*/

import {prismaClient} from "@shared/database/client"
import {app} from "@shared/http/app"
import request from "supertest"
import '@config/dotenv'
import {v4 as uuid} from 'uuid'

let token = ''
let clientId = ''
describe('CreateAppointment', () => {

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

		clientId = client.id

	})

	it('should fail due to lack of authentication', async () => {
		const response = await request(app).post(`/appointments/create/${clientId}`).send({
			date: "01/01/2000",
			teeth: "testteeth",
			proccedure: "testproccedure"
		})

		expect(response.status).toBe(401)
	})

	it('should create a new appointment', async () => {

		const response = await request(app).post(`/appointments/create/${clientId}`).send({
			date: "01/01/2000",
			teeth: "testteeth",
			proccedure: "testproccedure",
		}).set('Authorization', `Bearer: ${token}`)


		const createdAppointment = JSON.parse(response.text)

		expect(createdAppointment).toHaveProperty('id')
	})

	it('should fail due to invalid client id format', async () => {
		const response = await request(app).post(`/appointments/create/invalid_uuid`).send({
			date: "01/01/2000",
			teeth: "testteeth",
			proccedure: "testproccedure",
		}).set('Authorization', `Bearer: ${token}`)

		expect(response.status).toBe(400)
	})

	it('should fail due to unexistent client id', async () => {
		const response = await request(app).post(`/appointments/create/${uuid()}`).send({
			date: "01/01/2000",
			teeth: "testteeth",
			proccedure: "testproccedure"
		}).set('Authorization', `Bearer: ${token}`)

		expect(response.status).toBe(404)
	})

	it('should fail due to lack of required field', async () => {
		const response = await request(app).post(`/appointments/create/${uuid()}`).send({
			teeth: "testteeth",
			proccedure: "testproccedure",
		}).set('Authorization', `Bearer: ${token}`)


		expect(response.status).toBe(400)
	})

})

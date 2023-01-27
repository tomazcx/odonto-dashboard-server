/**
 * @jest-environment ./prisma/prisma-environment-jest.mjs
*/

import {IClient} from "@modules/client/domain/models/IClient"
import {prismaClient} from "@shared/database/client"
import {app} from "@shared/http/app"
import request from 'supertest'

let token = ''

describe('ShowAllClients', () => {

	beforeAll(async () => {
		const responseAuth = await request(app).post('/auth/login').send({
			user: process.env.USER_LOGIN,
			password: process.env.USER_PASSWORD
		})

		token = JSON.parse(responseAuth.text).token

		await prismaClient.client.create({
			data: {
				name: "testclient",
				age: 18,
				phoneNumber: "testnumber",
				address: {
					create: {
						city: 'testcity'
					}
				}
			}
		})

	})

	it('should fail due to lack of authorization', async () => {
		const response = await request(app).get('/clients/all')
		expect(response.status).toBe(401)
	})


	it('should show all the registered clients', async () => {
		const response = await request(app).get('/clients/all').set('Authorization', `Bearer: ${token}`)

		const clients = JSON.parse(response.text)

		expect(clients satisfies IClient[]).toBeTruthy()
	})

})

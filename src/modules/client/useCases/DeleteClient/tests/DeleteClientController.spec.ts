/**
 * @jest-environment ./prisma/prisma-environment-jest.mjs
*/

import {prismaClient} from '@shared/database/client'
import {app} from '@shared/http/app'
import request from 'supertest'
import {v4 as uuid} from 'uuid'

let token = ''
let clientId = ''
describe('DeleteClient', () => {

	beforeAll(async () => {
		const responseAuth = await request(app).post('/auth/login').send({
			user: process.env.USER_LOGIN,
			password: process.env.USER_PASSWORD
		})

		token = JSON.parse(responseAuth.text).token

		const createdClient = await prismaClient.client.create({
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

		clientId = createdClient.id

	})

	it('should fail due to lack of authorization', async () => {
		const response = await request(app).delete(`/clients/${clientId}`)
		expect(response.status).toBe(401)

	})

	it('should delete a registered client', async () => {

		const response = await request(app).delete(`/clients/${clientId}`).set('Authorization', `Bearer: ${token}`)

		expect(response.status).toBe(200)

	})

	it('should fail due to invalid id format', async () => {
		const response = await request(app).delete(`/clients/uuid`).set('Authorization', `Bearer: ${token}`)

		expect(response.status).toBe(400)

	})

	it('should fail due to inexistent id', async () => {
		const response = await request(app).delete(`/clients/${uuid()}`).set('Authorization', `Bearer: ${token}`)

		expect(response.status).toBe(404)

	})
})

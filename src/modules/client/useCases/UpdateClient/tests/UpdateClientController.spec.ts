/**
 * @jest-environment ./prisma/prisma-environment-jest.mjs
*/

import {IClient} from '@modules/client/domain/models/IClient'
import {prismaClient} from '@shared/database/client'
import {app} from '@shared/http/app'
import request from 'supertest'
import {v4 as uuid} from 'uuid'

let token = ''
let client = {} as IClient
describe('UpdateClient', () => {

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
			},
			include: {
				address: true
			}
		})

		client = createdClient as IClient

	})

	it('should fail due to lack of authorization', async () => {
		const body = {
			name: 'testname',
			age: 18,
			phoneNumber: 'test-number',
		}
		const response = await request(app).put(`/clients/uuid`).send(body)
		expect(response.status).toBe(401)
	})


	it('should update the data of an existing client', async () => {

		client.address!.city = 'testcityupdated'

		const response = await request(app).put(`/clients/${client.id}`).send(client).set('Authorization', `Bearer: ${token}`)

		const updatedCity = JSON.parse(response.text).updatedClient.address.city

		expect(updatedCity).toBe('testcityupdated')

	})

	it('should fail due to lack of required fields', async () => {
		const responseAuth = await request(app).post('/auth/login').send({
			user: process.env.USER_LOGIN,
			password: process.env.USER_PASSWORD
		})

		const token = JSON.parse(responseAuth.text).token

		const id = uuid()

		const body = {
			age: 18,
			phoneNumber: 'test-number',
			city: 'testcity'
		}
		const response = await request(app).put(`/clients/${id}`).send(body).set('Authorization', `Bearer: ${token}`)

		expect(response.status).toBe(400)
	})

	it('should fail due to invalid id format', async () => {

		const id = 'invalid-uuid'

		const response = await request(app).put(`/clients/${id}`).send(client).set('Authorization', `Bearer: ${token}`)
		expect(response.status).toBe(400)
	})

	it('should fail due to unexisting id', async () => {
		const id = uuid()

		const response = await request(app).put(`/clients/${id}`).send(client).set('Authorization', `Bearer: ${token}`)
		expect(response.status).toBe(404)
	})
})



/**
 * @jest-environment ./prisma/prisma-environment-jest.mjs
*/

import {IClient} from '@modules/client/domain/models/IClient'
import {prismaClient} from '@shared/database/client'
import {app} from '@shared/http/app'
import request from 'supertest'
import {v4 as uuid} from 'uuid'

describe('ShowClient', () => {

	it('should fail due to lack of authorization', async () => {
		const response = await request(app).get('/clients/uuid')
		expect(response.status).toBe(401)
	})

	it('should show the data of a registered client', async () => {
		const responseAuth = await request(app).post('/auth/login').send({
			user: process.env.USER_LOGIN,
			password: process.env.USER_PASSWORD
		})

		const token = JSON.parse(responseAuth.text).token

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
		const idClient = createdClient.id
		const response = await request(app).get(`/clients/${idClient}`).set('Authorization', `Bearer: ${token}`)

		const client = JSON.parse(response.text)

		expect(client).toHaveProperty('id')
	})

	it('should fail due to invalid id format', async () => {

		const responseAuth = await request(app).post('/auth/login').send({
			user: process.env.USER_LOGIN,
			password: process.env.USER_PASSWORD
		})

		const token = JSON.parse(responseAuth.text).token


		const idClient = 'test-id'
		const response = await request(app).get(`/clients/${idClient}`).set('Authorization', `Bearer: ${token}`)

		expect(response.status).toBe(400)
	})

	it('should fail due to inexistent id', async () => {

		const responseAuth = await request(app).post('/auth/login').send({
			user: process.env.USER_LOGIN,
			password: process.env.USER_PASSWORD
		})

		const token = JSON.parse(responseAuth.text).token


		const idClient = uuid()
		const response = await request(app).get(`/clients/${idClient}`).set('Authorization', `Bearer: ${token}`)

		expect(response.status).toBe(404)
	})
})

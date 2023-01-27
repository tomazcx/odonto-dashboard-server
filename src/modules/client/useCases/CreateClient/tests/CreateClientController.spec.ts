/**
 * @jest-environment ./prisma/prisma-environment-jest.mjs
*/

import {app} from "@shared/http/app"
import request from "supertest"
import '@config/dotenv'

let token = ''
describe('CreateClient', () => {

	beforeAll(async () => {
		const responseAuth = await request(app).post('/auth/login').send({
			user: process.env.USER_LOGIN,
			password: process.env.USER_PASSWORD
		})

		token = JSON.parse(responseAuth.text).token

	})

	it('should fail due to lack of authorization', async () => {
		const response = await request(app).post('/clients/create').send({
			name: "testname",
			age: 18,
			phoneNumber: "testnumber",
			city: 'testcity',
			streetAndNumber: 'teststretandnumber',
			district: 'testdistrict'
		})

		expect(response.status).toBe(401)
	})

	it('should create a new user', async () => {
		const response = await request(app).post('/clients/create').send({
			name: "testname",
			age: 18,
			phoneNumber: "testnumber",
			city: 'testcity',
			streetAndNumber: 'teststretandnumber',
			district: 'testdistrict'
		}).set('Authorization', `Bearer: ${token}`)


		expect(response.status).toBe(201)

	})

	it('should fail due to lack of required field', async () => {
		const response = await request(app).post('/clients/create').send({
			age: 18,
			phoneNumber: "testnumber",
			city: 'testcity',
			streetAndNumber: 'teststretandnumber',
			district: 'testdistrict'
		}).set('Authorization', `Bearer: ${token}`)

		expect(response.status).toBe(400)

	})

})

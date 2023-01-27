/**
 * @jest-environment ./prisma/prisma-environment-jest.mjs
*/

import {app} from "@shared/http/app"
import request from "supertest"
import '@config/dotenv'

describe('CreateClient', () => {

	it('should fail due to lack of authorization', async () => {
		const response = await request(app).post('/clients/create').send({
			name: "tomaz xavier",
			age: 18,
			phoneNumber: "49998123812",
			city: 'Florianópolis',
			streetAndNumber: 'Rua da alvorada, 134',
			district: 'Centro'
		})

		expect(response.status).toBe(401)
	})

	it('should create a new user', async () => {

		const responseAuth = await request(app).post('/auth/login').send({
			user: process.env.USER_LOGIN,
			password: process.env.USER_PASSWORD
		})

		const token = JSON.parse(responseAuth.text).token

		const response = await request(app).post('/clients/create').send({
			name: "tomaz xavier",
			age: 18,
			phoneNumber: "49998123812",
			city: 'Florianópolis',
			streetAndNumber: 'Rua da alvorada, 134',
			district: 'Centro'
		}).set('Authorization', `Bearer: ${token}`)


		expect(response.status).toBe(201)

	})

	it('should fail due to lack of required field', async () => {
		const responseauth = await request(app).post('/auth/login').send({
			user: process.env.user_login,
			password: process.env.user_password
		})

		const token = JSON.parse(responseauth.text).token

		expect(request(app).post('/clients/create').send({
			age: 18,
			phonenumber: "49998123812",
			city: 'florianópolis',
			streetandnumber: 'rua da alvorada, 134',
			district: 'centro'
		}).set('authorization', `bearer: ${token}`)).rejects

	})

})

import {app} from "@shared/http/app"
import request from "supertest"
import '@config/dotenv'


describe('CreateSession', () => {
	it('should authenticate', async () => {
		const response = await request(app).post('/auth/login').send({
			user: process.env.USER_LOGIN,
			password: process.env.USER_PASSWORD
		})

		const message = JSON.parse(response.text)

		expect(message).toHaveProperty('token')
	})

	it('should failt due to lack of user', async () => {
		const response = await request(app).post('/auth/login').send({
			password: process.env.USER_PASSWORD
		})
		expect(response.status).toBe(400)
	})

	it('should fail due to lack of password', async () => {

		const response = await request(app).post('/auth/login').send({
			user: process.env.USER_LOGIN
		})
		expect(response.status).toBe(400)
	})

	it('should fail due to invalid credentials', async () => {
		const response = await request(app).post('/auth/login').send({
			user: 'testuser',
			password: 'testpassword'
		})

		expect(response.status).toBe(401)
	})
})

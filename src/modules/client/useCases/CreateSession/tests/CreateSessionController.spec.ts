import {app} from "@shared/http/app"
import request from "supertest"
import '@config/dotenv'


describe('CreateSession', () => {
	it('should authenticate', async () => {
		const response = await request(app).post('/auth/login').send({
			user: process.env.USER_LOGIN,
			password: process.env.USER_PASSWORD
		})

		expect(response.status).toBe(200)
	})

	it('should failt due to lack of password', async () => {

		expect(request(app).post('/auth/login').send({
			user: '',
			password: process.env.USER_PASSWORD
		})).rejects
	})

	it('should fail due to lack of user', async () => {

		expect(request(app).post('/auth/login').send({
			user: process.env.USER_LOGIN,
			password: ''
		})).rejects
	})

	it('should fail due to invalid credentials', async () => {
		const response = await request(app).post('/auth/login').send({
			user: 'testuser',
			password: 'testpassword'
		})

		expect(response.status).toBe(401)
	})
})

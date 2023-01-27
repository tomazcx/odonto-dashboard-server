import {CreateSessionUseCase} from ".."
import '@config/dotenv'
import {AppError} from "@shared/errors/AppError"

let createSessionUseCase: CreateSessionUseCase

describe('CreateSession', () => {

	beforeAll(() => {
		createSessionUseCase = new CreateSessionUseCase()
	})

	it('should be able to authenticate by returning a jwt', async () => {
		const data = {
			user: process.env.USER_LOGIN ?? '',
			password: process.env.USER_PASSWORD ?? ''
		}

		const authObj = await createSessionUseCase.execute(data)

		expect(authObj).toHaveProperty('token')

	})

	it('should throw an error due to invalid user', async () => {
		const data = {
			user: "testuser",
			password: process.env.USER_PASSWORD ?? ''
		}

		await expect(
			createSessionUseCase.execute(data)
		).rejects.toBeInstanceOf(AppError)

	})

	it('should throw an error due to invalid password', async () => {
		const data = {
			user: process.env.USER_LOGIN ?? '',
			password: 'testpassword'
		}

		await expect(
			createSessionUseCase.execute(data)
		).rejects.toBeInstanceOf(AppError)

	})
})

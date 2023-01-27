import JestEnvironment from 'jest-environment-node'
import {v4 as uuid} from 'uuid'
import {execSync} from 'child_process'
import {resolve} from 'path'
import * as dotenv from 'dotenv'
import mysql from 'mysql2'
import path from 'path'
import {fileURLToPath} from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({
	path: resolve(__dirname, '..', ".env.test")
})

const prismaCli = "./node_modules/.bin/prisma"
const NodeEnviroment = JestEnvironment.TestEnvironment
export default class CustomEnvironment extends NodeEnviroment {

	constructor(config) {
		super(config)
		this.connectionString = `${process.env.DATABASE_URL}odonto_dashboard_test`
	}

	setup() {
		process.env.DATABASE_URL = this.connectionString
		this.global.process.env.DATABASE_URL = this.connectionString

		//run migrations
		execSync(`${prismaCli} migrate dev`)
	}

	teardown() {
		const connection = mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: 'tomaz1224',
			database: 'odonto_dashboard_test'
		})

		connection.query("DELETE FROM odonto_dashboard_test.clients", (err, result) => {
			if (err) throw err

		})
		connection.end()
	}
}

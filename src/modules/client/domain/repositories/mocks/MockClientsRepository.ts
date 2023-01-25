import {CreateClientDTO} from "@modules/client/useCases/CreateClient/domain/CreateClientDTO";
import {UpdateClientDTO} from "@modules/client/useCases/UpdateClient/domain/UpdateClientDTO";
import {IClient} from "../../models/IClient";
import {v4 as uuid} from 'uuid'
import {IClientsRepository} from "../IClientsRepository";

export class MockClientsRepository implements IClientsRepository {

	private clients: IClient[] = []

	public async findAll(): Promise<IClient[]> {
		return this.clients
	}

	public async findById(id: string): Promise<IClient | undefined> {
		const client = this.clients.find(client => client.id === id)
		return client
	}

	public async create({name, phoneNumber, age, city, anamnese, budget, budgetDescrpiton, district, streetAndNumber}: CreateClientDTO): Promise<IClient> {
		const id = uuid()
		const addressId = uuid()

		const client: IClient = {
			id,
			name,
			phoneNumber,
			age,
			address: {
				id: addressId,
				city,
				district,
				streetAndNumber,
				clientId: id
			},
			budget,
			budgetDescrpiton,
			anamnese
		}

		this.clients.push(client)

		return client
	}

	public async update({id, clientData}: UpdateClientDTO): Promise<IClient> {
		const client = this.clients.find(client => client.id === id)
		const indexOfClient = this.clients.indexOf(client!)
		this.clients[indexOfClient] = clientData

		return clientData

	}

	public async delete(id: string): Promise<void> {
		this.clients = this.clients.filter(client => client.id !== id)
	}
}

import {IClient} from "@modules/client/domain/models/IClient";
import {IClientsRepository} from "@modules/client/domain/repositories/IClientsRepository";
import {CreateClientDTO} from "@modules/client/useCases/CreateClient/domain/CreateClientDTO";
import {DeleteClientDTO} from "@modules/client/useCases/DeleteClient/domain/DeleteClientDTO";
import {UpdateClientDTO} from "@modules/client/useCases/UpdateClient/domain/UpdateClientDTO";
import {PrismaClient} from "@prisma/client";
import {prismaClient} from "@shared/database/client";


export class ClientsRepository implements IClientsRepository {
	private ormRepository: PrismaClient["client"]

	constructor() {
		this.ormRepository = prismaClient.client
	}

	public async exists(id: string): Promise<boolean> {
		const client = await this.ormRepository.findFirst({where: {id}})
		return !!client
	}

	public async findAll(): Promise<IClient[]> {
		const clients = await this.ormRepository.findMany({
			include: {
				address: true,
				appointments: true
			}
		})
		return clients
	}

	public async findById(id: string): Promise<IClient> {
		const client = await this.ormRepository.findFirst({where: {id}, include: {address: true, appointments: true}})
		return client as IClient
	}

	public async create(data: CreateClientDTO): Promise<IClient> {
		const client = await this.ormRepository.create({
			data: {
				name: data.name,
				age: data.age,
				phoneNumber: data.phoneNumber,
				address: {
					create: {
						city: data.city,
						district: data.district,
						streetAndNumber: data.streetAndNumber

					}
				},
				budget: data.budget,
				budgetDescrpiton: data.budgetDescrpiton,
				anamnese: data.anamnese
			},
			include: {
				address: true
			}

		})

		return client as IClient
	}

	public async update({id, clientData}: UpdateClientDTO): Promise<IClient> {
		const client = await this.ormRepository.update({
			where: {
				id: id
			},
			data: {
				name: clientData.name,
				age: clientData.age,
				phoneNumber: clientData.phoneNumber,
				address: {
					update: {
						city: clientData.address?.city,
						district: clientData.address?.district,
						streetAndNumber: clientData.address?.streetAndNumber
					}
				},
				budget: clientData.budget,
				budgetDescrpiton: clientData.budgetDescrpiton,
				anamnese: clientData.anamnese
			},
			include: {
				address: true
			}
		})

		return client as IClient
	}

	public async delete({id}: DeleteClientDTO): Promise<boolean> {
		await this.ormRepository.delete({where: {id}})
		return true
	}
}

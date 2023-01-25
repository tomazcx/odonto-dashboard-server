import {IClient} from "@modules/client/domain/models/IClient"

export interface UpdateClientDTO {
	id: string
	clientData: IClient
}

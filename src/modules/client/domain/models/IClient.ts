import {IAppointment} from "@modules/appointment/domain/models/IAppointment"
import {IAddress} from "./IAddress"

export interface IClient {
	id: string
	name: string
	age: number
	phoneNumber: string
	address: IAddress | null
	budget?: string | null
	budgetDescrpiton?: string | null
	anamnese?: string | null
	appointments?: IAppointment[]
}

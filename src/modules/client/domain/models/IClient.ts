import {IAppointment} from "@modules/appointment/domain/models/IAppointment"
import {IAddress} from "./IAddress"

export interface IClient {
	id: string
	name: string
	age: number
	phoneNumber: string
	address: IAddress
	budget?: string
	budgetDescrpiton?: string
	anamnese?: string
	appointments?: IAppointment[]
}

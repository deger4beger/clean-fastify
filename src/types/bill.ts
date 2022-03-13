import { UserDTO } from '.';

export interface BillDTO {
	name: string
	description: string
	cost: number,
	isArchived?: boolean
	paidBy?: UserDTO
}

export interface BillRequestBuyOneBody {
	billId: string
}
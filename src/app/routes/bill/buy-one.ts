import httpCodes from "@inip/http-codes"
import { FastifyPlugin } from "fastify"
import { getConnection } from 'typeorm';

import { RequestHandler } from 'types'
import { BillRequestBuyOneBody } from '../../../types';
import { Bill, User } from '../../../lib/orm/entity';
import { commonBillScheme } from '../../schemes';

const buyOne: FastifyPlugin = async function(
	instance,
	options,
	done
): Promise<void> {
	instance.route({
		method: "DELETE",
		url: "/",
		preHandler: [instance.authGuard],
		schema,
		handler
	})
}

const handler: RequestHandler<BillRequestBuyOneBody> = async function(
	req,
	res
): Promise<Bill> {

	const { billId } = req.body
	const { email } = req.user

	const billRepository = getConnection().getRepository(Bill)
	const userRepository = getConnection().getRepository(User)

	const user = await userRepository.findOne({
		where: { email },
		relations: ["paycard"]
	}) as User
	const billToBuy = await billRepository.findOne(billId)

	if (!billToBuy || billToBuy?.isArchived) {
		throw req.throwError(httpCodes.BAD_REQUEST, "Bill not available")
	}
	if (user.paycard.balance < billToBuy.cost) {
		throw req.throwError(httpCodes.BAD_REQUEST, "Not enough money")
	}

	user.paycard.balance -= billToBuy.cost
	billToBuy.owner = user
	billToBuy.isArchived = true

	let finalBill: Bill

	try {
		finalBill = await billRepository.save(billToBuy)

		throw new Error("test error")

		await userRepository.save(user)
	} catch {
		throw req.throwError(httpCodes.INTERNAL_SERVER_ERROR, "Internal server error")
	}

	return finalBill

}

const schema = {
	tags: ["Bill"],
	body: {
		type: "object",
		properties: {
			billId: { type: "string" }
		},
		required: ["billId"]
	},
	response: {
        200: {
			type: "object",
			properties: {
				id: { type: "string" },
				isArchived: { type: "boolean" },
				...commonBillScheme
			}
		},
    }
}

export default buyOne
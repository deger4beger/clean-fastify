import httpCodes from "@inip/http-codes"
import { FastifyPlugin } from "fastify"
import { getConnection } from 'typeorm';

import { RequestHandler } from 'types'
import { BillRequestBuyOneBody } from '../../../types';
import { Bill, User } from '../../../lib/orm/entity';
import { commonBillScheme } from '../../schemes';

export const buyOne: FastifyPlugin = async function(
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

export const handler: RequestHandler<BillRequestBuyOneBody> = async function(
	req,
	res
): Promise<Bill> {

	const { billId } = req.body
	const { email } = req.user!

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

	try {
		await getConnection().transaction(async transactionManager => {
			await transactionManager.save(billToBuy)
			await transactionManager.save(user)
		})
	} catch {
		throw req.throwError(httpCodes.INTERNAL_SERVER_ERROR, "Internal server error")
	}

	return await billRepository.findOne(billId) as Bill

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
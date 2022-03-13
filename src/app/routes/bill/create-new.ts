import httpCodes from "@inip/http-codes"
import { FastifyPlugin } from "fastify"
import { getConnection } from 'typeorm';

import { RequestHandler } from 'types'
import { BillDTO } from '../../../types';
import { commonBillScheme } from '../../schemes';
import { Bill } from '../../../lib/orm/entity';

const createNew: FastifyPlugin = async function(
	instance,
	options,
	done
): Promise<void> {
	instance.route({
		method: "POST",
		url: "/",
		preHandler: [instance.adminGuard],
		schema,
		handler
	})
}

const handler: RequestHandler<BillDTO> = async function(
	req,
	res
): Promise<BillDTO> {

	const billRepository = getConnection().getRepository(Bill)
	const payload = req.body

	let newBill = billRepository.create(payload)

	try {
		newBill = await billRepository.save(newBill)
	} catch {
		throw req.throwError(httpCodes.INTERNAL_SERVER_ERROR, "Internal server error")
	}

	return newBill

}

const schema = {
	tags: ["Bill"],
	body: {
		type: "object",
		properties: commonBillScheme,
		required: ["name", "description", "cost"]
	},
	response: {
        200: {
			type: "object",
			properties: {
				id: { type: "string", },
				...commonBillScheme
			}
		},
    }
}

export default createNew
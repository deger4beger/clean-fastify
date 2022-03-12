import httpCodes from "@inip/http-codes"
import { FastifyPlugin } from "fastify"
import { getConnection } from 'typeorm'

import { RequestHandler } from 'types'
import { Paycard } from '../../../lib/orm/entity'
import { UserRequestTopUpBalanceBody, UserResponseTopUpBalance } from 'types';

const topUpBalance: FastifyPlugin = async function(
	instance,
	options,
	done
): Promise<void> {
	instance.route({
		method: "PATCH",
		url: "/balance",
		preHandler: [instance.authGuard],
		schema,
		handler
	})
}

const handler: RequestHandler<UserRequestTopUpBalanceBody> = async function(
	req,
	res
): Promise<UserResponseTopUpBalance> {

	const paycardRepository = getConnection().getRepository(Paycard)
	const { id: owner } = req.user
	const { balanceToAdd } = req.body

	let paycard = await paycardRepository.findOne({where: { owner }}) as Paycard

	paycard.balance += balanceToAdd

	try {
		paycard = await paycardRepository.save(paycard)
	} catch {
		throw req.throwError(httpCodes.INTERNAL_SERVER_ERROR, "Internal server error")
	}

	return {
		balance: paycard.balance
	}

}

const schema = {
	tags: ["User"],
	body: {
		type: "object",
		properties: {
			balanceToAdd: {
				type: "number"
			}
		},
		required: ["balanceToAdd"]
	},
	response: {
        200: {
            type: "object",
            properties: {
                balance: { type: "string" }
            },
        },
    },
    security: [
      	{
        	"bearer": []
      	}
    ]
}

export default topUpBalance
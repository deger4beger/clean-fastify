import {
	FastifyRequest,
	FastifyReply,
	RequestParamsDefault,
	RequestBodyDefault
} from "fastify"

export type RequestHandler = (
	req: FastifyRequest,
	res: FastifyReply
) => any

export type RequestHandlerWithParams<
	Body=RequestBodyDefault,
	Params=RequestParamsDefault
> = (
	req: FastifyRequest<{
		Body: Body,
		Params: Params
	}>,
	res: FastifyReply
) => any
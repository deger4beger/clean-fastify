import { FastifyError, FastifyRequest } from 'fastify';

function throwError(
    instance: FastifyRequest,
    statusCode: number,
    message: string,
    thrownError?: Error
): FastifyError {
    if (thrownError) {
        instance.log.error(thrownError)
    }
    const err = new Error() as FastifyError
    err.statusCode = statusCode;
    err.message = message
    return err
}

export default throwError
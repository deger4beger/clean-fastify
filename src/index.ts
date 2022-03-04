import { FastifyCore } from './app';

const main = async () => {
	const app = new FastifyCore()
	await app.listen()
}

main()
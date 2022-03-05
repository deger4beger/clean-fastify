import { FastifyCore } from './app';
import { initORM } from './lib/orm';

const main = async () => {
	await initORM()
	const app = new FastifyCore()
	await app.listen()
}

main()
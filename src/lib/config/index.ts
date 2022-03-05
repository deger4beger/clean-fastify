const config = {
	port: <number>Number(<string>process.env.PORT) || 8080,
	logger: {
        prettyPrint: <boolean>(process.env.LOGGING_PRETTY_PRINT === 'true' || true), // change if .env
        level: process.env.LOGGING_LEVEL || 'info',
    },
    typeORM: {
        type: <string>process.env.TYPE_ORM_CONNECTION || "postgres",
        host: <string>process.env.TYPE_ORM_HOST || "localhost",
        port: <number>Number(<string>process.env.TYPE_ORM_PORT) || 3060,
        username: <string>process.env.TYPE_ORM_USERNAME || "postgres",
        password: <string>process.env.TYPE_ORM_PASSWORD || "deger",
        database: <string>process.env.TYPE_ORM_DATABASE || "unknown_db",
        synchronize: <boolean>(process.env.TYPE_ORM_SYNCHRONIZE === "true" || true), // change if .env
        logging: <boolean>(process.env.TYPE_ORM_LOGGING === "true" || true), // change if .env
    }
}

export default config
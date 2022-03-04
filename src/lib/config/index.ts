const config = {
	port: <number>Number(<string>process.env.PORT) || 8080,
	logging: {
        prettyPrint: <boolean>(process.env.LOGGING_PRETTY_PRINT === 'true' || false),
        level: process.env.LOGGING_LEVEL || 'info',
    },
}

export default config
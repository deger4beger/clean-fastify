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
    },
    auth: {
        jwtSecret: <string>process.env.JWT_SECRET || "gtrpohgkeropk12k3k124oi23j4oifefe",
        jwtExpires: <string>process.env.JWT_EXPIRES || "1d"
    },
    helmet: {
        contentSecurityPolicy: {
              directives: {
                defaultSrc: [`'self'`],
                styleSrc: [`'self'`, `'unsafe-inline'`],
                imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
                scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
              }
        }
    },
    swagger: {
        info: {
            title: "Clean-fastify api documentation",
            version: "0.1.0"
        },
        host: "localhost:8080",
        schemes: ["http"],
        consumes: ["application/json"],
        produces: ["application/json"],
        securityDefinitions: {
            bearer: {
                type: "http",
                scheme: "bearer",
                name: "Authorization token",
                bearerFormat: "JWT"
            }
        }
    },
    cloudinary: {
        cloud_name: <string>process.env.CLOUD_NAME || "dxcxlhyqc",
        api_key: <string>process.env.CLOUD_API_KEY || "461559811626424",
        api_secret: <string>process.env.CLOUD_API_SECRET || "XHJ0Fkx5y20KH0GDp45WJO8o4w8"
    }
}

export default config
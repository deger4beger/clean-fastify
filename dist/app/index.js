"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FastifyCore = void 0;
const fastify_1 = __importDefault(require("fastify"));
const fastify_cors_1 = __importDefault(require("fastify-cors"));
const fastify_helmet_1 = __importDefault(require("fastify-helmet"));
const decorators_1 = require("./decorators");
const config_1 = __importDefault(require("lib/config"));
class FastifyCore {
    constructor() {
        this.server = (0, fastify_1.default)();
        // Core plugins
        this.server.register(fastify_helmet_1.default);
        this.server.register(fastify_cors_1.default);
        // Decorators
        this.server.decorateRequest("throwError", decorators_1.throwError);
        this.server.ready(() => {
            console.log(this.server.printRoutes());
        });
    }
    async listen() {
        try {
            return this.server.listen(config_1.default.port, "localhost");
        }
        catch (err) {
            this.server.log.error(err);
            process.exit(1);
        }
    }
}
exports.FastifyCore = FastifyCore;

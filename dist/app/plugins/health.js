"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const health = async (instance, options, done) => {
    instance.route({
        method: "GET",
        url: "/health",
        handler
    });
};
const handler = async (req, reply) => {
    reply.send("alive");
};
exports.default = health;

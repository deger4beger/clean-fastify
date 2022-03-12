import multer from "fastify-multer"

const storage = multer.memoryStorage()
export const inMemoryMulter = multer({ storage: storage })

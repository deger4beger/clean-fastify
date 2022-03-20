import server from "./index"

import { initORM } from "./lib/orm"
import { FastifyCore } from "./app"

jest.mock("./lib/orm")
jest.mock("./app")

test('Main should init', async () => {
    await server()

    expect(initORM).toHaveBeenCalledTimes(2)
    expect(FastifyCore).toHaveBeenCalledTimes(2)
});
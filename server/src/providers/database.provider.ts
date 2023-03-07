import { Pool } from "pg"
import env from "../utils/helpers/env.helper"

const appEnv = env("ENV") ?? "dev"

const db: Pool = new Pool({
    user: env("DB_USER"),
    host: env("DB_HOST"),
    database: appEnv === "test" ? env("DB_TEST_NAME") : env("DB_NAME"),
    password: env("DB_PASS"),
    port: parseInt(env("DB_PORT") as string),
})

export default db
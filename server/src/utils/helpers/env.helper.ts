import dotenv from "dotenv"

dotenv.config()

export default (key: string): string => {
    return process.env[key] as string
}
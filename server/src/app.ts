import express, { Application, json, urlencoded } from "express"
import helmet from "helmet"
import cors from "cors"
import morgan from "morgan"
import router from "./router"
import fileUpload from "express-fileupload"
import env from "./utils/helpers/env.helper"

const app: Application = express()
const port = env("PORT") || 8080

// Middlewares
app.use(
    cors(),
    json(),
    urlencoded({ extended: true }),
    helmet(),
    morgan("dev")
)

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
    limits: {
        fileSize: 1 * 1024 * 1024
    },
    abortOnLimit: true
}));

// Application router
app.use("/api", router)
app.get("/", (req, res) => {
    res.send({
        message: "healthy: Ok!"
    })
})

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})

export default app
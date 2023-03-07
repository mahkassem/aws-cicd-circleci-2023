import { Router } from "express"
import authRouter from "./auth.router"
import fileRouter from "./file.router"
import studentRouter from "./student.router"
import userRouter from "./user.router"
import nodemailer from "nodemailer"

const router: Router = Router()

router.use("/auth", authRouter)
router.use("/files", fileRouter)
router.use("/user", userRouter)
router.use("/student", studentRouter)
router.get("/send-mail", (req, res) => {
    try {
        const transport = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 587,
            auth: {
                user: "08ecd36cc247cb",
                pass: "40543242697c2b"
            }
        });

        const message = {
            from: "School Admin <admin@school.test>",
            to: "Your Name <you@school.test>",
            subject: "Test email",
            text: "Hello world",
            html: "<b>Hello world</b>"
        }

        transport.sendMail(message);

        res.send("Mail sent successfully")
    } catch (error: any) {
        res.status(500).send(error)
    }
})

export default router
import nodemailer from "nodemailer";
import env from "../utils/helpers/env.helper";

const transport = nodemailer.createTransport({
    host: env("MAIL_HOST"),
    port: parseInt(env("MAIL_PORT")),
    auth: {
        user: env("MAIL_USER"),
        pass: env("MAIL_PASS")
    }
});

export default transport;
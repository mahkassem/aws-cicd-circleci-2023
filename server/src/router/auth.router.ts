import { Router } from "express"
import { loginHandler, registerHandler } from "../controllers/auth.controller"
import { createUserValidator, loginUserValidator } from "../validators/users.validator"

const authRouter: Router = Router()

authRouter.post(
    "/register", // * URI
    createUserValidator, // ! Validator
    registerHandler // ? Handler
)

authRouter.post(
    "/login", // * URI
    loginUserValidator, // ! Validator
    loginHandler // ? Handler
)

export default authRouter
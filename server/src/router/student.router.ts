import { Router } from "express"
import { createHandler, getByIdHandler, getListHandler } from "../controllers/student.controller"
import { authGuard } from "../utils/middlewares/auth.middleware"
import { createStudentValidator } from "../validators/students.validator"

const studentRouter: Router = Router()

studentRouter.get(
    "/", // * URI
    // authGuard, // ! Middleware
    getListHandler // ? Handler
)

studentRouter.get(
    "/:id", // * URI
    authGuard, // ! Middleware
    getByIdHandler // ? Handler
)

studentRouter.post(
    "/", // * URI
    authGuard, // ! Middleware
    createStudentValidator, // ! Validator
    createHandler // ? Handler
)



export default studentRouter
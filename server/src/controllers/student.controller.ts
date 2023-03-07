import { Request, Response } from "express"
import AuthService from "../services/auth.service"
import StudentService from "../services/student.service"
import { User } from "../entities/users.entity"
import { Student } from "../entities/students.entity"
import { PaginatedQuery } from "../utils/data/query.data"
import { sendMail } from "../services/mail.service"

const _authService = new AuthService()
const _studentService = new StudentService()

const getListHandler = async (req: Request, res: Response) => {
    const options = req.query as unknown as PaginatedQuery
    const students = await _studentService.getList(options)
    res.json(students)
    return
}

const createHandler = async (req: Request, res: Response) => {
    try {
        // get user and student from request body
        const { user, student } = req.body as { user: User, student: Student }
        // use user service to create user
        const createdUser = await _authService.register(user)
        student.user_id = createdUser.id as number
        // use student service to create student
        const createdStudent = await _studentService.create(student)
        createdStudent.user = createdUser
        // send email to user
        sendMail({
            to: `${createdUser.name} <${createdUser.username}>`,
            subject: "Welcome to Student Management System",
            text: `Hi ${createdUser.name}, welcome to Student Management System.`
        });
        // return user
        res.status(201).send(createdStudent)
    } catch (error: any) {
        res.status(500).send(error.message ?? "Internal server error")
    }
    return
}

const getByIdHandler = async (req: Request, res: Response) => {
    try {
        // get id from request params
        const { id } = req.params as { id: string }
        // use student service to get student by id
        const student = await _studentService.getByIdWithUser(parseInt(id))
        // return student
        res.status(200).send(student)
    } catch (error) {
        res.status(500).send("Internal server error")
    }
    return
}

export { createHandler, getByIdHandler, getListHandler }
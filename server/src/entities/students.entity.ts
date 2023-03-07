import db from "../providers/database.provider"
import { PaginatedQuery } from "../utils/data/query.data"
import { User } from "./users.entity"

export interface Student {
    id?: number
    user_id: number
    grade: string
    classroom: string
    user?: User
    created_at?: Date
}

class StudentsEntity {
    async getById(id: number): Promise<Student> {
        const { rows } = await db.query(
            "SELECT * FROM students WHERE id = $1",
            [id]
        )
        return rows[0]
    }

    async getList(options: PaginatedQuery): Promise<Student[]> {
        const offset = (options.page - 1) * options.perPage
        const { rows } = await db.query(`SELECT * FROM students LIMIT ${options.perPage} OFFSET ${offset}`)
        return rows
    }

    async getByIdWithUser(id: number): Promise<Student> {
        const { rows } = await db.query(
            "SELECT s.*, u.name as name, u.username as username FROM students AS s INNER JOIN users as u ON s.user_id = u.id WHERE s.id = $1",
            [id]
        )
        return rows[0]

    }

    async create(student: Student): Promise<Student> {
        const { rows } = await db.query(
            "INSERT INTO students (user_id, grade, classroom) VALUES ($1, $2, $3) RETURNING *",
            [student.user_id, student.grade, student.classroom]
        )
        return rows[0]
    }
}

export default StudentsEntity
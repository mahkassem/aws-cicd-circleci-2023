import StudentsEntity, { Student } from "../entities/students.entity"
import { PaginatedQuery } from "../utils/data/query.data"

class StudentService {
    async create(student: Student): Promise<Student> {
        const _studentsEntity = new StudentsEntity()
        const createdStudent = await _studentsEntity.create(student)
        return createdStudent
    }

    async getList(options: PaginatedQuery): Promise<Student[]> {
        const _studentsEntity = new StudentsEntity()
        const students = await _studentsEntity.getList(options)
        return students
    }

    async getById(id: number): Promise<Student> {
        const _studentsEntity = new StudentsEntity()
        const student = await _studentsEntity.getById(id)
        return student
    }

    async getByIdWithUser(id: number): Promise<Student> {
        const _studentsEntity = new StudentsEntity()
        const student = await _studentsEntity.getByIdWithUser(id)
        return student
    }
}

export default StudentService
import StudentManager, { Student } from "./student-manager.module"
const studentData: Student = {
    name: "Ahmed Mohammed",
    age: 20,
    hobbies: [
        { name: "Football", description: "Play football" },
    ]
}

let student: StudentManager

describe("Student Manager Class", () => {
    beforeAll(() => {
        student = new StudentManager(studentData)
    })

    it("1. Should set & get student name", () => {
        student.setName("Ahmed Mohammed Mahmoud")
        expect(student.getName()).toBe("Ahmed Mohammed Mahmoud")
    })

    it("2. Should set & get student age", () => {
        student.setAge(21)
        expect(student.getAge()).toBe(21)
    })
})
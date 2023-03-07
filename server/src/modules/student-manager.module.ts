interface Student {
    name: string;
    age: number;
    hobbies: Hobby[]
}

interface Hobby {
    name: string, description: string
}

interface IStudentManager {
    getName(): string;
    getAge(): number;
    getHobbies(): Hobby[];
    setName(name: string): void;
    setAge(age: number): void;
    setHobbies(hobbies: Hobby[]): void;
    addHooby(hobby: Hobby): void;
}

class StudentManager implements IStudentManager {
    private student: Student;

    constructor(student: Student) {
        this.student = student;
    }

    // getters
    getName(): string {
        return this.student.name;
    }

    getAge(): number {
        return this.student.age;
    }

    getHobbies(): Hobby[] {
        return this.student.hobbies;
    }

    // setters
    setName(name: string): void {
        this.student.name = name;
    }

    setAge(age: number): void {
        this.student.age = age;
    }

    setHobbies(hobbies: Hobby[]): void {
        this.student.hobbies = hobbies;
    }

    addHooby(hobby: Hobby): void {
        this.student.hobbies.push(hobby);
    }
}

export { Student, Hobby, IStudentManager };
export default StudentManager;
import { NextFunction, Request, Response } from "express";
import { Student } from "../entities/students.entity";
import UsersEntity, { User } from "../entities/users.entity";

const _usersEntity = new UsersEntity();

const createStudentValidator = async (req: Request, res: Response, next: NextFunction) => {
    const { user, student } = req.body as { user: User, student: Student };

    // create error bag
    const errors = [];

    // check if name is empty
    if (!user.name) {
        errors.push({ "name": "name is required" });
    }

    // check if studentname is empty
    if (!user.username) {
        errors.push({ "username": "username is required" });
    } else {
        // check if studentname is already taken
        const student = await _usersEntity.getByUsername(user.username);
        if (student) {
            errors.push({ "username": "username is already taken" });
        }
    }

    // check if password is empty
    if (!user.password) {
        errors.push({ "password": "password is required" });
    }

    // check if grade is empty
    if (!student.grade) {
        errors.push({ "grade": "grade is required" });
    }

    // check if classroom is empty
    if (!student.classroom) {
        errors.push({ "classroom": "classroom is required" });
    }

    // if there are errors, return them
    if (errors.length > 0) {
        return res.status(400).send(errors);
    }

    // if there are no errors, call next middleware
    next();
}

export { createStudentValidator };
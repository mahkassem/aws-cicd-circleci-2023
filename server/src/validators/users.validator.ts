import { NextFunction, Request, Response } from "express";
import UsersEntity from "../entities/users.entity";

const _usersEntity = new UsersEntity();

const createUserValidator = async (req: Request, res: Response, next: NextFunction) => {
    const { name, username, password } = req.body;

    // create error bag
    const errors = [];

    // check if name is empty
    if (!name) {
        errors.push({ "name": "name is required" });
    }

    // check if username is empty
    if (!username) {
        errors.push({ "username": "username is required" });
    } else {
        // check if username is already taken
        const user = await _usersEntity.getByUsername(username);
        if (user) {
            errors.push({ "username": "username is already taken" });
        }
    }

    // check if password is empty
    if (!password) {
        errors.push({ "password": "password is required" });
    }

    // if there are errors, return them
    if (errors.length > 0) {
        return res.status(400).send(errors);
    }

    // if there are no errors, call next middleware
    next();
}

const loginUserValidator = async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;

    // create error bag
    const errors = [];

    // check if username is empty
    if (!username) {
        errors.push({ "username": "username is required" });
    }

    // check if password is empty
    if (!password) {
        errors.push({ "password": "password is required" });
    }

    // if there are errors, return them
    if (errors.length > 0) {
        return res.status(400).send(errors);
    }
    // if there are no errors, call next middleware

    next();
}

export { createUserValidator, loginUserValidator };
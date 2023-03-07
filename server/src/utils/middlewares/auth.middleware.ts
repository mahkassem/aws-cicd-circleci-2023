import UsersEntity from "../../entities/users.entity";
import env from "../../utils/helpers/env.helper";
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

const _usersEntity = new UsersEntity();

const authGuard = (req: Request, res: Response, next: NextFunction) => {

    try {
        // get authorization header
        const { authorization } = req.headers;
        // check if token is present
        if (!authorization) throw new Error("No token provided.");
        // check if token is valid
        const token = authorization.split(" ")[1];
        if (!token) throw new Error("Invalid token header.");

        // verify token
        const tokenUser = jwt.verify(token, env("JWT_SECRET"));

        if (!tokenUser) throw new Error("Invalid token.");

        // get user from database
        const user = _usersEntity.getByUsername(tokenUser.sub as string);

        // check if user exists
        if (!user) throw new Error("User does not exist.");

        // attach user to request
        res.locals.user = user;

        // call next middleware
        next();
    } catch (error: any) {
        return res.status(401).json({ message: error?.message });
    }

}

export { authGuard };
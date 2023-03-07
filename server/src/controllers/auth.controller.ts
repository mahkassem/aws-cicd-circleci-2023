import { Request, Response } from "express"
import AuthService from "../services/auth.service"

const _authService = new AuthService()

const registerHandler = async (req: Request, res: Response) => {
    try {
        // get user from request body
        const user = req.body
        // use user service to create user
        const createdUser = await _authService.register(user)
        // return user
        res.status(201).send(createdUser)
    } catch (error) {
        res.status(500).send("Internal server error")
    }
}

const loginHandler = async (req: Request, res: Response) => {
    try {
        // get user from request body
        const user = req.body
        // use user service to authenticate user
        const authenticatedUser = await _authService.login(user)
        // return user
        res.status(200).send(authenticatedUser)
    } catch (error) {
        res.status(500).send("Internal server error")
    }
}

export { registerHandler, loginHandler }
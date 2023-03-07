import { Request, Response, Router } from "express"

const userRouter: Router = Router()

userRouter.get("/:id", (req: Request, res: Response) => {
    res.send(`Your user id is: ${req.params.id}`)
})

export default userRouter
import { Request, Response, NextFunction } from "express"
import fs from "fs"
import path from "path"

const validateGetFileByName = (req: Request, res: Response, next: NextFunction) => {
    const fileName = req.params.file_name
    const basePath = path.join(__dirname, "..", "..", "storage")

    try {
        fs.readFileSync(`${basePath}/${fileName}`, "utf-8")
    } catch (error: unknown) {
        // make sure error is file not found
        const errorCode = (error as NodeJS.ErrnoException).code
        if (errorCode === "ENOENT") {
            return res.status(404).send("File not found")
        }
    }

    next()
}

export { validateGetFileByName }
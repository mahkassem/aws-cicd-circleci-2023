import { Request, Response } from "express"
import path from "path"
import fs from "fs"
import { UploadedFile } from "express-fileupload"
import { join } from "path"

const getFileByName = async (req: Request, res: Response) => {
    const fileName = req.params.file_name
    const basePath = path.join(__dirname, "..", "..", "storage")

    try {
        const file = fs.readFileSync(`${basePath}/${fileName}`, "utf-8")
        res.send(file)
    } catch (error) {
        res.status(500).send("Internal server error")
        // log error for dev use
    }

    return
}

const uploadFile = async (req: Request, res: Response) => {
    try {
        const { file } = req.files as { file: UploadedFile }
        if(file.size > 1 * 1024 * 1024)  throw new Error("File size is too large")
        const path = join(__dirname, "..", "..", "storage", file.name)
        await file.mv(path);
        res.send("File uploaded successfully")
    } catch (error: any) {
        res.status(500).send(error.message)
        // log error for dev use
    }
}

export { getFileByName, uploadFile }
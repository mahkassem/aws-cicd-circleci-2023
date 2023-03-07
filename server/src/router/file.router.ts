import { Router } from "express"
import { getFileByName, uploadFile } from "../controllers/file.controller"
import { authGuard } from "../utils/middlewares/auth.middleware"
import { validateGetFileByName } from "../validators/file.validator"

const fileRouter: Router = Router()

/**
 * @description Get file by name
 * @route GET /file/:file_name
 * @access Public
 */
fileRouter.get(
    "/:file_name",              // ? uri
    authGuard,                  // ! middleware
    validateGetFileByName,      // ! middleware
    getFileByName               // * controller
)

fileRouter.post(
    "/upload",                  // ? uri
    authGuard,                  // ! middleware
    uploadFile                  // * controller
)

export default fileRouter
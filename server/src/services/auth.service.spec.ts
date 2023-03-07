import UsersEntity, { User } from "../entities/users.entity";
import AuthService from "./auth.service";
import bcrypt from "bcrypt";
import env from "../utils/helpers/env.helper";

const _usersEntity = new UsersEntity();
const _authService = new AuthService();
let user: User

describe("UsersService testing", () => {
    beforeAll(async () => {
        user = {
            name: "John Doe",
            username: "johndoe",
            password: "123456"
        }
    })

    it("should register a new user", async () => {
        const createdUser = await _authService.register(user, true)

        expect(createdUser.name).toEqual(user.name)
        expect(createdUser.username).toEqual(user.username)
        expect(
            // compare passwords
            bcrypt.compareSync(
                user.password + env("BCRYPT_SECRET"),
                createdUser.password as string
            )
        ).toBeTruthy()

        user.id = createdUser.id
    })

    afterAll(async () => {
        await _usersEntity.delete(user.id as number)
    })
})
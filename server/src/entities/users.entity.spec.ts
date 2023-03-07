import UsersEntity, { User } from "./users.entity";

const _userEntity = new UsersEntity()
let user: User

describe("UsersEntity testing", () => {
    beforeAll(async () => {
        user = {
            name: "John Doe",
            username: "johndoe",
            password: "123456"
        }
    })

    it("should create a new user", async () => {
        const createdUser = await _userEntity.create(user)

        expect(createdUser.name).toEqual(user.name)
        expect(createdUser.username).toEqual(user.username)
        expect(createdUser.password?.trim()).toEqual(user.password) // password trimmed because of the hash being unused

        user.id = createdUser.id
    })

    it("should get a user by id", async () => {
        const userRecord = await _userEntity.getById(user.id as number)

        expect(userRecord.id).toEqual(user.id)
    })

    afterAll(async () => {
        await _userEntity.delete(user.id as number)
    })
})
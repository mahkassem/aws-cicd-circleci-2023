import UsersEntity, { User } from "../../entities/users.entity";
import request from "supertest";
import app from "../../app";

const _usersEntity = new UsersEntity();
let user: User

describe("Users API testing", () => {
    beforeAll(async () => {
        user = {
            name: "John Doe",
            username: "johndoe",
            password: "123456"
        }
    })

    it("should return user and status 201", async () => {
        const registerReq =
            await request(app)
                .post("/api/auth/register")
                .send(user);

        const createdUser = registerReq.body;

        expect(createdUser.name).toEqual(user.name);
        expect(createdUser.username).toEqual(user.username)
        expect(registerReq.status).toEqual(201);

        user.id = createdUser.id
    })

    it("should faild and resturn status 400", async () => {
        const registerReq =
            await request(app)
                .post("/api/auth/register")
                .send({ user });
                
        expect(registerReq.status).toEqual(400);
    })

    afterAll(async () => {
        await _usersEntity.delete(user.id as number)
    })
})
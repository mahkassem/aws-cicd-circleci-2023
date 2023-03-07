import UsersEntity, { User } from "../entities/users.entity";
import env from "../utils/helpers/env.helper";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const _usersEntity = new UsersEntity();

class AuthService {
    async getById(id: number): Promise<User> {
        const user = await _usersEntity.getById(id);
        // delete password from response
        delete user.password;
        return user;
    }

    async register(user: User, isTest = false): Promise<User> {
        const hashedPassword = bcrypt.hashSync(
            user.password + env("BCRYPT_SECRET"),
            parseInt(env("BCRYPT_SALT"))
        );

        const createdUser = await _usersEntity.create({ ...user, password: hashedPassword });
        // delete password from response
        if (!isTest) delete createdUser.password;

        return createdUser;
    }

    async login(user: User): Promise<User> {
        const { username, password } = user;

        // check if user exists
        const userExists = await _usersEntity.getByUsername(username);
        if (!userExists)
            throw new Error("User does not exist. Please register first.");

        // compare passwords
        const passwordIsValid = bcrypt.compareSync(
            password + env("BCRYPT_SECRET"),
            userExists.password as string
        )
        if (!passwordIsValid)
            throw new Error("Invalid password. Please try again.");

        // generate token
        const token = this.generateToken(userExists);

        // remove password from response
        delete userExists.password;

        return { ...userExists, token };
    }

    generateToken(user: User): string {
        return jwt.sign({ sub: user.username }, env("JWT_SECRET"), {
            expiresIn: "1d",
        });
    }

}

export default AuthService;
import db from "../providers/database.provider"

export interface User {
    id?: number
    name: string
    username: string
    password?: string
    token?: string
}

class UsersEntity {
    async getById(id: number): Promise<User> {
        const { rows } = await db.query(
            "SELECT * FROM users WHERE id = $1",
            [id]
        )
        return rows[0]
    }

    async getByUsername(username: string): Promise<User> {
        const { rows } = await db.query(
            "SELECT * FROM users WHERE username = $1",
            [username]
        )
        return rows[0]
    }

    async create(user: User): Promise<User> {
        const { rows } = await db.query(
            "INSERT INTO users (name, username, password) VALUES ($1, $2, $3) RETURNING *",
            [user.name, user.username, user.password]
        )
        return rows[0]
    }

    async delete(id: number): Promise<void> {
        await db.query("DELETE FROM users WHERE id = $1", [id])
    }
}

export default UsersEntity
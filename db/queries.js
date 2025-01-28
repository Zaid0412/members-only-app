const pool = require('./pool')

const queries = {
    // Posts Queries
    getMaxPostId: async () => {
        const { rows } = await pool.query(`SELECT MAX(id) FROM posts`)
        return rows[0]
    },

    getAllPosts: async () => {
        const { rows } = await pool.query('SELECT * FROM posts g JOIN users c ON g.user_id = c.id;');
        return rows
    },

    createPost: async (title, content, user_id) => {
        queries.getMaxPostId().then(async maxId => {
            await pool.query(`INSERT INTO posts (id, title, content, user_id) VALUES ($1, $2, $3, $4)`, [maxId.max + 1, title, content, user_id])
        })
    },

    // Users Queries
    getMaxUserId: async () => {
        const { rows } = await pool.query('SELECT MAX(id) FROM users')
        return rows[0]
    },

    getAllUsers: async () => {
        const { rows } = await pool.query('SELECT * FROM users')
        return rows
    },

    getUserFromUname: async (username) => {
        const { rows } = await pool.query(`SELECT * FROM users WHERE username = $1`, [username])
        return rows[0]
    },

    getUserFromId: async (id) => {
        const { rows } = await pool.query(`SELECT * FROM users WHERE id = $1`, [id])
        return rows[0]
    },

    createUser: async (fullname, username, password, member, admin) => {
        queries.getMaxUserId().then(async maxId => {
            await pool.query('INSERT INTO users (id, fullname, username, password, member, admin) VALUES ($1, $2, $3, $4, $5, $6)', [maxId.max + 1, fullname, username, password, member, admin])
        })
    },

    giveUserMembership: async (id) => {
        await pool.query(`UPDATE users SET member = '1' WHERE id = $1`, [id])
    }
}


module.exports = queries;
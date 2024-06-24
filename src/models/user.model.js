import db from '../config/db.config.js'

const User = {
  create: async ({ username, password, role_id, status }) => {
    try {
      const [result] = await db.query(
        'INSERT INTO users (username, password, role_id, status) VALUES (?, ?, ?, ?)',
        [username, password, role_id, status || 1]
      )

      const [createdUser] = await db.query('SELECT * FROM users WHERE id = ?', [
        result.insertId
      ])
      return createdUser[0]
    } catch (error) {
      throw new Error(`Failed to create user: ${error.message}`)
    }
  },
  findById: async userId => {
    try {
      const [user] = await db.query(`SELECT * FROM users WHERE id = ?`, userId)
      console.log('User', user)
      return user[0]
    } catch (error) {
      throw new Error(`Failed to find user by email: ${error.message}`)
    }
  },
  findByUsername: async username => {
    try {
      const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [
        username
      ])
      console.log('user rows find by username', rows)
      return rows[0]
    } catch (error) {
      throw new Error(`Failed to find user by username: ${error.message}`)
    }
  }
}

export default User

import db from '../config/db.config.js'
import {
  deleteById,
  findAll,
  findByField,
  findById
} from '../utils/db.utils.js'

const Category = {
  create: async ({ category, status = 1 }) => {
    try {
      const [result] = await db.query(
        `
            INSERT INTO categories (category, status) VALUES (?, ?)
            `,
        [category, status || 1]
      )
      const [createdCategory] = await db.query(
        `SELECT * FROM categories WHERE id = ?`,
        [result.insertId]
      )
      return createdCategory[0]
    } catch (error) {
      throw new Error(`Failed to create category: ${error.message}`)
    }
  },
  update: async (id, { category, status = 1 }) => {
    try {
      const [existingCategory] = await db.query(
        `SELECT * FROM categories WHERE id = ?`,
        [id]
      )
      if (existingCategory.length === 0) {
        return { message: `Category with ID ${id} not found` }
      }

      const [result] = await db.query(
        `
        UPDATE categories SET category = ?, status = ? WHERE id = ?
        `,
        [category, status || 1, id]
      )

      const [updatedCategory] = await db.query(
        `SELECT * FROM categories WHERE id = ?`,
        [id]
      )

      return updatedCategory[0]
    } catch (error) {
      throw new Error(`Failed to update category: ${error.message}`)
    }
  },
  findById: async id => {
    return findById('categories', id)
  },
  findByName: async name => {
    return findByField('categories', 'category', name)
  },
  findAll: async () => {
    return findAll('categories')
  },
  deleteById: async id => {
    return deleteById('categories', id)
  }
}

export default Category

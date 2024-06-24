import db from '../config/db.config.js'
import { findAll, findByField, findById } from '../utils/db.utils.js'

const tableName = 'Products'

const Product = {
  create: async ({ name, category_id, description, image, status = 1 }) => {
    try {
      const [createProduct] = await db.query(
        `INSERT INTO ${tableName} (name, category_id, description, image, status) VALUES (?, ?, ?, ?, ?)`,
        [name, category_id, description, image, status || 1]
      )
      const [createdProduct] = await db.query(
        `SELECT * FROM ${tableName} WHERE id = ?`,
        [createProduct.insertId]
      )
      return createdProduct[0]
    } catch (error) {
      throw new Error(`Error creating Product: ${error.message}`)
    }
  },
  update: async (id, { name, category_id, description, image, status = 1 }) => {
    try {
      const [existingProduct] = await db.query(
        `SELECT * FROM ${tableName} WHERE id = ?`,
        [id]
      )
      if (existingProduct.length === 0) {
        return { message: `Product with ID ${id} not found` }
      }

      const [result] = await db.query(
        `
        UPDATE ${tableName} SET name = ?, category_id = ?, description = ?, image = ?, status = ? WHERE id = ?
        `,
        [name, category_id, description, image, status || 1, id]
      )

      const [updatedProduct] = await db.query(
        `SELECT * FROM ${tableName} WHERE id = ?`,
        [id]
      )

      return updatedProduct[0]
    } catch (error) {
      throw new Error(`Failed to update product: ${error.message}`)
    }
  },
  findAll: async () => {
    const query = `
    SELECT p.id, p.name, p.category_id, c.category AS category_name, p.description, p.image, p.status
    FROM products p
    JOIN categories c ON p.category_id = c.id
  `
    return findAll(tableName, query)
  },
  findById: async id => {
    return findById(tableName, id)
  },
  findByName: async name => {
    return findByField(tableName, 'name', name)
  }
}

export default Product

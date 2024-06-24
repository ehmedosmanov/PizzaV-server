import db from '../config/db.config.js'

export const findAll = async (
  tableName,
  query = `SELECT * FROM ${tableName}`
) => {
  try {
    const [results] = await db.query(query)

    if (results.length === 0) {
      return { message: 'No results found' }
    }
    console.log('Result', results)
    return results
  } catch (error) {
    throw new Error(
      `Failed to retrieve data from ${tableName}: ${error.message}`
    )
  }
}

export const findById = async (tableName, id) => {
  try {
    const [findByIdMethod] = await db.query(
      `SELECT * FROM ${tableName} WHERE id = ?`,
      [id]
    )
    if (findByIdMethod.length === 0) {
      return { message: `Data with ID ${id} not found in ${tableName}` }
    }
    return findByIdMethod[0]
  } catch (error) {
    throw new Error(`Failed to find ${tableName} by : ${error.message}`)
  }
}

export const findByField = async (tableName, field, value) => {
  try {
    const [findByFieldMethod] = await db.query(
      `SELECT * FROM ${tableName} WHERE ${field} = ?`,
      [value]
    )
    return findByFieldMethod[0]
  } catch (error) {
    throw new Error(`Failed to find category by name: ${error.message}`)
  }
}

export const deleteById = async (tableName, id) => {
  try {
    const [findDeletigData] = await db.query(
      `SELECT * FROM ${tableName} WHERE id = ?`,
      [id]
    )

    if (findDeletigData.length === 0) {
      return { message: `Data with ID ${id} not found in ${tableName}` }
    }

    const [resultDeleteMethod] = await db.query(
      `
      DELETE FROM ${tableName} WHERE id = ?`,
      [id]
    )

    if (resultDeleteMethod.affectedRows === 0) {
      return { message: `Not Found with ID ${id} not found in ${tableName}` }
    }

    return findDeletigData[0]
  } catch (error) {
    throw new Error(`Failed to delete category by id: ${error.message}`)
  }
}

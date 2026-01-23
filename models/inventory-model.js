const path = require("path")

const pool = require(
  path.join(process.cwd(), "database")
)

async function getInventoryById(inv_id) {
  try {
    const sql = `
      SELECT *
      FROM inventory
      WHERE inv_id = $1
    `
    const data = await pool.query(sql, [inv_id])
    return data.rows[0]
  } catch (error) {
    throw error
  }
}

module.exports = {
  getInventoryById,
}

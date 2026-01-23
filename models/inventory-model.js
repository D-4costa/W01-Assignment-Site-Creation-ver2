const pool = require("../database")

/* ***************************
 * Get inventory by classification ID
 * ************************** */
async function getInventoryByClassificationId(classification_id) {
  try {
    const sql = `
      SELECT * FROM public.inventory AS i
      JOIN public.classification AS c
      ON i.classification_id = c.classification_id
      WHERE i.classification_id = $1
    `
    const data = await pool.query(sql, [classification_id])
    return data.rows
  } catch (error) {
    console.error("getInventoryByClassificationId error:", error)
    throw error
  }
}

/* ***************************
 * Get inventory item by inventory ID
 * ************************** */
async function getInventoryById(inv_id) {
  try {
    const sql = "SELECT * FROM public.inventory WHERE inv_id = $1"
    const data = await pool.query(sql, [inv_id])
    return data.rows
  } catch (error) {
    console.error("getInventoryById error:", error)
    throw error
  }
}

module.exports = {
  getInventoryByClassificationId,
  getInventoryById,
}

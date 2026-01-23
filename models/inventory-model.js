const pool = require("../database")

/* ***************************
 * Get inventory by classification
 * ************************** */
async function getInventoryByClassificationId(classification_id) {
  const data = await pool.query(
    `SELECT * FROM public.inventory AS i
     JOIN public.classification AS c
     ON i.classification_id = c.classification_id
     WHERE i.classification_id = $1`,
    [classification_id]
  )
  return data.rows
}

/* ***************************
 * Get inventory item by ID
 * ************************** */
async function getInventoryById(inv_id) {
  const data = await pool.query(
    "SELECT * FROM public.inventory WHERE inv_id = $1",
    [inv_id]
  )
  return data.rows
}

module.exports = {
  getInventoryByClassificationId,
  getInventoryById,
}

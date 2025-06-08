const pool = require("../database/")

/* ***************************
 *  Get all classification data
 * ************************** */
async function getClassifications(){
  return await pool.query("SELECT * FROM public.classification ORDER BY classification_name")
}



/* ***************************
 *  Get all inventory items and classification_name by classification_id
 * ************************** */
async function getInventoryByClassificationId(classification_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory AS i 
      JOIN public.classification AS c 
      ON i.classification_id = c.classification_id 
      WHERE i.classification_id = $1`,
      [classification_id]
    )
    if (data.rows.length === 0) {
      throw new Error("No inventory item found with the given ID")
    }
    return data.rows
  } catch (error) {
    console.error("getclassificationsbyid error " + error)
  }
}


/// ***************************
// //  *  function to get inventory item by inventory_id
async function getInventoryById(inventory_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory AS i
      JOIN public.classification AS c
      ON i.classification_id = c.classification_id
      WHERE i.inv_id = $1`,
      [inventory_id]
    )
    return data.rows
  } catch (error) {
    console.error(`getInventoryById error for inventory_id ${inventory_id}: ${error}`)
  }}


/* ***************************
 *  Insert a new classification name into the database
 * ************************** */
// async function insertClassification(name) {
//   try {
//     const sql = "INSERT INTO public.classification (classification_name) VALUES ($1) RETURNING *";
//     const result = await pool.query(sql, [name]);
//     return result.rows[0];
//   } catch (error) {
//     console.error("insertClassification error: " + error);
//     throw error;
//   }
// }

module.exports = {
  getClassifications,
  getInventoryByClassificationId,
  getInventoryById,
};


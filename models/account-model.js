/**********
 * Account Model
 * Handles user account related database operations
 *************/
const pool = require("../database/");


/* ***************************
 *  Register a new user
 * ************************** */
async function registerAccount(account_firstname, account_lastname, account_email, account_password){
  try {
    const sql = "INSERT INTO account (account_firstname, account_lastname, account_email, account_password, account_type) VALUES ($1, $2, $3, $4, 'client') RETURNING *"
    return await pool.query(sql, [account_firstname, account_lastname, account_email, account_password])
  } catch (error) {
    return error.message
  }
}

// **************************
// * check if email already exists
// **************************
async function checkExistingEmail(account_email) {
  try {
    const sql = "SELECT * FROM account WHERE account_email = $1"
    const result = await pool.query(sql, [account_email])
    return result.rows.length > 0
  } catch (error) {
    return error.message
  }
}

// **************************
// * check if password already exists
// ************************** 
async function checkExistingPassword(account_password) {
  try {
    const sql = "SELECT * FROM account WHERE account_password = $1"
    const result = await pool.query(sql, [account_password])
    return result.rows.length > 0
  } catch (error) {
    return error.message
  }
}

//export function
module.exports = {
  registerAccount,
  checkExistingEmail,
  checkExistingPassword}
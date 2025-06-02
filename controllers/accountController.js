/*******************
 * Account Controller
 * 
 *******************/
const utilities = require("../utilities/");
// const accountModel = require("../models/account-model");


/* ***************************
 * Build login view
 * ************************** */
async function buildLogin(req, res, next) {
  let nav = await utilities.getNav()
res.render("account/login", {
    title: "Login",
    message: req.flash("notice"),
    nav,
})
}

/********  
 * Build register view
 * ************************** */
async function buildRegister(req, res, next) {
  let nav = await utilities.getNav()
  res.render("account/register", {
    title: "Register",
    message: req.flash("notice"),
    nav,
  })}

// Export the accountController's function
module.exports = { buildLogin, buildRegister };



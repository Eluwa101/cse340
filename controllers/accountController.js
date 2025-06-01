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

// Export the accountController's function
module.exports = { buildLogin }



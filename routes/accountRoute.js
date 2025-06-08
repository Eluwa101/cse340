/****
 * Account Route
 * Handles user account related routes
 */
const express = require("express");
const router = express.Router();
const accountController = require("../controllers/accountController");
const utilities = require("../utilities/");
const regValidate = require("../utilities/account-validation");

/*deliver login view*/
router.get("/login", utilities.handleErrors(accountController.buildLogin));

/*deliver register view*/
router.get("/register", utilities.handleErrors(accountController.buildRegister));

/*hamdle register form submission*/
router.post(
      "/register",
      regValidate.registrationRules(), //validate registration rules

      regValidate.checkRegData, //check registration data
      utilities.handleErrors(accountController.registerAccount));

/*handle login form submission*/

router.post(
  "/login",
    regValidate.loginRules(), //validate login rules
    regValidate.checkLoginData, //check login data
  (req, res) => {
    res.status(200).send('login process')
  }
)

module.exports = router;

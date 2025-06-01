/****
 * Account Route
 * Handles user account related routes
 */
const express = require("express");
const router = express.Router();
const accountController = require("../controllers/accountController");
const utilities = require("../utilities/");

/*deliver login view*/
router.get("/login", utilities.handleErrors(accountController.buildLogin));

module.exports = router;

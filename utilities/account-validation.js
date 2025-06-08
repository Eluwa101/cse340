const utilities = require(".");
const accountModel = require("../models/account-model");
const { body, validationResult } = require("express-validator");

const validate = {}

// ***************************
// * Validate Registration Rules
// * **************************
validate.registrationRules = () => {
    return [
      //first name is required and must be string
      body("account_firstname")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 1 })
        .withMessage("First name is required"),

      //last name is required and must be string
      body("account_lastname")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 1 })
        .withMessage("Last name is required"),

      //valid email is required and cannot already exist in the database
      body("account_email")
        .trim()
        .escape()
        .notEmpty()
        .isEmail()
        .normalizeEmail()
        .withMessage("Email is required")
        .custom(async (value) => {
          const emailExists = await accountModel.checkExistingEmail(value);
          if (emailExists) {
            throw new Error("Email already exists. Please login or use a different email.");
          }
          return true;
        }),

      //password is required and must be at least 12 characters long
      body("account_password")
        .trim()
        .notEmpty()
        .isStrongPassword({
          minLength: 12,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1,
          returnScore: false,
        })
        .withMessage("Password does not meet requirements"),
    ];
}


/* ******************************
 * Check data and return errors or continue to registration
 * ***************************** */
validate.checkRegData = async (req, res, next) => {
  const { account_firstname, account_lastname, account_email } = req.body
  let errors = []
  errors = validationResult(req)
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    res.render("account/register", {
      errors,
      title: "Registration",
      nav,
      account_firstname,
      account_lastname,
      account_email,
    })
    return
  }
  next()
}

// * ******************************
// * Validate Login Rules
// * *****************************
validate.loginRules = () => {
  return [
    //email is required and must be valid
    body("account_email")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("A valid email is required")
      .normalizeEmail(),

    //password is required and must be at least 12 characters long
    body("account_password")
      .trim()
      .notEmpty()
      .withMessage("Password is required")
      .isStrongPassword({
        minLength: 12,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        returnScore: false,
      })
      .withMessage("Password does not meet requirements"),
  ];
}


// * ******************************
// * Check data and return errors or continue to login 
// * *****************************
validate.checkLoginData = async (req, res, next) => {
  const { account_email } = req.body
  let errors = validationResult(req)
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    res.render("account/login", {
      errors,
      title: "Login",
      nav,
      account_email,
    })
    return
  }
  next()
}


//******************************
// * Validate Class Name
// * **************************
// validate.checkClassName = () => {
//  const checkClassName = [
//   body("classification_name")
//     .trim()
//     .isLength({ min: 1 })
//     .matches(/^[A-Za-z0-9]+$/)
//     .withMessage("Classification name must not contain spaces or special characters."),
//   (req, res, next) => {
//     const errors = validationResult(req);
//     req.validationErrors = errors.isEmpty() ? null : errors.array();
//     next();
//   },
// ]};



module.exports = validate
/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/
/* ***********************
 * Require Statements
 *************************/
const express = require("express")
const expressLayouts = require("express-ejs-layouts")
const env = require("dotenv").config()
const app = express()
exports.app = app
const static = require("./routes/static")
const baseController = require("./controllers/baseController")
const inventoryRoutes = require("./routes/inventoryRoutes")
const utilities = require("./utilities/")
const database = require("./database/")
const errorRoutes = require("./routes/errorRoute")
const session = require("express-session")
const pool = require('./database/')
const bodyParser = require("body-parser")




/* ***********************
 * Session Middleware Function
 *************************/
 app.use(session({
  store: new (require('connect-pg-simple')(session))({
    createTableIfMissing: true,
    pool,
  }),
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  name: 'sessionId',
}))

//body-parser middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))


//exprress messages Middleware
app.use(require('connect-flash')())
app.use(function(req, res, next) {
  res.locals.messages = require('express-messages')(req, res)
  next()
})



/* ***********************
 * View Engine and Templates
 *************************/
app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "./layouts/layout")

/* ***********************
 * Routes
 *************************/
app.use(express.static("public"))


// Index route
app.get("/", utilities.handleErrors(baseController.buildHome))

// Inventory routes
app.use("/inv", utilities.handleErrors( inventoryRoutes))

//Account routes
const accountRoute = require("./routes/accountRoute")
app.use("/account", utilities.handleErrors(accountRoute))

//Management Inventory routes
// app.use("/inv", inventoryRoutes);

// app.use((err, req, res, next) => {
//     utilities.handleErrors(err, req, res, next);
// });


// Generic error handler for internal server errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', {
    title: 'Something went wrong!',
    message: err.message || 'Internal Server Error',
  });
});

// Intentionally trigger a server error for testing
app.use('/', errorRoutes);


// File Not Found Route - must be last route in list
app.use(async (req, res, next) => {
  next({status: 404, message: 'Sorry, we appear to have lost that page.'})
})




/* ***********************
* Express Error Handler
* Place after all other middleware
// *************************/
app.use(async (err, req, res, next) => {
  let nav = await utilities.getNav()
  console.error(`Error at: "${req.originalUrl}": ${err.message}`)
  if(err.status == 404){ message = err.message} else {message = 'Oops! An error seemed to occur. Maybe try a different page?'}
  res.render("errors/error", {
    title: err.status || 'Server Error',
    message,
    nav
  })
})



/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT
const host = process.env.HOST

/* ***********************
 * Log statement to confirm server operation
 *************************/
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`)
})

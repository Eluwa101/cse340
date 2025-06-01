// routes/errorRoutes.js
const express = require("express")
const router = express.Router()
const errorController = require("../controllers/errorController")

router.get("/trigger-error", errorController.triggerServerError)

module.exports = router


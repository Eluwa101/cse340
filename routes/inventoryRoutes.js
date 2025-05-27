const express = require('express')
const router = express.Router()
const invController = require('../controllers/invController')

// Route to build inventory by classification vieww
router.get("/type/:classificationId", invController.buildByClassificationId);

module.exports = router;
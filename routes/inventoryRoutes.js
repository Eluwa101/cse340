const express = require('express')
const router = express.Router()
const invController = require('../controllers/invController')

// Route to build inventory by classification vieww
router.get("/type/:classificationId", invController.buildByClassificationId);

// Route to build inventory detail view
router.get("/detail/:inventoryId", invController.buildDetailView);


module.exports = router;
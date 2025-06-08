const express = require('express')
const router = express.Router()
const invController = require('../controllers/invController')
// import { checkClassName } from "../utilities/classificationValidation.js";

// Route to build inventory by classification vieww
router.get("/type/:classificationId", invController.buildByClassificationId);

// Route to build inventory detail view
router.get("/detail/:inventoryId", invController.buildDetailView);

//Route to Build management view
// router.get("/", invController.buildManagementView);

// // Route to build add classification view
// router.get("/add-classification", invController.buildAddClassificationView);

// router.post(
//   "/add-classification",
//   checkClassName, // server-side validation middleware
//   invController.addClassification
// );

module.exports = router;
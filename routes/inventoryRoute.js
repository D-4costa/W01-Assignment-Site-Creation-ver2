const express = require("express");
const router = express.Router();
const invController = require("../controllers/invController");
const utilities = require("../utilities");
const invValidate = require("../utilities/inventory-validation");

router.get("/", utilities.handleErrors(invController.buildManagementView));

/* ***************************
 * Inventory by classification
 * ************************** */
router.get(
  "/type/:classificationId",
  utilities.handleErrors(invController.buildByClassificationId),
);

/* ***************************
 * Inventory detail
 * ************************** */
router.get(
  "/detail/:inv_id",
  utilities.handleErrors(invController.buildInventoryDetail),
);

router.post("/update/", utilities.handleErrors(invController.updateInventory));

// Classification management routes
router.get(
  "/add-classification",
  utilities.handleErrors(invController.buildAddClassification),
);
router.post(
  "/add-classification",
  invValidate.classificationRules(),
  invValidate.checkClassificationData,
  utilities.handleErrors(invController.addClassification),
);

// Inventory management routes
router.get(
  "/add-inventory",
  utilities.handleErrors(invController.buildAddInventory),
);
router.post(
  "/add-inventory",
  invValidate.inventoryRules(),
  invValidate.checkInventoryData,
  utilities.handleErrors(invController.addInventory),
);

module.exports = router;

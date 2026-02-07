const express = require("express");
const router = express.Router();
const invController = require("../controllers/invController");
const utilities = require("../utilities");
const invValidate = require("../utilities/inventory-validation");

/* ***************************
 * Inventory Management
 * ************************** */
router.get(
  "/",
  utilities.checkAuthorizationManager,
  utilities.handleErrors(invController.buildManagementView),
);

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

router.post(
  "/update/",
  utilities.checkAuthorizationManager,
  utilities.handleErrors(invController.updateInventory),
);

/* ***************************
 * Add Classification
 * ************************** */
router.get(
  "/add-classification",
  utilities.checkAuthorizationManager,
  utilities.handleErrors(invController.buildAddClassification),
);
router.post(
  "/add-classification",
  utilities.checkAuthorizationManager,
  invValidate.classificationRules(),
  invValidate.checkClassificationData,
  utilities.handleErrors(invController.addClassification),
);

/* ***************************
 * Add Inventory
 * ************************** */
router.get(
  "/add-inventory",
  utilities.checkAuthorizationManager,
  utilities.handleErrors(invController.buildAddInventory),
);
router.post(
  "/add-inventory",
  utilities.checkAuthorizationManager,
  invValidate.inventoryRules(),
  invValidate.checkInventoryData,
  utilities.handleErrors(invController.addInventory),
);

module.exports = router;

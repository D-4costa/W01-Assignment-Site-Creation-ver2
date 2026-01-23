const express = require("express")
const router = express.Router()
const invController = require("../controllers/invController")
const utilities = require("../utilities")

/* ***************************
 * Inventory by classification
 * ************************** */
router.get(
  "/type/:classificationId",
  utilities.handleErrors(invController.buildByClassificationId)
)

/* ***************************
 * Inventory detail
 * ************************** */
router.get(
  "/detail/:inv_id",
  utilities.handleErrors(invController.buildInventoryDetail)
)

module.exports = router

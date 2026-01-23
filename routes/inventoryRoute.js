const express = require("express")
const router = express.Router()

const invController = require(
  require("path").join(process.cwd(), "controllers/invController")
)
const utilities = require(
  require("path").join(process.cwd(), "utilities")
)

router.get(
  "/detail/:inv_id",
  utilities.handleErrors(invController.buildInventoryDetail)
)

module.exports = router

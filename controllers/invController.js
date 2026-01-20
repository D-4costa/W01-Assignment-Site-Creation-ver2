const invModel = require("../models/inventory-model")
const utilities = require("../utilities")

const invCont = {}

invCont.buildInventoryDetail = async function (req, res, next) {
  const inv_id = req.params.inv_id
  const vehicle = await invModel.getInventoryById(inv_id)

  if (!vehicle) {
    const error = new Error("Vehicle not found")
    error.status = 404
    throw error
  }

  const vehicleHTML = utilities.buildVehicleDetail(vehicle)
  const nav = await utilities.getNav()

  res.render("inventory/detail", {
    title: `${vehicle.inv_make} ${vehicle.inv_model}`,
    nav,
    vehicleHTML,
  })
}

module.exports = invCont

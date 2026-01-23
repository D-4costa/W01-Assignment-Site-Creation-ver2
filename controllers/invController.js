const invModel = require("../models/inventory-model")
const utilities = require("../utilities")

const invCont = {}

/* ***************************
 * Build inventory by classification
 * ************************** */
invCont.buildByClassificationId = async function (req, res) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)

  if (!data || data.length === 0) {
    throw new Error("No vehicles found for this classification.")
  }

  const grid = await utilities.buildClassificationGrid(data)
  const nav = await utilities.getNav()
  const className = data[0].classification_name

  res.render("./inventory/classification", {
    title: `${className} vehicles`,
    nav,
    grid,
  })
}

/* ***************************
 * Build inventory detail view
 * ************************** */
invCont.buildInventoryDetail = async function (req, res) {
  const inv_id = req.params.inv_id
  const vehicleData = await invModel.getInventoryById(inv_id)

  if (!vehicleData || vehicleData.length === 0) {
    throw new Error("Vehicle not found.")
  }

  const vehicleHTML = await utilities.buildVehicleDetail(vehicleData[0])
  const nav = await utilities.getNav()

  res.render("./inventory/detail", {
    title: `${vehicleData[0].inv_make} ${vehicleData[0].inv_model}`,
    nav,
    vehicleHTML,
  })
}

module.exports = invCont

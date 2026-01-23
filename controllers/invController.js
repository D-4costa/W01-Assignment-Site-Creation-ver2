const invModel = require("../models/inventory-model")
const utilities = require("../utilities")

const invCont = {}

/* ***************************
 * Build inventory by classification
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  try {
    const classification_id = req.params.classificationId
    const data = await invModel.getInventoryByClassificationId(classification_id)

    if (!data || data.length === 0) {
      const error = new Error("No vehicles found for this classification.")
      error.status = 404
      throw error
    }

    const grid = await utilities.buildClassificationGrid(data)
    const nav = await utilities.getNav()
    const className = data[0].classification_name

    res.render("inventory/classification", {
      title: `${className} vehicles`,
      nav,
      grid,
    })
  } catch (error) {
    next(error)
  }
}

/* ***************************
 * Build inventory detail view
 * ************************** */
invCont.buildInventoryDetail = async function (req, res, next) {
  try {
    const inv_id = req.params.inv_id
    const data = await invModel.getInventoryById(inv_id)

    if (!data || data.length === 0) {
      const error = new Error("Vehicle not found.")
      error.status = 404
      throw error
    }

    const vehicleHTML = utilities.buildVehicleDetail(data[0])
    const nav = await utilities.getNav()

    res.render("inventory/detail", {
      title: `${data[0].inv_make} ${data[0].inv_model}`,
      nav,
      content: vehicleHTML,
    })
  } catch (error) {
    next(error)
  }
}

module.exports = invCont

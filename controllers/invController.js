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
    const nav = res.locals.nav
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
    const data = await invModel.getInventoryByInventoryId(inv_id)

    if (!data || data.length === 0) {
      const error = new Error("Vehicle not found.")
      error.status = 404
      throw error
    }

    const vehicleHTML = utilities.buildVehicleDetail(data[0])
    const nav = res.locals.nav

    res.render("inventory/detail", {
      title: `${data[0].inv_make} ${data[0].inv_model}`,
      nav,
      content: vehicleHTML,
    })
  } catch (error) {
    next(error)
  }
}

/**
 * Handle post request to update a vehicle to the inventory along with redirects
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
invCont.updateInventory = async function (req, res, next) {
  const nav = await utilities.getNav();

  const {
    inv_id,
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color,
    classification_id,
  } = req.body;

  const response = await invModel.updateInventory(
    inv_id,
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color,
    classification_id
  );

  if (response) {
 
    res.redirect("/inv/");
  } else {
    const classifications = await utilities.buildClassificationList(
      classification_id
    );
    const itemName = `${inv_make} ${inv_model}`;

    res.status(501).render("inventory/editInventory", {
      title: "Edit " + itemName,
      nav,
      errors: null,
      classifications,
      inv_id,
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_miles,
      inv_color,
      classification_id,
    });
  }
};

module.exports = invCont

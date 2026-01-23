const Util = {}
const invModel = require("../models/inventory-model")

Util.handleErrors = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next)

/* ***************************
 * Build classification grid
 * ************************** */
Util.buildClassificationGrid = async function (data) {
  let grid = '<ul id="inv-display">'

  data.forEach(vehicle => {
    grid += `
      <li>
        <a href="/inv/detail/${vehicle.inv_id}">
          <img src="${vehicle.inv_thumbnail}"
               alt="Image of ${vehicle.inv_make} ${vehicle.inv_model}">
        </a>
        <div class="namePrice">
          <hr>
          <h2>
            <a href="/inv/detail/${vehicle.inv_id}">
              ${vehicle.inv_make} ${vehicle.inv_model}
            </a>
          </h2>
          <span>$${new Intl.NumberFormat("en-US").format(vehicle.inv_price)}</span>
        </div>
      </li>`
  })

  grid += "</ul>"
  return grid
}

/* ***************************
 * Build vehicle detail
 * ************************** */
Util.buildVehicleDetail = async function (vehicle) {
  return `
    <section class="vehicle-detail">
      <img src="${vehicle.inv_image}"
           alt="Image of ${vehicle.inv_make} ${vehicle.inv_model}">
      <div class="vehicle-info">
        <h2>${vehicle.inv_make} ${vehicle.inv_model}</h2>
        <p class="price">
          <strong>Price:</strong>
          $${new Intl.NumberFormat("en-US").format(vehicle.inv_price)}
        </p>
        <p>
          <strong>Mileage:</strong>
          ${new Intl.NumberFormat("en-US").format(vehicle.inv_miles)} miles
        </p>
        <p><strong>Description:</strong> ${vehicle.inv_description}</p>
        <p><strong>Color:</strong> ${vehicle.inv_color}</p>
      </div>
    </section>
  `
}

module.exports = Util



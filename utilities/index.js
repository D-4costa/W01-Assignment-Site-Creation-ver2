const Util = {}
const jwt = require("jsonwebtoken")

Util.handleErrors = (fn) => {
  return function (req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next)
  }
}

Util.buildVehicleDetail = function (vehicle) {
  const price = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(vehicle.inv_price)

  const mileage = new Intl.NumberFormat("en-US").format(vehicle.inv_miles)

  return `
  <section class="vehicle-detail">
    <div class="vehicle-image">
      <img 
        src="${vehicle.inv_image}" 
        alt="Image of ${vehicle.inv_year} ${vehicle.inv_make} ${vehicle.inv_model}"
      >
    </div>

    <div class="vehicle-info">
      <h2>${vehicle.inv_year} ${vehicle.inv_make} ${vehicle.inv_model}</h2>
      <p><strong>Price:</strong> ${price}</p>
      <p><strong>Mileage:</strong> ${mileage} miles</p>
      <p><strong>Description:</strong> ${vehicle.inv_description}</p>
      <p><strong>Color:</strong> ${vehicle.inv_color}</p>
    </div>
  </section>
  `
}

module.exports = Util

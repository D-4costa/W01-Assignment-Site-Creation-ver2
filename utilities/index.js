const Util = {};
const invModel = require("../models/inventory-model");

Util.getNav = async function () {
  try {
    const data = await invModel.getClassifications();
    let list = "<ul>";
    list += '<li><a href="/" title="Home page">Home</a></li>';
    data.rows.forEach((row) => {
      list += "<li>";
      list +=
        '<a href="/inv/type/' +
        row.classification_id +
        '" title="See our inventory of ' +
        row.classification_name +
        ' vehicles">' +
        row.classification_name +
        "</a>";
      list += "</li>";
    });
    list += "</ul>";
    return list;
  } catch (error) {
    // Fallback nav when database is unavailable
    return (
      '<ul>' +
      '<li><a href="/" title="Home page">Home</a></li>' +
      "</ul>"
    );
  }
};

Util.handleErrors = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

/* ***************************
 * Build classification grid
 * ************************** */
Util.buildClassificationGrid = async function (data) {
  let grid = '<ul id="inv-display" aria-label="Inventory results">';

  data.forEach((vehicle) => {
    const price = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(vehicle.inv_price);

    grid += `
      <li class="inv-card">
        <a class="inv-card_link" href="/inv/detail/${vehicle.inv_id}" aria-label="View ${vehicle.inv_make} ${vehicle.inv_model} details">
          <img class="inv-card_img" src="${vehicle.inv_thumbnail}" alt="${vehicle.inv_make} ${vehicle.inv_model}">
          <div class="inv-card_overlay">
            <h3 class="inv-card_title">${vehicle.inv_make} ${vehicle.inv_model}</h3>
            <p class="inv-card_price">${price}</p>
          </div>
        </a>
      </li>`;
  });

  grid += "</ul>";
  return grid;
};

/* ***************************
 * Build vehicle detail
 * ************************** */
Util.buildVehicleDetail = function (vehicle) {
  if (!vehicle) {
    return "<p>Vehicle information not available.</p>";
  }

  const price = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(vehicle.inv_price);

  const miles = new Intl.NumberFormat("en-US").format(vehicle.inv_miles);

  return `
    <section class="vehicle-detail">
      <div class="vehicle-image">
        <img src="${vehicle.inv_image}"
             alt="Image of ${vehicle.inv_make} ${vehicle.inv_model}">
      </div>

      <div class="vehicle-info">
        <h2>${vehicle.inv_year} ${vehicle.inv_make} ${vehicle.inv_model}</h2>
        <p><strong>Price:</strong> ${price}</p>
        <p><strong>Mileage:</strong> ${miles} miles</p>
        <p><strong>Description:</strong> ${vehicle.inv_description}</p>
        <p><strong>Color:</strong> ${vehicle.inv_color}</p>
      </div>
    </section>
  `;
};

/**
 * Build an HTML select element with classification data
 * @param {int} classification_id
 * @returns {string}
 */

Util.buildClassificationList = async function (classification_id = null) {
  let data = await invModel.getClassifications();
  let classificationList =
    '<select name="classification_id" id="classificationList" required>';
  classificationList += "<option value=''>Choose a Classification</option>";
  data.rows.forEach((row) => {
    classificationList += '<option value="' + row.classification_id + '"';
    if (
      classification_id != null &&
      row.classification_id == classification_id
    ) {
      classificationList += " selected ";
    }
    classificationList += ">" + row.classification_name + "</option>";
  });
  classificationList += "</select>";
  return classificationList;
};

Util.handleErrors = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

module.exports = Util;

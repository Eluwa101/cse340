const invModel = require("../models/inventory-model")
const Util = {}

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications()
  let list = "<ul>"
  list += '<li><a href="/" title="Home page">Home</a></li>'
  data.rows.forEach((row) => {
    list += "<li>"
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>"
    list += "</li>"
  })
  list += "</ul>"
  return list
}




/* **************************************
* Build the classification view HTML
* ************************************ */
Util.buildClassificationGrid =  function(data){
  let grid = ''
  if(data.length > 0){
    grid = '<ul id="inv-display">'
     data.forEach(vehicle => { 
      grid += '<li>'
      grid +=  '<a href="../../inv/detail/'+ vehicle.inv_id 
      + '" title="View ' + vehicle.inv_make + ' '+ vehicle.inv_model 
      + 'details"><img src="' + vehicle.inv_thumbnail 
      +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model 
      +' on CSE Motors" /></a>'
      grid += '<div class="namePrice">'
      grid += '<hr />'
      grid += '<h2>'
      grid += '<a href="../../inv/detail/' + vehicle.inv_id +'" title="View ' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
      grid += '</h2>'
      grid += '<span>$' 
      + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
      grid += '</div>'
      grid += '</li>'
    })
    grid += '</ul>'
  } else { 
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  return grid
}


/**
 * Build vehicle detail HTML components
 * Vehicle data
 *  HTML components for detail view
 */
Util.buildVehicleDetailComponents = function (v) {
  if (!v) return { header: '', details: '', cta: '' }

  const nf = n => new Intl.NumberFormat('en-US').format(n)
  const price = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(v.inv_price)

  const fields = [
    { label: 'Make', value: v.inv_make || 'N/A' },
    { label: 'Model', value: v.inv_model || 'N/A' },
    { label: 'Year', value: v.inv_year || 'N/A' },
    { label: 'Price', value: price },
    { label: 'Mileage', value: v.inv_miles ? `${nf(v.inv_miles)} miles` : 'N/A' },
    { label: 'Classification', value: v.classification_name || 'N/A' },
    { label: 'Color', value: v.inv_color || 'N/A' },
  ]

  return {
    header: `
      <nav class="back-link">
        <a href="/inv/type/${v.classification_id}" aria-label="Back to ${v.classification_name} inventory">&larr; Back to ${v.classification_name}</a>
      </nav>
      <header class="vehicle-header">
        <h1>${v.inv_year ? v.inv_year + ' ' : ''}${v.inv_make} ${v.inv_model}</h1>
        <p class="year-price"><span>${price}</span></p>
      </header>
    `,

    details: `
      <section class="vehicle-details-section">
        <div class="vehicle-gallery">
          <img src="${v.inv_image}" alt="Image of ${v.inv_make} ${v.inv_model}" class="main-image" loading="lazy">
          <div class="thumbnail">
            <img src="${v.inv_thumbnail}" alt="Thumbnail of ${v.inv_make} ${v.inv_model}" loading="lazy">
          </div>
        </div>
        <div class="vehicle-specs">
          <h2>Vehicle Details</h2>
          <ul>
            ${fields.map(f => `<li><strong>${f.label}:</strong> ${f.value}</li>`).join('')}
          </ul>
          <h3>Description</h3>
          <p>${v.inv_description || 'No description available.'}</p>
        </div>
      </section>
    `,

    cta: `
      <div class="cta">
        <a href="/contact?vehicle=${encodeURIComponent(v.inv_make + ' ' + v.inv_model)}" class="btn" aria-label="Contact us about ${v.inv_make} ${v.inv_model}">Contact Us About This Vehicle</a>
      </div>
    `
  }
}


module.exports = Util;



/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */



Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)


module.exports = Util

module.exports.buildClassificationGrid = Util.buildClassificationGrid
module.exports.buildVehicleDetailComponents = Util.buildVehicleDetailComponents
module.exports.getNav = Util.getNav
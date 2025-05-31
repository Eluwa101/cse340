const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}


/* ***************************
 *  Build inventory detail view
 * ************************** */
invCont.buildDetailView = async function (req, res, next) {
  try {
    const inventory_id = req.params.inventoryId;
    const data = await invModel.getInventoryById(inventory_id);

    if (!data || data.length === 0) {
      let nav = await utilities.getNav();
      return res.status(404).render('errors/error', {
        title: 'Vehicle Not Found',
        message: 'Sorry, that vehicle was not found.',
        nav,
      });
    }

    const nav = await utilities.getNav();
    const components = utilities.buildVehicleDetailComponents(data[0])

    res.render('inventory/details', {
      title: `${data[0].inv_make} ${data[0].inv_model}`,
      nav,
      inventory: data[0],
      components,
    });
  } catch (error) {
    next(error);
  }
};

  

module.exports = invCont
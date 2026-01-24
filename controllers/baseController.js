const baseController = {};

baseController.buildHome = async function (req, res) {
  res.render("index", { title: "Home", nav: res.locals.nav });
};

module.exports = baseController;

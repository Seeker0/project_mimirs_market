let router = require("express").Router();
let models = require("./../models");
const { Product, Category, sequelize } = models.sequelize;
const { Op } = sequelize;
const optionsBuilder = require("./../helpers/sortParams");
const { cleaner } = require("./../js");

router.get("/", (req, res) => {
  let lastSearch = Object.assign({}, req.query);

  cleaner(lastSearch);
  req.session.lastSearch = lastSearch;
  let filterParams = optionsBuilder(lastSearch);

  Product.findAll(filterParams).then(products => {
    res.render("welcome/home", { products });
  });
});

module.exports = router;

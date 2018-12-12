let router = require("express").Router();
let models = require("./../models");
const { Product, Category, sequelize } = models;
const { Op } = sequelize;

router.get("/", (req, res, next) => {
  try {
    res.render("welcome/checkout");
  } catch (e) {
    next(e);
  }
});

module.exports = router;

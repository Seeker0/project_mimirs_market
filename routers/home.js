let router = require("express").Router();
let models = require("./../models");
let { Product, Category, sequelize } = models.sequelize;
const { generalQuery } = require("./../js");

router.get("/:page", async (req, res, next) => {
  let page = Number(req.params.page);
  req.session.page = {
    current: page,
    next: page + 1
  };
  if (req.session.page.current >= 2) {
    req.session.page.prev = req.session.page.current - 1;
  }
  generalQuery(next, req.params.page - 1)
    .then(products => {
      res.render("welcome/home", { products });
    })
    .catch(e => next(e));
});

router.get("/", (req, res, next) => {
  generalQuery(next)
    .then(products => {
      res.render("welcome/home", { products });
    })
    .catch(e => next(e));
});

module.exports = router;

let router = require("express").Router();
let models = require("./../models");
const { Product, Category, sequelize } = models.sequelize;
const { Op } = sequelize;
const { updateCartCount } = require("./../js");

router.get("/:product", (req, res, next) => {
  let productId = Number(req.params.product);
  let focalItem;
  Product.findOne({
    where: { id: productId },
    include: [{ model: Category, attributes: ["name"] }]
  })
    .then(product => {
      focalItem = product;
      Product.findAll({
        where: {
          categoryId: product.categoryId,
          id: { [Op.ne]: productId }
        },
        limit: 10,
        include: [{ model: Category }]
      }).then(relatedProducts => {
        res.render("welcome/showcase", {
          focalItem,
          relatedProducts
        });
      });
    })
    .catch(e => next(e));
});

router.get("/add/:id", (req, res, next) => {
  let products = req.session.products;
  let item = Number(req.params.id);
  if (products[item]) {
    products[item].count++;
    req.session.cart = updateCartCount(req.session.products);
    res.redirect(req.session.backUrl);
  } else {
    console.log("into else");
    Product.findOne({ where: { id: item } })
      .then(product => {
        products[item] = {
          name: product.name,
          count: 1,
          id: item,
          price: product.price
        };
        req.session.cart = updateCartCount(req.session.products);
        res.redirect(req.session.backUrl);
      })
      .catch(e => next(e));
  }
});

module.exports = router;

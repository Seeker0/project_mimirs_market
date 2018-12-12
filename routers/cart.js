let router = require("express").Router();
let models = require("./../models");
const { Product, sequelize } = models.sequelize;
const { Op } = sequelize;
const { updateCartCount } = require("./../js");

router.get("/clear", (req, res, next) => {
  try {
    req.session.cart = null;
    req.session.products = null;
    req.session.total = 0;
    res.redirect("/");
  } catch (e) {
    next(e);
  }
});

router.get("/remove/:id", (req, res, next) => {
  try {
    let product = req.params.id;
    delete req.session.products[product];

    req.session.cart = updateCartCount(req.session.products);
    res.redirect("/cart");
  } catch (e) {
    next(e);
  }
});

router.get("/update/:product", (req, res, next) => {
  try {
    let product = req.params.product,
      quantity = req.query.quantity;

    if (quantity <= 0) {
      delete req.session.products[product];
    } else {
      req.session.products[product].count = Number(quantity);
    }

    req.session.cart = updateCartCount(req.session.products);
    res.redirect("/cart");
  } catch (e) {
    next(e);
  }
});

router.post("/updateAll", (req, res, next) => {
  try {
    req.session.products = JSON.parse(req.body.all);

    Object.keys(req.session.products).forEach(key => {
      if (req.session.products[key].count === 0)
        delete req.session.products[key];
    });

    req.session.cart = updateCartCount(req.session.products);
    res.redirect("/cart");
  } catch (e) {
    next(e);
  }
});

router.get("/", (req, res, next) => {
  let items = Object.keys(req.session.products).map(val => Number(val));
  let total = 0;
  if (items.length) {
    Product.findAll({
      where: {
        id: { [Op.any]: items }
      }
    })
      .then(products => {
        products.forEach(product => {
          product.quantity = req.session.products[product.id].count;
          console.log(product.price, product.quantity);
          total += product.price * product.quantity;
        });
        req.session.total = total;
        res.render("welcome/cart", { products });
      })
      .catch(e => next(e));
  } else {
    req.flash("notify", "Cart is empty");
    res.render("welcome/home");
  }
});

module.exports = router;

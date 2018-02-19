var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let models = require('./../models/sequelize');
let Product = models.Product;
let Category = models.Category;

// Product.find({}).then(product => {
//   console.log(product);
// });
router.get('/login', (req, res) => {
  req.session.user = req.query.user;
  res.redirect('/');
});

router.get('/logout', (req, res) => {
  req.session = null;
  res.redirect('/');
});

router.get('/', async (req, res, next) => {
  if (!req.session.user) {
    res.render('welcome/login');
  } else {
    let prices = [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
    try {
      let categories = await Category.findAll();
      let products = await Product.findAll({
        limit: 20,
        include: [{ model: Category }]
      });
      res.render('welcome/index', {
        products: products,
        prices: prices,
        categories: categories
      });
    } catch (err) {
      next(err);
    }
  }
});

module.exports = router;

var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let models = require('./../models/sequelize');
let Product = models.Product;
let Category = models.Category;

router.get('/', (req, res) => {
  let session = req.session;
  // let products = Product.findAll({
  //   where: {
  //     id: {
  //       [Op.in]: req.session.products
  //     }
  //   }
  // });
  res.render('welcome/cart', { session });
});

module.exports = router;

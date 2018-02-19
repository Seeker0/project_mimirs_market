var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let models = require('./../models/sequelize');
let Product = models.Product;
let Category = models.Category;

router.get('/', (req, res) => {
  req.session.products[req.query.product]
    ? (req.session.products[req.query.product] += 1)
    : (req.session.products[req.query.product] = 1);
  res.redirect('/');
});

module.exports = router;

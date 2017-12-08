var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let models = require('./../models/sequelize');
let Product = models.Product;
const Showcaser = require('./ProductShowcaser.js')


Product.find({}).then(product => {
  console.log(product);
})

router.get('/', (req, res) => {
  Product.findAll({}).then();
  let showcaser = new Showcaser();
})




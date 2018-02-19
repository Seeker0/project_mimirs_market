var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let models = require('./../models/sequelize');
const bodyParser = require('body-parser');
let Product = models.Product;
let Category = models.Category;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.get('/', async (req, res, next) => {
  if (!req.session.user) {
    res.render('welcome/login');
    res.end;
  }
  console.log(req.session);
  let sorts = {
    'name-asc': ['name', 'ASC'],
    'name-desc': ['name', 'DESC'],
    'price-asc': ['price', 'ASC'],
    'price-desc': ['price', 'DESC'],
    newest: ['createdAt', 'ASC'],
    oldest: ['createdAt', 'DESC']
  };
  let searched = req.query.q;
  let filtered = req.query.filter;
  let sorted = sorts[req.query.sort];
  let prices = [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
  req.session.searched = searched;
  req.session.sorted = req.query.sort;
  //set initial search object
  let queryObj = {
    where: {
      name: {
        [Op.iLike]: `%${searched}%`
      }
    },
    limit: 20,
    include: [{ model: Category }],
    order: [sorted]
  };

  //check for category filter
  if (filtered) {
    if (filtered.category) {
      queryObj.where.categoryId = filtered.category;
      req.session.category = filtered.category;
    }

    //check for min/max filters
    if (filtered.min && filtered.max) {
      queryObj.where.price = {
        [Op.between]: [filtered.min, filtered.max]
      };
      req.session.filtered = {
        min: filtered.min,
        max: filtered.max
      };
    } else if (filtered.min) {
      queryObj.where.price = {
        [Op.gte]: filtered.min
      };
      req.session.filtered = {
        min: filtered.min
      };
    } else if (filtered.max) {
      queryObj.where.price = {
        [Op.lte]: filtered.max
      };
      req.session.filtered = {
        max: filtered.max
      };
    }
  }

  try {
    let categories = await Category.findAll();
    let products = await Product.findAll(queryObj);
    console.log(queryObj);
    res.render('welcome/search', {
      products: products,
      prices: prices,
      categories: categories,
      session: req.session
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;

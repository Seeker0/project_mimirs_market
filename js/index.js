let router = require("express").Router();
let models = require("./../models");
const { Product, Category, sequelize } = models.sequelize;
const { Op } = sequelize;

let updateCartCount = obj => {
  return Object.keys(obj).reduce((sum, key) => {
    sum += obj[key].count;
    return sum;
  }, 0);
};

let cleaner = obj => {
  Object.keys(obj).forEach(key => {
    if (obj[key] === Object(obj[key])) cleaner(obj[key]);
    if (!obj[key]) delete obj[key];
    if (!isNaN(Number(obj[key]))) {
      obj[key] = Number(obj[key]);
    }
  });
};

let generalQuery = (next, offset) => {
  try {
    let options = offset
      ? {
          limit: 10,
          offset: 10 * offset,
          include: [{ model: Category, attributes: ["name"] }]
        }
      : {
          limit: 10,
          include: [
            {
              model: Category,
              attributes: ["name"]
            }
          ]
        };
    return Product.findAll(options);
  } catch (e) {
    next(e);
  }
};

module.exports = { updateCartCount, cleaner, generalQuery };

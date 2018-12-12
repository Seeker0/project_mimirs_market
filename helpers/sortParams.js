let { sequelize, Category } = require("./../models").sequelize;
let { Op } = sequelize;

let search = string => ({
  name: { [Op.iLike]: `%${string}%` }
});

let sort = string => {
  let map = {
    "name-asc": { order: [["name", "ASC"]] },
    "name-desc": { order: [["name", "DESC"]] },
    "price-asc": { order: [["price", "ASC"]] },
    "price-desc": { order: [["price", "DESC"]] },
    newest: { order: [["createdAt", "ASC"]] },
    oldest: { order: [["createdAt", "DESC"]] }
  };
  return map[string];
};

let filter = obj => {
  let map = {
    category: id => ({ categoryId: id }),
    minimum: val => ({ price: { [Op.gte]: val } }),
    maximum: val => ({ price: { [Op.lte]: val } }),
    mix: (min, max) => ({
      price: { [Op.and]: [{ [Op.gte]: min }, { [Op.lte]: max }] }
    })
  };
  let options = {};

  if (obj.min && obj.max) {
    Object.assign(options, map.mix(obj.min, obj.max));
    delete obj.minimum;
    delete obj.maximum;
  }

  Object.keys(obj).forEach(key => {
    Object.assign(options, map[key](obj[key]));
  });
  return options;
};

let optionsBuilder = params => {
  let options = {
    where: {}
  };
  let map = {
    search: (obj, string) => Object.assign(obj.where, search(string)),
    filter: (obj, filterObj) => Object.assign(obj.where, filter(filterObj)),
    sort: (obj, att, dir) => Object.assign(obj, sort(att, dir))
  };

  Object.keys(params).forEach(key => {
    if (map[key]) map[key](options, params[key]);
  });

  return Object.assign(options, {
    include: [{ model: Category, attributes: ["name"] }]
  });
};

module.exports = optionsBuilder;

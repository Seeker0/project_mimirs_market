"use strict";
let faker = require("faker");

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    let categories = [],
      used = [];
    while (categories.length < 10) {
      let newCat = faker.commerce.department();
      if (!used.includes(newCat)) {
        used.push(newCat);
        categories.push({ name: newCat });
      }
    }
    return queryInterface.bulkInsert("Categories", categories);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:z */
    return queryInterface.bulkDelete("Categories", null, {});
  }
};

'use strict';

const faker = require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    var products = [];
    for (let i = 0; i < 100; i++) {
      products.push({
        name: faker.commerce.productName(),
        sku: faker.random.number(),
        description: faker.random.words(),
        price: faker.commerce.price(),
        image: faker.image.food(),
        categoryId: Math.floor(Math.random() * (10 - 1 + 1))
      });
    }
    console.log(products);
    return queryInterface.bulkInsert('Products', products);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};

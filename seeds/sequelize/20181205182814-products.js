"use strict";

const faker = require("faker");

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
    let urlSelector = () => {
      let random = faker.random.image();
      if (random.length > 254) {
        return imageSelector();
      }
      return random;
    };

    let products = [];

    while (products.length < 50) {
      let newProduct = {
        name: faker.commerce.productName(),
        sku: faker.random.number(),
        description: faker.lorem.sentence(),
        price: faker.commerce.price(),
        image: urlSelector(),
        categoryId: Math.floor(Math.random() * (10 - 1 + 1) + 1),
        createdAt: faker.date.past(),
        updatedAt: faker.date.past()
      };
      products.push(newProduct);
    }
    return queryInterface.bulkInsert("Products", products);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:*/
    return queryInterface.bulkDelete("Products", null, {});
  }
};

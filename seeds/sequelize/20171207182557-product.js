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
    let imageCats = {
      1: 'avatar',
      2: 'imageUrl',
      3: 'abstract',
      4: 'animals',
      5: 'business',
      6: 'cats',
      7: 'city',
      8: 'food',
      9: 'nightlife',
      10: 'fashion',
      11: 'people',
      12: 'nature',
      13: 'sports',
      14: 'technics',
      15: 'transport',
      16: 'dataUri'
    };

    var products = [];
    for (let i = 0; i < 50; i++) {
      let imageSelector = () => {
        let random = imageCats[Math.floor(Math.random() * 16 + 1)];
        let newString = faker.image[random]();
        if (newString.length > 254) {
          imageSelector();
        } else {
          return newString;
        }
      };
      products.push({
        name: faker.commerce.productName(),
        sku: faker.random.number(),
        description: faker.random.words(),
        price: faker.commerce.price(),
        image: imageSelector(),
        categoryId: Math.floor(Math.random() * (10 - 1 + 1)),
        createdAt: faker.date.past(),
        updatedAt: faker.date.past()
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

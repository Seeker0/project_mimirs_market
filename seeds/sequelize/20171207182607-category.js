'use strict';

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
    let foods = [
      'Italian',
      'German',
      'Chinese',
      'Dominican',
      'Mexican',
      'Japanese',
      'Brazilian',
      'Hawaiian',
      'French',
      'Indian'
    ];
    let categories = [];
    for (var i = 0, len = foods.length; i < len; i++) {
      categories.push({name: foods[i]});
    }
    console.log(categories);
    return queryInterface.bulkInsert('Categories', categories);

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

"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    let users = [];

    for (let i = 0; i < 10; i++) {
      let user = {
        username: `User${i}`,
        email: `user${i}@gmail.com`,
        password: `iamuser${i}`
      };

      users.push(user);
    }

    return queryInterface.bulkInsert("Users", users);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  }
};

let path = require("path");
require("dotenv").config({
  path: path.join(__dirname, "./env")
});
console.log(process.env.USER_NAME);

module.exports = {
  development: {
    username: process.env.USER_NAME,
    password: null,
    database: "mimirs_market_dev",
    host: "127.0.0.1",
    dialect: "postgres"
  },
  test: {
    username: process.env.USER_NAME,
    password: null,
    database: "mimirs_market_test",
    host: "127.0.0.1",
    dialect: "postgres"
  },
  production: {
    use_env_variable: "POSTGRES_URL",
    dialect: "postgres"
  }
};

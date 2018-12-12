let router = require("express").Router();
let path = require("path");
let fs = require("fs");
let basename = path.basename(__filename);

let routes = {};

fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach(file => {
    let filename = file.substring(0, file.length - 3);
    routes[filename] = require(`./${filename}`);
  });

module.exports = routes;

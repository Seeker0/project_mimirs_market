let mongoose = require("mongoose");
let bluebird = require("bluebird");

//Set bluebird as Mongoose promise library
mongoose.Promise = bluebird;

let models = {};

//Require and assign models

//Then export
module.exports = models;

let mongoose = require("mongoose");
let repl = require("repl").start({});
let helpers = require("./helpers");
let models = {
  mongoose: require("./models/mongoose"),
  sequelize: require("./models/sequelize")
};

require("./mongo")().then(() => {
  repl.context.models = models;
  repl.context.helpers = helpers;

  //====================
  //Helpers
  //====================
  Object.keys(helpers).forEach(key => {
    repl.context[key] = helpers[key];
  });

  //====================
  //Mongoose Models
  //====================
  Object.keys(models.mongoose).forEach(model => {
    repl.context[model] = mongoose.model(model);
  });

  //====================
  //Sequelize Models
  //====================
  Object.keys(models.sequelize).forEach(model => {
    repl.context[model] = models.sequelize[model];
  });

  //====================
  //Logging
  //====================
  repl.context.lg = data => {
    if (Array.isArray(data)) {
      if (data.length && data[0].dataValues) {
        data = data.map(item => item.dataValues);
      }
    }
    console.log(data);
  };
});

// ronst repl = require('repl').start({});
const mongoose = require('mongoose');
const models = {
  mongoose: require('./models/mongoose'),
  sequelize: require('./models/sequelize')
};
const lodash = require('lodash');
const helpers = require('./helpers');

require('./mongo')().then(() => {
  repl.context.models = models;
  repl.context.helpers = helpers;

  //-----------------------------------------
  //Mongoose
  //-----------------------------------------
  Object.keys(models.mongoose).forEach(modelName => {
    repl.context[mondelName] = mongoose.model(modelName);
  });

  //-----------------------------------------
  //Sequelize
  //-----------------------------------------
  Object.keys(models.sequelize).forEach(modelName => {
    repl.context[modelName] = models.sequelize[modelName];
  });

  // ----------------------------------------
  // Libs
  // ----------------------------------------
  repl.context.lodash = lodash;

  // ----------------------------------------
  // Helpers
  // ----------------------------------------
  repl.context.helpers = helpers;
  Object.keys(helpers).forEach(key => {
    repl.context[key] = helpers[key];
  });

  // ----------------------------------------
  // Logging
  // ----------------------------------------
  repl.context.lg = data => {
    if (Array.isArray(data)) {
      if (data.length && data[0].dataValues) {
        data = data.map(item => item.dataValues);
      }
    }
    console.log(data);
  };
});

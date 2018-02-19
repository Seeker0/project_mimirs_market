'use strict';
module.exports = (sequelize, DataTypes) => {
  var Category = sequelize.define(
    'Category',
    {
      name: DataTypes.STRING
    },
    {
      classMethods: {}
    }
  );

  Category.associate = function(models) {
    // associations can be defined here
    Category.hasMany(models.Product, {
      foreignKey: 'categoryId'
    });
  };

  return Category;
};

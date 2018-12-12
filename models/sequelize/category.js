"use strict";
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    "Category",
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Categories mut be named"
          },
          isAlpha: {
            msg: "Categories must only be alphabetic"
          }
        }
      }
    },
    {}
  );
  Category.associate = function(models) {
    // associations can be defined here
    Category.hasMany(models.Product, {
      foreignKey: "categoryId"
    });
  };
  return Category;
};

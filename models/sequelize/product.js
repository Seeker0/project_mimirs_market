'use strict';
module.exports = (sequelize, DataTypes) => {
  var Product = sequelize.define(
    'Product',
    {
      name: DataTypes.STRING,
      sku: DataTypes.INTEGER,
      description: DataTypes.TEXT,
      price: DataTypes.FLOAT,
      image: DataTypes.STRING,
      categoryId: DataTypes.INTEGER
    },
    {
      classMethods: {}
    }
  );

  Product.associate = function(models) {
    // associations can be defined here
    Product.belongsTo(models.Category, {
      foreignKey: 'categoryId'
    });
  };

  return Product;
};

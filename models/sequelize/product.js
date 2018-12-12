"use strict";
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Products must be named"
          },
          isAlphanumeric: {
            msg: "Product names can only contain letters and numbers"
          }
        }
      },
      sku: {
        type: DataTypes.INTEGER,
        validate: {
          notNull: {
            msg: "All products must have a valid sku"
          },
          isNumberic: {
            msg: "SKU's must be valid number"
          }
        }
      },
      description: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "All products must have a description"
          }
        }
      },
      price: {
        type: DataTypes.FLOAT,
        notNull: {
          msg: "All product must have a price"
        },
        isFloat: {
          msg: "Product prices must be a floating point number"
        }
      },
      image: DataTypes.STRING,
      categoryId: DataTypes.INTEGER,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    },
    {}
  );
  Product.associate = function(models) {
    // associations can be defined here
    Product.belongsTo(models.Category, {
      foreignKey: "categoryId"
    });
  };
  return Product;
};

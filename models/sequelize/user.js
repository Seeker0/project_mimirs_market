"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      username: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: {
            msg: "Users must have a valid email."
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [8, 30],
            msg: "Passwords must be between 8 and 30 characters in length"
          }
        }
      }
    },
    {}
  );
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};

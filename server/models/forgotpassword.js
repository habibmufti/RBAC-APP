"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ForgotPassword extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ForgotPassword.hasMany(models.User, { foreignKey: "UserId" });
    }
  }
  ForgotPassword.init(
    {
      pin: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: "Pin cannot be empty",
          },
          notNull: {
            args: true,
            msg: "Pin cannot be empty",
          },
          min: {
            args: 6,
            msg: "Pin must be 6 characters",
          },
          max: {
            args: 6,
            msg: "Pin must be 6 characters",
          },
        },
      },
      UserId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      isExpired: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "ForgotPassword",
      hooks: {
        beforeCreate: (forgotPassword) => {
          forgotPassword.isExpired = false;
        },
      },
    }
  );
  return ForgotPassword;
};

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Workplace extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Workplace.belongsTo(models.User, { foreignKey: "WorkplaceId" });
    }
  }
  Workplace.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: "Workplace already registered",
        },
        validate: {
          notEmpty: {
            args: true,
            msg: "Name cannot be empty",
          },
          notNull: {
            args: true,
            msg: "Name cannot be empty",
          },
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Address cannot be empty",
          },
          notNull: {
            args: true,
            msg: "Address cannot be empty",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Workplace",
    }
  );
  return Workplace;
};

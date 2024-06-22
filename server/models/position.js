"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Position extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Position.belongsTo(models.User, { foreignKey: "UserId" });
    }
  }
  Position.init(
    {
      name: {
        type: DataTypes.STRING,
        unique: {
          args: true,
          msg: "Position already registered",
        },
        allowNull: false,
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
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Description cannot be empty",
          },
          notNull: {
            args: true,
            msg: "Description cannot be empty",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Position",
    }
  );
  return Position;
};

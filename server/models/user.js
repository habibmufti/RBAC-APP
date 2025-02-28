"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Role, { foreignKey: "RoleId" });
      User.hasOne(models.Position, { foreignKey: "PositionId" });
      User.hasOne(models.Workplace, { foreignKey: "WorkplaceId" });
      User.hasMany(models.ForgotPassword , { foreignKey: "UserId" });
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,
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
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: "Email already registered",
        },
        validate: {
          isEmail: {
            args: true,
            msg: "Invalid email format",
          },
          notEmpty: {
            args: true,
            msg: "Email cannot be empty",
          },
          notNull: {
            args: true,
            msg: "Email cannot be empty",
          },
        },
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Phone number cannot be empty",
          },
          notNull: {
            args: true,
            msg: "Phone number cannot be empty",
          },
          len: {
            args: [10, 13],
            msg: "Phone number must be between 10 and 13 characters",
          },
        },
        unique: {
          args: true,
          msg: "Phone number already registered",
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Password cannot be empty",
          },
          notNull: {
            args: true,
            msg: "Password cannot be empty",
          },
          min: {
            args: 6,
            msg: "Password must be at least 6 characters",
          },
        },
      },
      imgUrl: {
        type: DataTypes.STRING,
        validate: {
          isUrl: {
            args: true,
            msg: "Invalid URL format",
          },
        },
      },
      PositionId: {
        type: DataTypes.INTEGER,
        // allowNull: false,
        // validate: {
        //   notEmpty: {
        //     args: true,
        //     msg: "Position cannot be empty",
        //   },
        //   notNull: {
        //     args: true,
        //     msg: "Position cannot be empty",
        //   },
        // },
        references: {
          model: "Positions",
          key: "id",
        },
      },
      WorkplaceId: {
        type: DataTypes.INTEGER,
        // allowNull: false,
        // validate: {
        //   notEmpty: {
        //     args: true,
        //     msg: "Workplace cannot be empty",
        //   },
        //   notNull: {
        //     args: true,
        //     msg: "Workplace cannot be empty",
        //   },
        // },
        references: {
          model: "Workplaces",
          key: "id",
        },
      },
      RoleId: {
        type: DataTypes.INTEGER,
        // allowNull: false,
        // validate: {
        //   notEmpty: {
        //     args: true,
        //     msg: "Role cannot be empty",
        //   },
        //   notNull: {
        //     args: true,
        //     msg: "Role cannot be empty",
        //   },
        // },
        references: {
          model: "Roles",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate: (user) => {
          user.password = hashPassword(user.password);
          user.imgUrl = "https://i.stack.imgur.com/l60Hf.png";
          user.PositionId = 1;
          user.RoleId = 3;
          user.WorkplaceId = 3;
        },
      },
    }
  );
  return User;
};

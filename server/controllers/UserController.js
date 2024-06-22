const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { User } = require("../models");
class UserController {
  static async CreateUser(req, res, next) {
    try {
      const newUser = await User.create(req.body);
      res.status(201).json({ message: `User ${newUser.email} has been created` });
    } catch (error) {
      next(error);
    }
  }
  static async Login(req, res, next) {
    try {
      const { credential, password } = req.body;
      // console.log("🚀 ~ UserController ~ Login ~ req:", req.body);
      const user = (await User.findOne({ where: { phone: credential } })) || (await User.findOne({ where: { email: credential } }));
      if (!user) {
        throw { name: "InvalidLogin" };
      }
      if (!comparePassword(password, user.dataValues.password)) {
        throw { name: "InvalidLogin" };
      }
      res.status(200).json({ message: "Login success", token: signToken({ id: user.dataValues.id }) });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = UserController;

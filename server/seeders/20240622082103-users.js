"use strict";

const { hashPassword } = require("../helpers/bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const data = require("../data/users.json");
    data.forEach((el) => {
      delete el.id;
      el.password = hashPassword(el.password);
      el.imgUrl = "https://i.stack.imgur.com/l60Hf.png";
      el.createdAt = new Date();
      el.updatedAt = new Date();
    });
    // console.log("🚀 ~ up ~ data:", data);
    await queryInterface.bulkInsert("Users", data, {});
    console.log({ message: "Users seeded" });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users", null, {});
    console.log({ message: "Users deleted" });
  },
};

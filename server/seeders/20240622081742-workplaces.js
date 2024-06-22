"use strict";

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
    const data = require("../data/workplaces.json");
    data.forEach((el) => {
      delete el.id;
      el.createdAt = new Date();
      el.updatedAt = new Date();
    });
    // console.log("🚀 ~ up ~ data:", data);
    await queryInterface.bulkInsert("Workplaces", data, {});
    console.log({ message: "Workplaces seeded" });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Workplaces", null, {});
    console.log({ message: "Workplaces deleted" });
  },
};

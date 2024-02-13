"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("categories", [
      {
        name: "Flutter",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "React-Native",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Vue Js",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("categories", {}, null);
  },
};

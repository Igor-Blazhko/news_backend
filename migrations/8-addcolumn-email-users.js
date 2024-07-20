'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'email', {
      type: Sequelize.DataTypes.STRING,
    });
  },
  async down(queryInterface) {
    await queryInterface.removeColumn('Users', 'email');
  },
};

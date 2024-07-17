'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'avatarId', {
      type: Sequelize.DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'Images',
          schema: 'public',
        },
        key: 'id',
      },
      onDelete: 'CASCADE',
    });
  },
  async down(queryInterface) {
    await queryInterface.removeColumn('Users', 'avatarId');
  },
};

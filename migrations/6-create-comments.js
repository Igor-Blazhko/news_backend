'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      text: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      PostId: {
        references:{
          model:{
            tableName: 'News',
            schema: 'public',
          },
          key :'id'},
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      UserId: {
        references:{
          model:{
            tableName: 'Users',
            schema: 'public',
          },
          key :'id'},
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Comments');
  },
};

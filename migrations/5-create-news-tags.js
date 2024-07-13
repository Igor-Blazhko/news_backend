'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('News-Tags', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      idPost: {
        references:{
          model:{
            tableName: 'News',
            schema: 'public',
          },
        key :'id'},
        type: Sequelize.INTEGER,
      },
      idTags: {
        references:{
          model:{
            tableName: 'Tags',
            schema: 'public',
          },
        key :'id'},
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('News-Tags');
  }
};
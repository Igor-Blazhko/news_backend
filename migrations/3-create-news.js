'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query('CREATE SCHEMA IF NOT EXISTS schema;');

    await queryInterface.createTable(
      {
        schema: 'public',
        tableName: 'News',
      },
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        article: {
          type: Sequelize.TEXT,
        },
        text: {
          type: Sequelize.TEXT,
        },
        UserId: {
          references: {
            model: {
              tableName: 'Users',
              schema: 'public',
            },
            key: 'id',
          },
          onDelete: 'CASCADE',
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        ImageId: {
          references: {
            model: {
              tableName: 'Images',
              schema: 'public',
            },
            key: 'id',
          },
          onDelete: 'CASCADE',
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
      },
    );
  },
  async down(queryInterface) {
    await queryInterface.dropTable('News');
  },
};

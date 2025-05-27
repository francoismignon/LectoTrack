'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Readings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      page_number: {
        type: Sequelize.INTEGER
      },
      percentage: {
        type: Sequelize.DECIMAL
      },
      book_id: {
        type: Sequelize.INTEGER,
        references:{
          model:'Books',
          key:'id'
        },
        onUpdate:'CASCADE',
        onDelete:'CASCADE' //Si je supprime un livre, je pc supprimer les readings
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Readings');
  }
};
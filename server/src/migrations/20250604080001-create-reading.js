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
      bookId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'Books',
          key:'id'
        },
        onDelete:'RESTRICT', //empeche la suppression de livrespour ne pas perdre les lectures
        onUpdate:'CASCADE'
      },
      statusId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'Statuses',
          key:'id'
        },
        onDelete:'RESTRICT', //Empeche de supprimer les lectures
        onUpdate:'CASCADE'
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'Users',
          key:'id'
        },
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
      },
      progress: {
        type: Sequelize.FLOAT
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
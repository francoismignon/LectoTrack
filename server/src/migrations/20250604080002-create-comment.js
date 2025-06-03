'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      readingId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'Readings',
          key:'id'
        },
        onDelete:'CASCADE', //sans probleme, je px supprimer tous les commentaire si je supprime ma lecture (le livre dans le bibiotheque)
        onUpdate:'CASCADE'
      },
      pageNbr: {
        type: Sequelize.INTEGER
      },
      content: {
        type: Sequelize.TEXT
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
    await queryInterface.dropTable('Comments');
  }
};
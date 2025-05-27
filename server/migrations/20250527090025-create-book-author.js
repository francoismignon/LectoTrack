'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('BookAuthors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      book_id: {
        type: Sequelize.INTEGER,
        references:{
          model:'Books',
          key:'id'
        },
        onUpdate:'CASCADE',
        onDelete:'SET NULL'// je met a null car, je ne sais pas trop le comportement si je supprime un livre ou un autheur.
      },
      author_id: {
        type: Sequelize.INTEGER,
        references:{
          model:'Authors',
          key:'id'
        },
        onUpdate:'CASCADE',
        onDelete:'SET NULL'
      },
      year: {
        type: Sequelize.DATE
      },
      edition: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('BookAuthors');
  }
};
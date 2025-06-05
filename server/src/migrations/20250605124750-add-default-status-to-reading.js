'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Readings', 'statusId',{
      type:Sequelize.INTEGER,
      allowNull:false,
      defaultValue:1 //Status non commencé par défaut
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Readings', 'statusId',{
      type:Sequelize.INTEGER,
      allowNull:false
    });
  }
};

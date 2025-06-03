'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Users', 'roleId',{
      type: Sequelize.INTEGER,
      allowNull:false,
      defaultValue:2, //Rôles "lecteur" par defaut
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Users', 'roleId',{
      type: Sequelize.INTEGER,
      allowNull:false,
      defaultValue:1,
    });
  }
};

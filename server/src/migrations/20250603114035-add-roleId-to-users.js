'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('Users', 'roleId',{
      type: Sequelize.INTEGER,
      allowNull:false,
      defaultValue:1, //Rôles "lecteur" par defaut
      references:{
        model:'Roles',
        key:'id'
      },
      onDelete:'RESTRICT',
      onUpdate:'CASCADE'
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('Users', 'roleId');
  }
};

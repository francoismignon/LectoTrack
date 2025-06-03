const bcrypt = require('bcrypt');
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const saltRounds = 10;
    await queryInterface.bulkInsert('Users',[
      {
        login:'admin',
        password:await bcrypt.hash('admin', saltRounds),
        roleId:1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', {
      login:'admin'
    },{});
  }
};

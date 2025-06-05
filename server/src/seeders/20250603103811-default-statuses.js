'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Statuses', [
      {
        name: 'Non commencer',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'En cours',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Terminé',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Statuses', null, {});
    await queryInterface.sequelize.query('ALTER SEQUENCE "Statuses_id_seq" RESTART WITH 1;');
  }
};

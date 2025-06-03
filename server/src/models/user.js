'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Un utilisateur a plusieur lecture en cours
      User.hasMany(models.Reading, { as: 'readings'});
      // un utilisateur est qualifier par un seul role
      User.belongsTo(models.Role, {
        foreignKey:'roleId',
        as:'role'
      });
    }
  }
  User.init({
    login: DataTypes.STRING,
    password: DataTypes.STRING,
    roleId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
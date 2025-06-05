'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reading extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Un lecture n'as qu'un seul livre
      Reading.belongsTo(models.Book, {
        foreignKey:'bookId',
        as:'book'
      });
      // une lecture est associer a un seul utilisateur
      Reading.belongsTo(models.User, {
        foreignKey:'userId',
        as:'user'
      });
      // une lecture contient plusieur commentaires
      Reading.hasMany(models.Comment, {foreignKey:'readingId', as:'comments'});
      //Une lecture peut avoir different status
      Reading.belongsTo(models.Status, {
        foreignKey:'statusId',
        as:'status'
      })
    }
    
  }
  Reading.init({
    bookId: DataTypes.INTEGER,
    statusId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    progress: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Reading',
  });
  return Reading;
};
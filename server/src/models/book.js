'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Un livre est écrit par un seul auteur
      Book.belongsTo(models.Author, {
        foreignKey: 'authorId',
        as:'author'
      });
      //un livre a plusieur lecture
      Book.hasMany(models.Reading, {foreignKey:'bookId', as: 'readings'});

      //un livre a plusieur catégories (many to many)
      Book.belongsToMany(models.Category, {
        through: models.BookCategory,
        foreignKey:'bookId',
        otherKey:'categoryId',
        as:'categories'
      });
    }
  }
  Book.init({
    authorId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    nbrPages: DataTypes.INTEGER,
    coverUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};
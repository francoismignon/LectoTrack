'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BookCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // LivreCategorie apparatient a un seul livre
      BookCategory.belongsTo(models.Book, {
        foreignKey:'bookId',
        as:'book'
      });
      // LivreCategorie apparatient a une seule categorie
      BookCategory.belongsTo(models.Category, {
        foreignKey:'categoryId',
        as:'category'
      });
    }
  }
  BookCategory.init({
    bookId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'BookCategory',
  });
  return BookCategory;
};
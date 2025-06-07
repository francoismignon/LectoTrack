'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Une categorie défini plusieurs livre (many to many)
      Category.belongsToMany(models.Book, {
        through: models.BookCategory,
        foreignKey:'categoryId',
        otherKey:'bookId',
        as:'books'
      });
      //Une categorie possede plusieur "BookCategory"
      Category.hasMany(models.BookCategory,{
        foreignKey:'categoryId',
        as:'bookCategories'
      });
    }
  }
  Category.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};
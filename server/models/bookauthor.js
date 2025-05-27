'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BookAuthor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      BookAuthor.belongsTo(models.book, {foreignKey:'book_id'});
      BookAuthor.belongsTo(models.Author, {foreignKey:'author_id'});
    }
  }
  BookAuthor.init({
    book_id: DataTypes.INTEGER,
    author_id: DataTypes.INTEGER,
    year: DataTypes.DATE,
    edition: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'BookAuthor',
  });
  return BookAuthor;
};
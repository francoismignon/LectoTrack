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
      //1-N vers User
      Book.belongsTo(models.User, {foreignKey:'user_id'});
      //1-N vers Reading et Note
      Book.hasMany(models.Reading, {foreignKey:'book_id'});
      Book.hasMany(models.Note, {foreignKey:'book_id'});

      //N-N vers Author via BookAuthor
      Book.belongsToMany(models.Author, {
        through: models.BookAuthor,
        foreignKey:'book_id',
        otherKey:'author_id'
      });
      //Acces au ligne de la table de pivot
      Book.hasMany(models.BookAuthor, {foreignKey:'book_id'});
    }
  }
  Book.init({
    title: DataTypes.STRING,
    isbn: DataTypes.STRING,
    cover_url: DataTypes.TEXT,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};
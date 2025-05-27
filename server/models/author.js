'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Author extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //N-N vers Book
      Author.belongsToMany(models.Book, {
        through: models.BookAuthor,
        foreignKey:'author_id',
        otherKey:"book_id"
      });
      //Acces a la table de pivot
      Author.hasMany(models.BookAuthor, {foreignKey:'author_id'});
    }
  }
  Author.init({
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Author',
  });
  return Author;
};
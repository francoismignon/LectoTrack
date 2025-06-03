'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Un commentaire n'appatient qu'a une seule lecture
      Comment.belongsTo(models.Reading, {
        foreignKey:'readingId',
        as:'reading'
      });
    }
  }
  Comment.init({
    readingId: DataTypes.INTEGER,
    pageNbr: DataTypes.INTEGER,
    content: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};
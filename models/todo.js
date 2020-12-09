"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Todo.belongsTo(models.Category, {
        as: "category",
        foreignKey: {
          name: "categoryId",
        },
      });
    }
  }
  Todo.init(
    {
      categoryId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      isDone: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Todo",
    }
  );
  return Todo;
};

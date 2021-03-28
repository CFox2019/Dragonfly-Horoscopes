const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Horoscope extends Model { }


// This Model is for the Horoscope table
// Allows the users info to be stored and then with password access they are able to be view previous searches.
// So this Basically creates a Personal Profile for the User
Horoscope.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    horoscope: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'Horoscope',
  },
);
module.exports = Horoscope;

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Horoscope extends Model { }

//  github
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
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    horoscope: {
      type: DataTypes.TEXT,
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
    modelName: 'horoscope',
    indexes: [
      {
          name: 'unique_date_user_id_index',
          unique: true,
          fields: ['date', 'user_id']
      }
  ],
  },
);

module.exports = Horoscope;

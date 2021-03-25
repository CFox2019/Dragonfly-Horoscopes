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
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    horoscope: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      reference : {
        model : "user",
        key : "id"
      },
    },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [8],
        },
      },
  },
  {
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(
          updatedUserData.password,
          10
        );
        return updatedUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'horoscope',
  },
);
module.exports = Horoscope;

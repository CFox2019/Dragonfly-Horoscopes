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
    
    text: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
     
    },
    sign_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "sign",
        key: "id",
      },
      

    date: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique : true,
      validate : {
      isDate : true
      }
    },
  }
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

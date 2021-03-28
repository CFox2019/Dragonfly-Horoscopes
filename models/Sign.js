const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Sign extends Model { }


// This Model is for the Horoscope table
// Allows the users info to be stored and then with password access they are able to be view previous searches.
// So this Basically creates a Personal Profile for the User
Sign.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            references: {
                model: "horoscope",
                key: "id",
              },
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false,

        },
    
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'horoscope',
    
});

module.exports = Sign;
const User = require('./User');
const Horoscope = require('./horoscopes');

module.exports = { User, Horoscope };

User.hasMany(Horoscope,{
foreignKey: 'user'
});

Horoscope.hasMany(User, {
    foreignKey: ''
})
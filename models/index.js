const User = require('./User');
const Horoscope = require('./Horoscopes');
const Sign = require('./Sign');


User.hasMany(Horoscope,{
onDelete: "cascade"
});
// try belongsTo
Horoscope.belongTo(User, {
    foreignKey: 'user'
})

Sign.hasMany(Horoscope,{
foreignKey: 'horoscope'
})

module.exports = { User, Horoscope, Sign };
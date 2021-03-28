const User = require('./User');
const Horoscope = require('./Horoscopes');
const Sign = require('./Sign');


User.hasMany(Horoscope, {
    foreignKey: 'user_id'
});
// try belongsTo
Horoscope.belongTo(User, {
    foreignKey: 'user'
})

Horoscope.belongsTo(User, {
    foreignKey: 'user_id'
})

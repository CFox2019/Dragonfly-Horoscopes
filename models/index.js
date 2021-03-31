const User = require('./User');
const Horoscope = require('./Horoscope');

User.hasMany(Horoscope, {
    foreignKey: 'user_id',
    onDelete: "cascade"
});

Horoscope.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = { User, Horoscope };
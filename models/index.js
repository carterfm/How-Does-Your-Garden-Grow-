const User = require('./User.js');
const Garden = require('./Garden.js');
const Plant = require('./Plant.js');

//Gardens belong to a single user, and a single user can have many gardens
Garden.belongsTo(User);
User.hasMany(Garden);

//
Plant.belongsToMany(Garden, {through: 'GardenPlants'});
Garden.belongsToMany(Plant, {through: 'GardenPlants'});

module.exports = {
    User,
    Garden,
    Plant
}
const User = require('./User.js');
const Garden = require('./Garden.js');
const Plant = require('./Plant.js');
const GardenPlant = require('./GardenPlant.js');

//Gardens belong to a single user, and a single user can have many gardens
Garden.belongsTo(User, { onDelete: 'CASCADE'});
User.hasMany(Garden);

//
Plant.belongsToMany(Garden, {through: GardenPlant});
Garden.belongsToMany(Plant, {through: GardenPlant});
//Note for future if we wanna include the number of plants in a garden
//PlantedPlant.belongsTo(Garden);
//PlantedPlant.belongsTo(Plant);
//Garden.hasMany(PlantedPlant);
//Plant.hasMany(PlantedPlant);

module.exports = {
    User,
    Garden,
    Plant,
    GardenPlant
}
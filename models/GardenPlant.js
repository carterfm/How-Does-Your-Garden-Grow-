const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class GardenPlant extends Model {};

GardenPlant.init({
    //index.js should generate GardenId and PlantId; this field here is for tracking how many of
    //each variety of plants a garden has associated with it
    numberOfPlants:{
        type: DataTypes.INTEGER,
        defaultValue: 1,
        allowNull: false,
        //You aren't allowed to set 0 plants or negative plants if you've associated a plant with a garden
        validate: {
            min: 1
        }
    }
},{
    sequelize
});

module.exports = GardenPlant;
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Plant extends Model {}

Plant.init({
    //id is generated automatically by sequelize
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    description:{
        type: DataTypes.TEXT
    },
    //Measurements are in inches
    height:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    //yield is in pounds/square foot
    yield:{
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    sunLevel:{
        //can take full, partial, shade
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [['full', 'partial', 'shade']]
        }
    },
    //timeToHarvest is in days
    timeToHarvest:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    // Plants per SF for Square Foot Gardening
    plantsPerSF:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    sequelize
});

module.exports = Plant;
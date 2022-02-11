const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Garden extends Model {}

Garden.init({
    //id is generated automatically by sequelize
    title:{
        type: DataTypes.STRING,
        allowNull: false
    },
    description:{
        type: DataTypes.STRING
    },
    shape: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [['circle', 'square', 'rectangle']]
        }
    },
    //Measurements are in inches
    length:{
        type: DataTypes.INTEGER,
        //not allowing this to be null since it will be used for radius if the user
        //selects a circular garden shape
        allowNull: false
    },
    width: {
        type: DataTypes.INTEGER
    },
    //might put an area column here later, or could define a model method for it
    sunLevel:{
        //can take full, partial, shade
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [['full', 'partial', 'shade']]
        }
    }
},{
    sequelize
});

module.exports = Garden;
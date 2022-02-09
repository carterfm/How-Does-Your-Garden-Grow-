const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require("bcrypt");

class User extends Model {}

User.init({
    //id is generated automatically by sequelize
    username:{
        type: DataTypes.VARCHAR(30),
        allowNull: false,
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate:{
            isEmail: true
        }
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            len: [8]
        }
    }
},{
    sequelize,
    hooks:{
        beforeCreate: userData => {
            userData.password = bcrypt.hashSync(userData.password, 5);
            return userData;
        },
        beforeUpdate: userData => {
            userData.password = bcrypt.hashSync(userData.password, 5);
            return userData;
        }
    }
});

module.exports = User;
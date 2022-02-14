const sequelize = require('../config/connection');
const { User, Plant, Garden } = require('../models');

const plantData =  require('./plantData.json');
const userData = require('./userData.json');
const gardenData = require('./gardenData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const plants = await Plant.bulkCreate(plantData, {
        individualHooks: true,
        returning: true,
    });

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    const gardens = await Garden.bulkCreate(gardenData, {
        individualHooks: true,
        returning: true,
    })

    process.exit(0);
};

seedDatabase();
const sequelize = require('../config/connection');
const { User, Plant, Garden } = require('../models');

const plantData =  require('./plantData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const plants = await Plant.bulkCreate(plantData, {
        individualHooks: true,
        returning: true,
    });

    process.exit(0);
};

seedDatabase();
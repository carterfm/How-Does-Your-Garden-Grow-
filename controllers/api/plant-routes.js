const router = require('express').Router();
const { Garden, Plant } = require('../../models');

//Get all plants and associated gardens
router.get('/', async (req, res) => {
    try {
        const allPlants = await Plant.findAll();
        res.status(200).json(allPlants);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
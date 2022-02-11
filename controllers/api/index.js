const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const gardenRoutes = require('./garden-routes.js')
const plantRoutes = require('./plant-routes.js');

router.use('/user', userRoutes);
router.use('/garden', gardenRoutes);
router.use('/plant', plantRoutes);

module.exports = router;
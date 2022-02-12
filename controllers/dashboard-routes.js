const router = require('express').Router();
const { User, Plant, Garden } = require('../models');
const withAuth = require('../utils/auth.js');

//Get route to display user page
router.get('/', withAuth, (req, res) => {
    try {
        res.render('userHome', req.session.user);
    } catch (err) {
        console.log('======\n' + err + '\n======');
        res.status(500).json(err);
    }
});

//Get route to display page for editing user information
router.get('/profile', withAuth, (req, res) => {
    try {
        res.render('editUser', req.session.user);
    } catch(err) {
        console.log('======\n' + err + '\n======');
        res.status(500).json(err);
    }
});


//Get routes for pages relevant to gardens
//Get route to display all the gardens associated with the user who is currently logged in
router.get('/gardens', withAuth, async (req, res) => {
    try {
        const allUserGardens = await Garden.findAll({where: { UserId: req.session.user.id }});
        const garden = allUserGardens.map(garden => garden.get({plain: true}));

        res.render('oldGardens', {garden});
    } catch (err) {
        console.log('======\n' + err + '\n======');
        res.status(500).json(err);
    }
});

//Get route to display the create garden page
router.get('/gardens/create', withAuth, async (req, res) => {
    try {
        const allPlants = await Plant.findAll();
        const plant = allPlants.map(plant => plant.get({plain: true}));

        res.render('createGarden', {plant});
    } catch (err) {
          console.log(err);
          res.status(500).json({ msg: "uh oh!", err });
        };
})

//Get route to display a specific garden from the user's gardens to the page
router.get('/gardens/:id', withAuth, async(req, res) => {
    try {
        const gardenData = await Garden.findByPk(req.params.id, {
            include: [Plant],
            where: {
                UserId: req.session.user.id
            }
        });
    
        if (!gardenData) {
          return res.status(404).json({ message: 'No garden with that id is associated with this user'});
        }

        const garden = gardenData.get({plain: true});
        console.log(garden);
        res.render('garden', garden);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Get route for editing an old garden
router.get('/gardens/edit/:id', withAuth, async (req, res) => {
    try {
        const gardenToEdit = await Garden.findByPk(req.params.id, {
            include: [Plant],
            where: {
                UserId: req.session.user.id
            }
        });

        if (!gardenToEdit) {
            return res.status(404).json({ message: 'No garden with that id is associated with this user'});
        }

        const gardenEdit = gardenToEdit.get({plain: true});
        
        res.render('editOldGarden', gardenEdit);
    } catch (err) {
        console.log('======\n' + err + '\n======');
        res.status(500).json(err); 
    }
});

module.exports = router;
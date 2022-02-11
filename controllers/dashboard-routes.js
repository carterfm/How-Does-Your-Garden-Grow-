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
        const gardens = allUserGardens.map( garden => garden.get({plain: true}));

        res.render('oldGardens', gardens);
    } catch (err) {
        console.log('======\n' + err + '\n======');
        res.status(500).json(err);
    }
});

//Get route to display the create garden page
// router.get('/gardens/create', withAuth, async (req, res) => {
//     try {
//         res.render('createGarden');
//     } catch (err) {
//         console.log('======\n' + err + '\n======');
//         res.status(500).json(err);
//     }
// });

//Get route to display plants on create form
router.get('/gardens/create', withAuth, async (req, res)=>{
    try{
        const dbPlants = Plant.findAll({})
        const plants = (await dbPlants).map(plant => plant.get({plain: true}));
        console.log({...plants});
        res.render('createGarden', {plant: plants});
    } catch (err) {
          console.log(err);
          res.status(500).json({ msg: "uh oh!", err });
        };
})

//Get route for editing an old garden
router.get('/gardens/edit', withAuth, async (req, res) => {
    try {
        res.render('editOldGarden');
    } catch (err) {
        console.log('======\n' + err + '\n======');
        res.status(500).json(err); 
    }
});

//Route to display output page
router.post('/gardens/new', withAuth, async (req, res) => {
        try { 
            const gardenData = await Garden.create({
            title: req.body.name,
            description: req.body.description,
            shape: req.body.shape,
            length: req.body.length,
            width: req.body.width,
            sunLevel: req.body.sun
          });
            const garden = gardenData.get({plain: true});
            res.render('garden', {...garden});
        }   catch (err) {
            console.log('======\n' + err + '\n======');
            res.status(500).json(err);
        }
        
});
module.exports = router;
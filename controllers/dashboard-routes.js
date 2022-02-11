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
    }   catch (err) {
        console.log('======\n' + err + '\n======');
        res.status(500).json(err);
    }
});

//Get route to display the create garden page
router.get('/gardens/create', withAuth, async (req, res) => {
    try {
        res.render('createGarden');
    } catch (err) {
        console.log('======\n' + err + '\n======');
        res.status(500).json(err);
    }
});

//Get route for editing an old garden
router.get('/gardens/edit', withAuth, async (req, res) => {
    try {
        res.render('editOldGarden');
    } catch (err) {
        console.log('======\n' + err + '\n======');
        res.status(500).json(err); 
    }
})

module.exports = router;
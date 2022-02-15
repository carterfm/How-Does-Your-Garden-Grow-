//Setting up router and link to folder to handle our api routes
const router = require('express').Router();
const dashboardRoutes = require('./dashboard-routes.js');
const apiRoutes = require('./api');
//TODO: remove when done with test routes it's being used for
const bcrypt = require("bcrypt");
//Routing requests to /dashboard
router.use('/dashboard', dashboardRoutes);
//Routing requests made to /api to index.js in our api subdirectory
router.use('/api', apiRoutes);

//Get route for homepage
router.get('/', (req, res) => {
    //Renders default landing page if not logged in, and the user home page if logged in
    if (!req.session.user) {
        try {
            res.render('landingPage');
        } catch (err) {
            console.log('======\n' + err + '\n======');
            res.status(500).json(err);
        }
    } else {
        try {
            res.redirect('/dashboard');
        } catch (err) {
            console.log('======\n' + err + '\n======');
            res.status(500).json(err);
        }
    }

});

//Get route for 'create a new user' page

router.get('/signup', (req, res) => {
    if (!req.session.user) {
        try {
            res.render('createUser');
        } catch (err) {
            console.log('======\n' + err + '\n======');
            res.status(500).json(err);
        }
    } else {
        try {
            console.log('Already logged in!')
            res.redirect('/dashboard');
        } catch (err) {
            console.log('======\n' + err + '\n======');
            res.status(500).json(err);
        }
    }
});

module.exports = router;
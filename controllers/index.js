//Setting up router and link to folder to handle our api routes
const router = require('express').Router();
const apiRoutes = require('./api');
//TODO: remove when done with test routes it's being used for
const bcrypt = require("bcrypt");

//Routing requests made to /api to index.js in our api subdirectory
router.use('/api', apiRoutes);

//get route for homepage
router.get('/', async (req, res) => {
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
            res.render('userHome', req.session.user);
        } catch (err) {
            console.log('======\n' + err + '\n======');
            res.status(500).json(err);
        }
    }

});

//Routes NOT to be included in final code, used for testing logging in without having to seed our database or anything
//Navigate to these pages in the browser to fake 
router.get('/fakelogin', async (req, res) => {
    try {
        req.session.user = { 
            id: 1,
            email: "test@test.test",
            username: "Testusername",
            password: bcrypt.hashSync("password", 5)
        };
        console.log(req.session.user);
        res.status(200).end();
    } catch (err) {
        console.log('======\n' + err + '\n======');
        res.status(500).json(err);
    }
});

router.get('/fakelogout', async (req, res) => {
    try {
        req.session.destroy();
        res.status(200).end();
    } catch (err) {
        console.log('======\n' + err + '\n======');
        res.status(500).json(err);
    }
})

module.exports = router;
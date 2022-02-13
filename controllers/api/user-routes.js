const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User, Garden } = require('../../models');

//Get route for getting all users
//TODO: remove, potentially?
router.get('/', async (req, res) => {
    try {
        const allUsers = await User.findAll({
            include: [Garden]
        })
        res.status(200).json(allUsers);
    } catch (err) {
        console.log('======\n' + err + '\n======');
        res.status(500).json(err);
    }
})

router.get('/signup', (req, res)=>{
    if (!req.session.user){
        try{
        res.status(200).render('createUser');
        //TODO: frontend code should then take us to the userHome page by setting location.href
        //to '/dashboard'
        } catch (err) {
            console.log('======\n' + err + '\n======');
            res.status(500).json(err);
        }
    } else {
        res.status(404).end();
    }
})

//managing creation of new user
router.post('/', async (req, res) => {
    try {
        //if req.body lacks a username, email, or password key, this will throw an error,
        //and we'll end up in the catch block
        const newUser = await User.create(req.body);

        req.session.user = {
            id: newUser.id,
            username: newUser.username,
            email: newUser.email
        };

        res.json(newUser);
        //TODO: frontend code should then take us to the userHome page by setting location.href
        //to '/'
    } catch (err) {
        console.log('======\n' + err + '\n======');
        res.status(500).json(err);
    }
});

//logging in an existing user
router.post('/login', async (req, res) => {
    if (!req.session.user) {
        try {
            //Search for a user in our database with matching username
            const user = await User.findOne({
                where: {
                    username: req.body.username
                }
            });
    
            //If no such user exists in our database, return an error code
            //TODO: frontend handling for displaying appropriate message
            if (!user){
                res.status(400).json({ message: 'Incorrect email or password.' });
                return;
            }
    
            if (!bcrypt.compareSync(req.body.password, user.password)){
                res.status(400).json({ message: 'Incorrect email or password.' });
                return;
            }
    
            req.session.user = {
                id: user.id,
                username: user.username,
                email: user.email
            };
    
            res.status(200).json({user: user, message: 'Logged in successfully.'});
            //TODO: frontend code should then take us to the userHome page by setting location.href
            //to '/dashboard'
        } catch (err) {
            console.log('======\n' + err + '\n======');
            res.status(500).json(err);
        }
    } else {
        res.status(404).end();
    }

});

//logging out of a currently active account
router.post('/logout', (req, res) => {
    try {
        if (req.session.user) {
            req.session.destroy(() => res.status(204).end());
        } else {
            res.status(404).end();
        }
    }  catch (err) {
        console.log('======\n' + err + '\n======');
        res.status(500).json(err);
    }
});

module.exports = router;
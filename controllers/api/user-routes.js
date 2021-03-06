const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User, Garden } = require('../../models');
const withAuth = require('../../utils/auth');

//Get route for getting all users
// router.get('/', async (req, res) => {
//     try {
//         const allUsers = await User.findAll({
//             include: [Garden]
//         })
//         res.status(200).json(allUsers);
//     } catch (err) {
//         console.log('======\n' + err + '\n======');
//         res.status(500).json(err);
//     }
// })

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
    } catch (err) {
        console.log('======\n' + err + '\n======');
        res.status(500).json(err);
    }
});

//editing an existing user
router.put('/:id', withAuth, async (req, res)=>{
    if(req.session.user && req.session.user.id == req.params.id) {
        try {
            const updateUser = await User.update(req.body, { individualHooks: true, where: { id: req.session.user.id }});
            
            if (!updateUser) {
                return res.status(404).json({message: "No user with that id"});
            }

            const updatedUser = await User.findByPk(req.session.user.id);

            req.session.user = {
                id: updatedUser.id,
                username: updatedUser.username,
                email: updatedUser.email
            };

            res.status(200).json(updateUser);
        } catch (err) {
            console.log('======\n' + err + '\n======');
            res.status(500).json(err);
        }
    } else {
        res.status(404).json({message: "not found!"})
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
    if (req.session.user) {
        try {
            req.session.destroy(() => res.status(204).end());

        }  catch (err) {
            console.log('======\n' + err + '\n======');
            res.status(500).json(err);
        }
    } else {
        res.status(404).end();
    }
});

//delete existing user's account
router.delete('/:id', async (req, res) => {
    //Prevents a user from making a delete request if not logged in to the account to be deleted
    if (req.session.user && req.session.user.id == req.params.id) {
        try {
            const deleteUser = await User.destroy({
                where: {
                    id: req.params.id,
                }
            });

            if (!deleteUser) {
                return res.status(404).json({message: "No user with that id"});
            }
            req.session.destroy(() => res.status(204).end());
            res.status(200).json(deleteUser);
        } catch (err) {
            console.log('======\n' + err + '\n======');
            res.status(500).json(err);
        }
    } else {
        res.status(404).end();
    }
});

module.exports = router;
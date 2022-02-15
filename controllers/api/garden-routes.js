const router = require('express').Router();
const { Garden, Plant } = require('../../models');

//Get all gardens
router.get('/', async (req, res) => {
    try {
        const allGardens = await Garden.findAll({
            include: [Plant]
        })
        res.status(200).json(allGardens);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Get a specific garden by id
router.get('/:id', async (req, res) => {
    try {
        const gardenData = await Garden.findByPk(req.params.id, {
            include: [Plant]
        });
    
        if (!gardenData) {
          return res.status(404).json({ message: 'No garden found with that id!'});
        }
        res.status(200).json(gardenData);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Post request for creating a new garden
router.post('/', async (req, res) => {
    /* req.body should look like this...
      {
        title: "garden title",
        decription: "garden description", (optional)
        shape: "circle",
        length: 1,
        width: 1,
        sunLevel: "full",
        // plantIds: [1, 2, 3, 4]
        plantsToAdd: [[1, 2], [2, 2], [3, 3],  [4, 1]]
        //The first entry is the id of the plant; the second is the number of that plant to add to the garden
      }
    */
    //prevents a user from posting a garden if not logged in
    if (req.session.user) {
        try {
            const newGarden = await Garden.create({
                title: req.body.title,
                description: req.body.description,
                shape: req.body.shape,
                length: req.body.length,
                width: req.body.width,
                sunLevel: req.body.sunLevel,
                UserId: req.session.user.id
            });
            //Setting the many-to-many connections with plants in the plants table
            // newGarden.setPlants(req.body.plantIds);
            // const garden = newGarden.get({plain: true});
            for (let plant of req.body.plantsToAdd) {
                newGarden.addPlant(plant[0], { through: { numberOfPlants: plant[1] }});
            }
            // TODO: ask Joe why this isn't accessible on the frontend when making a fetch request to this post route
            res.status(200).json(newGarden);
            // res.status(200).render('garden', garden)
        } catch (err) {
            console.log('======\n' + err + '\n======');
            res.status(500).json(err);
        }
    } else {
        res.status(404).end();
    }
});

//Put request for updating an existing garden with a specific id
router.put('/:id', async (req, res) => {
    /* req.body should look like this...
      {
        title: "garden title",
        decription: "garden description", (optional)
        shape: "circle",
        length: 1,
        width: 1,
        sunLevel: "full",
        // plantIds: [1, 2, 3, 4]
        plantsToAdd: [[1, 2], [2, 2], [3, 3], [4, 1]]
        //The first entry is the id of the plant; the second is the number of that plant to add to the garden
      }
    */
    //Prevents a user from making a put request if not logged in
    if (req.session.user) {
        try {
            //Prevents a user from making a put request to gardens that don't belong to them
            const updateGarden = await Garden.update(
                {
                    title: req.body.title,
                    description: req.body.description,
                    shape: req.body.shape,
                    length: req.body.length,
                    width: req.body.width,
                    sunLevel: req.body.sunLevel
                }, 
                {
                    where: {
                        id: req.params.id,
                        UserId: req.session.user.id
                }
                }
            );

            if (!updateGarden[0]) {
                return res.status(404).json({message: "No garden with that id is associated with this user"});
            }
            const gardenToUpdate = await Garden.findByPk(req.params.id, {include: [Plant] });
            // Setting the many-to-many connections with plants in the plants table
            // gardenToUpdate.setPlants(req.body.plantIds);
            // This is a janky thing I'm doing, but I can't think of a better way to do it
            // Removing all plants from this garden
            if (gardenToUpdate.Plants.length > 0) {
                let removeArray = [];
                for (let plant of gardenToUpdate.Plants) {
                    removeArray.push(plant.id);
                }
                gardenToUpdate.removePlants(removeArray);
            }
            // then adding the new ones in (along with their number in this garden)
            console.log(req.body.plantsToAdd);
            for (let plant of req.body.plantsToAdd) {
                gardenToUpdate.addPlant(plant[0], { through: { numberOfPlants: plant[1] }});
            }
            
            res.status(200).json(gardenToUpdate);
        } catch (err) {
            console.log('======\n' + err + '\n======');
            res.status(500).json(err);
        }
    } else {
        res.status(404).end();
    }
});

//Delete route for removing an id
router.delete('/:id', async (req, res) => {
    //Prevents a user from making a delete request if not logged in
    if (req.session.user) {
        try {
            //Prevents a user from making a delete request to gardens that don't belong to them
            const deleteGarden = await Garden.destroy({
                where: {
                    id: req.params.id,
                    UserId: req.session.user.id
                }
            });

            if (!deleteGarden) {
                return res.status(404).json({message: "No garden with that id is associated with this user"});
            }

            res.status(200).json(deleteGarden);
        } catch (err) {
            console.log('======\n' + err + '\n======');
            res.status(500).json(err);
        }
    } else {
        res.status(404).end();
    }
});


module.exports = router;
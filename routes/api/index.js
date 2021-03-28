const router = require('express').Router();
const homepageRoutes = require('./homepageRoutes');


router.use('/homepageRoutes', homepageRoutes);


module.exports = router;




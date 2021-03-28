const router = require("express").Router();
const userRoutes = require("./userRoutes");
const horoscopeRoutes = require("./horoscopeRoutes");

router.use("/users", userRoutes);
// router.use("/horoscopes", horoscopeRoutes);
// router.use("/sign", signRoutes);



module.exports = router;

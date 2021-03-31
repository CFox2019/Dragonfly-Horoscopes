const router = require("express").Router();
const { User } = require("../models");
const withAuth = require("../utils/auth");
const fetch = require("node-fetch");

router.get("/", async (req, res) => {
  try {
    res.render("homepage", {
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get("/profile", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
    });
    const user = userData.get({ plain: true });

    // 1) Call the /api/horoscopes/:date endpoint to get the horoscope
    const date = new Date();
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = date.getDate();
    const horoscopeResponse = await fetch(`http://localhost:3001/api/users/${req.session.user_id}/horoscopes/${year}-${month}-${day}`);
    const { horoscope } = await horoscopeResponse.json();

    res.render("profile", {
      ...user,
      // 2) Pass the horoscope description to the view with "description: horoscope"
      description: horoscope,
      logged_in: true,
    });
  } catch (err) {
    console.log('err', err);
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }

  res.render("login");
});

module.exports = router;

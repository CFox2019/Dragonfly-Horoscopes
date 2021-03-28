const router = require('express').Router();
const { Project, User } = require("../models");
const withAuth = require("../utils/auth");


router.get("/", async (req, res) => {
  try {
    res.render("homepage", {
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// using authorization tool to prevent access to route
router.get("/profile", withAuth, async (req, res) => {
  try {
  
    // use primary key to find the logged in user
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
    });

    const user = userData.get({ plain: true });

    res.render("profile", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get("/login", (req, res) => {
  // make sure user is already logged in then send them to another route
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }

  res.render("login");
});


module.exports = router;

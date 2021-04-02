const router = require('express').Router();
const { User } = require('../../models');
const userHoroscopeHandler = require("./userHoroscopesHandler");

router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = userData.checkPassword(req.body.password);
    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    console.log('userData', userData);
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// https://domain.com/api/users/123/horoscopes/2020-03-27
router.get('/:id/horoscopes/:date', async (req, res) => {
  try {
    const horoscope = await userHoroscopeHandler(req.params.id, req.params.date);
    if (horoscope) {
      res.json(horoscope)
    } else {
      res
        .status(400)
        .json({ message: 'No horoscope available for given date. Please try again later.' });
    }
  } catch (err) {
    console.log('err', err);
    res.status(400).json(err);
  }
});

module.exports = router;

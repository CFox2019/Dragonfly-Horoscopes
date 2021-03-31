const router = require('express').Router();
const { User, Horoscope } = require('../../models');
const fetch = require("node-fetch");

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
    console.log('req.params.date', req.params.date);
    const date = new Date(req.params.date);
    console.log('date', date);

    // 1. Read the horosocopes table to see if we have a record matching the date passed in the url
    console.log('req.params.id', req.params.id);
    const { sign } = await User.findByPk(req.params.id)
    const existingHoroscope = await Horoscope.findOne({
      where: {
        user_id: req.params.id,
        date
      }
    });

    if (existingHoroscope) {
      // 2. if we do, send back that record
      res.json(existingHoroscope)
    } else {
      // 3. if we do NOT, call the rapidapi endpoint to go get that horoscope data
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate() + 1;
      const response = await fetch(`https://horoscope5.p.rapidapi.com/general/daily?sign=${sign.toLowerCase()}&date=${year}-${month}-${day}`, {
        "method": "GET",
        "headers": {
          "x-rapidapi-key": "943065a783msh88656ce48d8ab8bp1c60dbjsn72e4fa775bb4",
          "x-rapidapi-host": "horoscope5.p.rapidapi.com"
        }
      });

      const { result: { description } } = await response.json()
      if (description.length === 0) {
        return res
          .status(400)
          .json({ message: 'No horoscope available for given date. Please try again later.' });
      }

      // 3a. Use the api response to create a NEW Horoscope record
      const horoscope = await Horoscope.create({
        user_id: req.params.id,
        horoscope: description,
        date
      });

      // 3b. Send back the NEW record
      res.json(horoscope);
    }
  } catch (err) {
    console.log('err', err);
    res.status(400).json(err);
  }
});

module.exports = router;

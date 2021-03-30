const fetch = require('node-fetch');
const router = require('express').Router();
const { Horoscope, User } = require('../../models');
const getHoroscopes = require('../../utils/getHoroscope');

// https://domain.com/api/horoscopes/2020-03-27
router.get('/:date', async (req, res) => {
    try {
      const date = new Date(req.params.date)

      // 1. Read the horosocopes table to see if we have a record matching the date passed in the url
      const { sign } = await User.findByPk(req.session.user_id)
      const existingHoroscope = await Horoscope.findOne({
        where: {
          user_id: req.session.user_id,
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
        })

        const { result: { description } } = await response.json()
        if (description.length === 0) {
          return res
            .status(400)
            .json({ message: 'No horoscope available for given date. Please try again later.' });
        }

        // 3a. Use the api response to create a NEW Horoscope record
        const horoscope = await Horoscope.create({
          user_id: req.session.user_id,
          horoscope: description,
          date
        });

        // 3b. Send back the NEW record
        res.json(horoscope)
      }
    } catch (err) {
      console.log('err', err);
      res.status(400).json(err);
    }
  })

router.get('/:signId/:date', async (req, res) => {
    const signId = req.params.signId;
    const date = req.params.date;

    //1. Read the horosocopes table ( where sign_id = signId AND date=date ) to see if we have a record matching the sign and date passed in the url
    //2. if we do, send back that record
    //3. if we do NOT, call our function to go get that horoscope data
    //  3a. Use the api response from our function to create a NEW horoscope record (using the sign and date passed in url)
    //  3b. Send back the NEW record


    try {
        const dailyData = await Horoscope.findOne({
         include: { User, Sign},
            where: {
                sign_id: req.body.id,
                date: req.body.date,
            }
        },
            res.send(dailyData),
            console.log(dailyData),

        );
        if (!dailyData) {
            // creating new Horoscope
            const newHoroscope = getHoroscopes(sign, date);

            const horoscopeEntry = new type(newHoroscope);

            res.send(horoscopeEntry);
            res.send(data.date)
            res.send(data.sign)
            }
            // const newDaily = newHoroscope
                // .then(newHoroscope)
                //     res.send(data.date)
                //     res.send(data.sign)
         } catch (err) {
        res.status(400).json(err);
    }
  }
);

module.exports = router;


const router = require('express').Router();
const { Horoscope, User } = require('../../models');
const getHoroscopes = require('../../utils/getHoroscope');


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


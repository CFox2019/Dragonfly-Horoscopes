const fetch = require("node-fetch");
const { User, Horoscope } = require("../../models")

const userHoroscopeHandler = async (userId, dateString) => {
  const date = new Date(dateString);
  console.log('date', date);

  // 1. Read the horosocopes table to see if we have a record matching the date passed in the url
  const { sign } = await User.findByPk(userId)
  const existingHoroscope = await Horoscope.findOne({
    where: {
      user_id: userId,
      date
    }
  });

  if (existingHoroscope) {
    // 2. if we do, send back that record
    return existingHoroscope
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
      throw new Error('No horoscope available for given date. Please try again later.')
    }

    // 3a. Use the api response to create a NEW Horoscope record
    const horoscope = await Horoscope.create({
      user_id: userId,
      horoscope: description,
      date
    });

    // 3b. Send back the NEW record
    return horoscope;
  }
}

module.exports = userHoroscopeHandler;
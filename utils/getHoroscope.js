const fetch = require('node-fetch');
require('dotenv').config();

const getHoroscopes = async (sign, date) => {
    try {
        const response = await fetch(`https://horoscope5.p.rapidapi.com/general/daily?sign=${sign}&date=${date}`, {
            method: "GET",
            headers: {
                "x-rapidapi-key": process.env.HOROSCOPE_KEY,
                "x-rapidapi-host": "horoscope5.p.rapidapi.com"
            }
        })
        const dailyData = await response.json();
        return dailyData;
    } catch (e) {
        console.log(e);
        return e;
    }
}

module.exports = getHoroscopes;
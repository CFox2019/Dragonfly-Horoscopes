const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' }
    });

    console.log('response', await response.json());

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace('/profile');
    } else {
      alert(response.statusText);
    }
  }
};

const picker = datepicker('#birthday');

const signupFormHandler = async (event) => {
  event.preventDefault();

  const firstName = document.querySelector('#first-name-signup').value.trim();
  const lastName = document.querySelector('#last-name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const birthday = picker.dateSelected;
  const userSign = getUserSign(birthday);
  const password = document.querySelector('#password-signup').value.trim();

  if (firstName && lastName && email && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      // once working with date picker, add birthday back
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        sign: userSign,
        email,
        password
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert(response.statusText);
    }
  }
};

/**
 * Zodiac signs by month/day:
 * Aries (March 21 - April 19)
 * Taurus (April 20 - May 20)
 * Gemini (May 21 - June 20)
 * Cancer (June 21 - July 22)
 * Leo (July 23 - August 22)
 * Virgo (August 23 - September 22)
 * Libra (September 23 - October 22)
 * Scorpio (October 23 - November 21)
 * Sagittarius (November 22 - December 21)
 * Capricorn (December 22 - January 19)
 * Aquarius (January 20 - February 18)
 * Pisces (February 19 - March 20)
 */
const getUserSign = (birthday) => {
  // const month = birthday.getMonth();
  // const day = birthday.getDate();

  const ariesStart = Date.parse(`${birthday.getFullYear()}-03-21`);
  const ariesEnd = Date.parse(`${birthday.getFullYear()}-04-19`);

  const taurusStart = Date.parse(`${birthday.getFullYear()}-04-20`);
  const taurusEnd = Date.parse(`${birthday.getFullYear()}-05-20`);

  const geminiStart = Date.parse(`${birthday.getFullYear()}-05-21`);
  const geminiEnd = Date.parse(`${birthday.getFullYear()}-06-20`);

  const cancerStart = Date.parse(`${birthday.getFullYear()}-06-21`);
  const cancerEnd = Date.parse(`${birthday.getFullYear()}-07-22`);

  const leoStart = Date.parse(`${birthday.getFullYear()}-07-23`);
  const leoEnd = Date.parse(`${birthday.getFullYear()}-08-22`);

  const virgoStart = Date.parse(`${birthday.getFullYear()}-08-23`);
  const virgoEnd = Date.parse(`${birthday.getFullYear()}-09-22`);

  const libraStart = Date.parse(`${birthday.getFullYear()}-09-23`);
  const libraEnd = Date.parse(`${birthday.getFullYear()}-10-22`);

  const scorpioStart = Date.parse(`${birthday.getFullYear()}-10-23`);
  const scorpioEnd = Date.parse(`${birthday.getFullYear()}-11-21`);

  const sagittariusStart = Date.parse(`${birthday.getFullYear()}-11-22`);
  const sagittariusEnd = Date.parse(`${birthday.getFullYear()}-12-21`);

  const capricornStart = Date.parse(`${birthday.getFullYear()}-12-22`);
  const capricornEnd = Date.parse(`${birthday.getFullYear()}-01-19`);

  const aquariusStart = Date.parse(`${birthday.getFullYear()}-01-20`);
  const aquariusEnd = Date.parse(`${birthday.getFullYear()}-02-18`);

  const piscesStart = Date.parse(`${birthday.getFullYear()}-02-19`);
  const piscesEnd = Date.parse(`${birthday.getFullYear()}-03-20`);

  if (birthday >= ariesStart && birthday <= ariesEnd) {
    console.log("Aries");
    return 'Aries'
  } else if (birthday >= taurusStart && birthday <= taurusEnd)  {
    console.log("Taurus");
    return 'Taurus'
  } else if (birthday >= geminiStart && birthday <= geminiEnd)  {
    console.log("Gemini");
    return 'Gemini'
  } else if (birthday >= cancerStart && birthday <= cancerEnd)  {
    console.log("Cancer");
    return 'Cancer'
  } else if (birthday >= leoStart && birthday <= leoEnd)  {
    console.log("Leo");
    return 'Leo'
  } else if (birthday >= virgoStart && birthday <= virgoEnd)  {
    console.log("Virgo");
    return 'Virgo'
  } else if (birthday >= libraStart && birthday <= libraEnd)  {
    console.log("Libra");
    return 'Libra'
  } else if (birthday >= scorpioStart && birthday <= scorpioEnd)  {
    console.log("Scorpio");
    return 'Scorpio'
  } else if (birthday >= sagittariusStart && birthday <= sagittariusEnd)  {
    console.log("Sagittarius");
    return 'Sagittarius'
  } else if (birthday >= capricornStart && birthday <= capricornEnd)  {
    console.log("Capricorn");
    return 'Capricorn'
  } else if (birthday >= aquariusStart && birthday <= aquariusEnd)  {
    console.log("Aquarius");
    return 'Aquarius'
  } else if (birthday >= piscesStart && birthday <= piscesEnd)  {
    console.log("Pisces");
    return 'Pisces'
  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);

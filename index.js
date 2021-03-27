const userInfo 

const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://horoscope5.p.rapidapi.com/career/daily?sign=cancer&date=2020-05-02",
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "943065a783msh88656ce48d8ab8bp1c60dbjsn72e4fa775bb4",
		"x-rapidapi-host": "horoscope5.p.rapidapi.com"
	}
};

$.ajax(settings).done(function (response) {
    
	console.log(response);
});

// second option


fetch("https://horoscope5.p.rapidapi.com/career/daily?sign=cancer&date=2020-04-02", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "943065a783msh88656ce48d8ab8bp1c60dbjsn72e4fa775bb4",
		"x-rapidapi-host": "horoscope5.p.rapidapi.com"
	}
})
.then(response => {
	console.log(response);
    
})
.catch(err => {
	console.error(err);
});
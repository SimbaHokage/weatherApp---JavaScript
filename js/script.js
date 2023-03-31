const input = document.querySelector('input');
const button = document.querySelector('button');
const cityName = document.querySelector('.city-name');
const warning = document.querySelector('.warning');
const photo = document.querySelector('.photo');
const weather = document.querySelector('.weather');
const temperature = document.querySelector('.temperature');
const humidity = document.querySelector('.humidity');

const API_LINK = 'https://api.openweathermap.org/data/2.5/weather?q=';
const API_KEY = '&appid=3225858da0110a0db5ba21d45047b9fd';
const API_UNITS = '&units=metric';

const getWeather = () => {
	const city = input.value || 'Krakow';
	const URL = API_LINK + city + API_KEY + API_UNITS;

	fetch(
		'https://api.openweathermap.org/data/2.5/weather?q=' +
			city +
			'&appid=3225858da0110a0db5ba21d45047b9fd&units=metric'
	)
		.then((res) => res.json())
		.then((data) => {
			const temp = data.main.temp;
			const hum = data.main.humidity;
			const status = Object.assign({}, ...data.weather);

			cityName.textContent = data.name;
			temperature.textContent = Math.round(temp) + '℃';
			humidity.textContent = hum + '%';
			weather.textContent = status.main;

			warning.textContent = ''
			input.value = ''

			if (status.id >= 200 && status.id < 300) {
				photo.setAttribute('src', './img/thunderstorm.png');
			} else if (status.id >= 300 && status.id < 400) {
				photo.setAttribute('src', './img/drizzle.png');
			} else if (status.id >= 500 && status.id < 600) {
				photo.setAttribute('src', './img/rain.png');
			} else if (status.id >= 600 && status.id < 700) {
				photo.setAttribute('src', './img/snow.png');
			} else if (status.id >= 700 && status.id < 800) {
				photo.setAttribute('src', './img/fog.png');
			} else if (status.id == 800) {
				photo.setAttribute('src', './img/sun.png');
			} else if (status.id > 800 && status.id < 900) {
				photo.setAttribute('src', './img/cloud.png');
			}
		})
		.catch(() => (warning.textContent = 'Wpisz poprawną nazwę miasta!'));
};

const enterKeyCheck = e => {
    if(e.key === 'Enter'){
        getWeather()
    }
}


button.addEventListener('click', getWeather);
input.addEventListener('keyup', enterKeyCheck)
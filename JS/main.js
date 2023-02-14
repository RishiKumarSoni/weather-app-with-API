const apiKey = "1ab7ebc2c0e5442b9ae145817231101";
const domain = 'https://api.weatherapi.com/v1/';

let searchRef = document.getElementById('search');
let cityRef = document.getElementById('city');
let timeRef = document.getElementById('time');
let weatherRef = document.getElementById('weather');
let iconRef = document.getElementById('icon');
let tempRef = document.getElementById('temp');

let tblockRef = document.getElementById('tblock');
let ticonRef = document.getElementById('ticon');
let ttempRef = document.getElementById('ttemp');
let ttimeRef = document.getElementById('ttime');

searchRef.addEventListener('change', weatherInfo);

// https://api.weatherapi.com/v1/forecast.json?key=1ab7ebc2c0e5442b9ae145817231101&q=London&days=1&aqi=no&alerts=no


function weatherInfo() {
    console.log("hello");

    let searchVal = 'noida';
    if (searchRef && searchRef.value) {
        searchVal = searchRef?.value;
    }

    fetch(`${domain}forecast.json?key=${apiKey}&q=${searchVal}&days=1&aqi=no&alerts=no`)

    .then((response) => response.json())

    .then((data) => {updateUI(data);});
}

weatherInfo();

function updateUI(data) {
    let weatherLocation = data.location;
    let currentWeather = data.current;

    cityRef.innerHTML = weatherLocation.name;
    timeRef.innerHTML = weatherLocation.localtime.split(' ')[1];

    weatherRef.innerHTML = currentWeather.condition.text;
    iconRef.innerHTML = `<img src="https:${currentWeather.condition.icon}" alt="weather-icon" />`;
    tempRef.innerHTML = currentWeather.temp_c + '°C';

    updateForecast(data.forecast);
}

function updateForecast(data) {
    tblockRef.innerHTML = '';

    data.forecastday[0].hour.forEach((elem) => {
        let time = elem.time.split(' ')[1];

        tblockRef.innerHTML += `
        <div id="tinfo">
            <img src="${elem.condition.icon}" alt="icon" id="ticon">
            <h1 id="ttemp">${elem.temp_c}</h1>
            <p id="ttime">${time}</p>
        </div>`
    });

}
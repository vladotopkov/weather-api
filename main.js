
const weatherInfo = document.querySelector('#weather-info');
const inputCity = document.querySelector('#city-input');
const searchButton = document.querySelector('#search-btn');
const cityNameHeader = document.querySelector('#city-name');
const temperature = document.querySelector('#temperature');
const description = document.querySelector('#description');
const windSpeed = document.querySelector('#wind'); 

const tempTypeToggle = document.querySelector('#unit-select');
let tempType = tempTypeToggle.value;

let city = 'Brest';
let apiKey = '42f1d4434b4a8757c1e9e679efd2dd35';
let myData;


setTimeout(() => showFirst(), 100); //previev page


searchButton.addEventListener('click', () => {
    
    setTimeout(() => getWeatherData(), 100);
});


function getWeatherData() {
    getCityName();
    getTempType();

    const unitParam = tempType === 'c' ? 'metric' : 'imperial';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unitParam}`;

    fetch(url)
        .then(res => {
            if (!res.ok) {
                throw new Error("City not found or API error.");
            }
            return res.json();
        })
        .then(data => {
            myData = data;
            parseData();
            weatherInfo.classList.remove('hidden');
            document.getElementById('error-message').classList.add('hidden');
        })
        .catch(error => {
            console.error(error.message);
            weatherInfo.classList.add('hidden');
            document.getElementById('error-message').classList.remove('hidden');
        });
}


function getCityName(){
    city = inputCity.value;
}

function getTempType() {
    tempType = tempTypeToggle.value;
}

function parseData() {
    console.log(myData);
        temperature.innerHTML = `${myData.main.temp} ${tempType === 'c' ? '°C' : '°F'}`;
        description.innerHTML = myData.weather[0].description;
        cityNameHeader.innerHTML = myData.name;
        windSpeed.innerHTML = `${myData.wind.speed} ${tempType === 'c' ? 'm/s' : 'miles/hour'}`;
}

function showFirst(){
    searchButton.click();
}



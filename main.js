
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
    getCityName();
    getTempType();
    if(tempType === 'c'){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(res => res.json())
    .then(data => {
        myData = data;
        parseData();
    });
    }else {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`)
        .then(res => res.json())
        .then(data => {
            myData = data;
            parseData();
        });
    }
    setTimeout(() => weatherInfo.classList.remove('hidden'), 100);
});


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
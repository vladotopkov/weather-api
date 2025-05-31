

const inputCity = document.querySelector('#city-input');
const searchButton = document.querySelector('#search-btn');
const cityNameHeader = document.querySelector('#city-name');
const temperature = document.querySelector('#temperature');
const description = document.querySelector('#description');



let city = "Brest";
let apiKey = '42f1d4434b4a8757c1e9e679efd2dd35';



searchButton.addEventListener('click', () => {
    getCityName();
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        temperature.innerHTML = data.main.temp;
        description.innerHTML = data.weather[0].description;
        cityNameHeader.innerHTML = data.name;
    });
});


function getCityName(){
    city = inputCity.value;
}
let input = document.getElementById('cityname');
let searchbtn = document.getElementById('searchbtn');
let cityNameElement = document.getElementById('city');
let temp = document.getElementById('temp');
let description = document.getElementById('description');
let humidity = document.getElementById('humidity');
let wind = document.getElementById('wind');
let weatherIcon = document.getElementById('weather-icon');


const apicall = async (cityName) => {
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=3ba0e5eedae49070b51c85ad8c30def0&units=metric`;

    try {
        const response = await fetch(api);

        if (!response.ok) {
            cityNameElement.textContent = 'Location not found';
            clearWeatherData();
            return;
        }

        const data = await response.json();

        cityNameElement.textContent = `Weather in ${data.name}`;
        temp.textContent = `${data.main.temp}°C`;
        description.textContent = data.weather[0].description;
        humidity.textContent = `Humidity: ${data.main.humidity}%`;
        wind.textContent = `Wind Speed: ${data.wind.speed} km/h`;

        const iconCode = data.weather[0].icon;
        const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;
        weatherIcon.src = iconUrl;

    } catch (error) {
        console.error('Error fetching data:', error);
        cityNameElement.textContent = 'Error fetching weather data';
        clearWeatherData();
    }
};

const clearWeatherData = () => {
    temp.textContent = '';
    description.textContent = '';
    humidity.textContent = '';
    wind.textContent = '';
    weatherIcon.src = '';
};

searchbtn.addEventListener('click', () => {
    const cityname = input.value.trim(); 
    if (cityname === '') {
        alert('Please enter a city name');
        return;
    }
    apicall(cityname);
    input.value = '';
    input.focus();
});

input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {  // Check if the pressed key is Enter
        const cityname = input.value.trim();
        if (cityname === '') {
            alert('Please enter a city name');
            return;
        }
        apicall(cityname);
        input.value = '';
        input.focus();
    }
});

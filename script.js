
const weatherInfoContainer = document.querySelector(".weather-info-container");
const currentWeatherInfo = document.querySelector(".weather-info");

async function getPlace(cityName = "patrocínio do muriaé") {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}`;
    const response = await fetch(url);
    const data = await response.json();

    return data.results[0];
}

async function getWeatherInfo(setPlace) {
    const place = await getPlace("patrocínio do muriaé");

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min&hourly=temperature_2m,weather_code&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,precipitation,wind_speed_10m&timezone=auto`

    const response = await fetch(url);

    const data = await response.json();

    console.log(data)

    return data;
}

// getWeather()

// Left Content

// Weather Info Container

// Location Info

// Functions

async function getLocation(locationInfo) {

    const location = document.createElement("h3");
    location.classList.add("location");

    const cityName = await getPlace();
    location.textContent = cityName.name;

    locationInfo.appendChild(location);
}

async function getDate(locationInfo) {
    const currentDate = document.createElement("span");
    currentDate.classList.add("date")

    const date = await getWeatherInfo();
    currentDate.textContent = date.current.time;

    locationInfo.appendChild(currentDate);
}

async function setCurrentWeatherLocation() {
    const locationInfo = document.createElement("div");
    locationInfo.classList.add("location-info");

    // Location
    await getLocation(locationInfo);

    // Date
    await getDate(locationInfo)

    currentWeatherInfo.appendChild(locationInfo);
    weatherInfoContainer.appendChild(currentWeatherInfo);
}

setCurrentWeatherLocation();

// Logic




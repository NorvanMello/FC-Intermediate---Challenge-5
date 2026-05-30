
import { getWeatherInfo } from "./weatherAPI.js"
import {
    renderLocation,
    renderDate,
    renderWeatherIcon,
    renderTemperature
} from "./currentWeather.js"

const weatherInfoContainer = document.querySelector(".weather-info-container");
const currentWeatherInfo = document.querySelector(".weather-info");

//API

// Left Content

// Weather Info Container

// Location Info

// Functions


async function init() {
    const weatherInfo = await getWeatherInfo("manaus");

    const locationInfo = document.createElement("div");
    locationInfo.classList.add("location-info");

    // Location
    renderLocation(locationInfo, weatherInfo);

    // Date
    renderDate(locationInfo, weatherInfo);

    currentWeatherInfo.appendChild(locationInfo);

    const temperatureContainer = document.createElement("div");
    temperatureContainer.classList.add("temperature-container");

    //Icon
    renderWeatherIcon(temperatureContainer, weatherInfo);

    //Temperature
    renderTemperature(temperatureContainer, weatherInfo);

    currentWeatherInfo.appendChild(temperatureContainer);
    weatherInfoContainer.appendChild(currentWeatherInfo);

    //Daily Forecast
    
}

init();

// Logic

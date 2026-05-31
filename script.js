
import { getWeatherInfo } from "./weatherAPI.js"
import {
    renderLocation,
    renderDate,
    renderWeatherIcon,
    renderTemperature,
    renderCurrentWeatherDetails,
    renderDailyForecast
} from "./currentWeather.js"

const currentWeatherInfo = document.querySelector(".weather-info");
const currentWeatherDetails = document.querySelector(".weather-details-container");
const dailyList = document.querySelector(".daily-list");

//API

// Left Content

// Weather Info Container

// Location Info

// Functions


async function init() {
    const weatherInfo = await getWeatherInfo("patrocinio do muriae");

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

    //Weather Details
    renderCurrentWeatherDetails(currentWeatherDetails, weatherInfo);

    //Daily Forecast
    renderDailyForecast(dailyList, weatherInfo);

}

init();

// Logic

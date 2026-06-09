
import { getWeatherInfo } from "./weatherAPI.js"
import {
    renderLocation,
    renderDate,
    renderWeatherIcon,
    renderTemperature,
    renderCurrentWeatherDetails,
    renderDailyForecast,
    renderHourlyForecast
} from "./currentWeather.js"
import { hourlyForecastEvent } from "./hourlyForecastEvents.js";
import { unitSwticherEvent } from "./unitsunitsSwitcher.js"

const currentWeatherInfo = document.querySelector(".weather-info");
const currentWeatherDetails = document.querySelector(".weather-details-container");
const dailyList = document.querySelector(".daily-list");
const hourlyList = document.querySelector(".hourly-list");

//Buttons
//Unit Switcher Btn
const settingsBtn = document.querySelector(".settings-btn");
const unitsDropdown = document.querySelector(".units-dropdown");
const unit = document.querySelectorAll(".unit")

//Hourly Foracast
const hourlyDayBtn = document.querySelector(".hourly-day-btn");
const hourlyDaysContainer = document.querySelector(".hourly-days-container");
// const weekDropdown = document.querySelector(".weekday-dropdown");
const weekdayBtn = document.querySelectorAll(".weekday-btn")
const dayBtn = document.querySelector(".day-btn")

async function init() {
    const weatherInfo = await getWeatherInfo("patrocínio do muriaé");
    console.log(weatherInfo)

    const locationInfo = document.createElement("div");
    locationInfo.classList.add("location-info");

    // Location
    renderLocation(locationInfo, weatherInfo);

    // Date
    renderDate(locationInfo, weatherInfo);

    currentWeatherInfo.appendChild(locationInfo);

    const temperatureContainer = document.createElement("div");
    temperatureContainer.classList.add("temperature-container");

    /* =========================
     Render
    ========================= */
    //Icon
    renderWeatherIcon(temperatureContainer, weatherInfo);

    //Temperature
    renderTemperature(temperatureContainer, weatherInfo);

    currentWeatherInfo.appendChild(temperatureContainer);

    //Weather Details
    renderCurrentWeatherDetails(currentWeatherDetails, weatherInfo);

    //Daily Forecast
    renderDailyForecast(dailyList, weatherInfo);

    //Hourly Forecast
    renderHourlyForecast(hourlyList, weatherInfo);

    /* =========================
     Events
    ========================= */
    //Units Btn
    unitSwticherEvent(settingsBtn,unitsDropdown, unit, temperatureContainer, currentWeatherDetails);

    //Hourly Foracast
    hourlyForecastEvent(hourlyDayBtn, hourlyDaysContainer, weekdayBtn, dayBtn, hourlyList, weatherInfo);
}

init();

// Logic

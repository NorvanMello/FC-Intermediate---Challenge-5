import { weatherIconMap, weatherDescriptionMap } from "./weatherMaps.js";
import { formatWeatherDate } from "./formatDate.js";

export function renderLocation(locationInfo, weatherInfo) {

    const location = document.createElement("h3");
    location.classList.add("location");

    const cityCountryName = weatherInfo;
    location.textContent = `${cityCountryName.place.name}, ${cityCountryName.place.country}`;

    locationInfo.appendChild(location);
}

export function renderDate(locationInfo, weatherInfo) {
    const currentDate = document.createElement("span");
    currentDate.classList.add("date")

    const isoDate = weatherInfo.data.current.time;

    currentDate.textContent = formatWeatherDate(isoDate);

    locationInfo.appendChild(currentDate);
}

export function renderWeatherIcon(temperatureContainer, weatherInfo) {
    const icon = weatherInfo;
    
    

    const img = document.createElement("img")
    img.classList.add("temperature-icon")

    const weatherCode = icon.data.current.weather_code;

    const iconName = weatherIconMap[weatherCode] ?? "icon-error-weather.png";

    const iconFile = `./assets/images/${iconName}`;
    const description = weatherDescriptionMap[weatherCode] ?? "Unknown weather";

    img.setAttribute("src", iconFile)
    img.setAttribute("alt", description)

    temperatureContainer.appendChild(img);
}

export function renderTemperature(temperatureContainer, weatherInfo) {
    const currentTemperature = weatherInfo;

    const temperature = document.createElement("span")
    temperature.classList.add("temperature")

    temperature.textContent = `${Math.round(currentTemperature.data.current.temperature_2m)}°`;

    temperatureContainer.appendChild(temperature);
}

function createCurrentDetailCard({ labelText, valueText }, currentWeatherDetails) {
    const weatherDetails = document.createElement("div");
    weatherDetails.classList.add("weather-details");

    const weatherLabel = document.createElement("dt");
    weatherLabel.classList.add("weather-label");
    weatherLabel.textContent = labelText;

    weatherDetails.appendChild(weatherLabel)

    const weatherValue = document.createElement("dd");
    weatherValue.classList.add("weather-value");
    weatherValue.textContent = valueText;

    weatherDetails.appendChild(weatherValue);

    currentWeatherDetails.appendChild(weatherDetails);
}

export function renderCurrentWeatherDetails(currentWeatherDetails, weatherInfo) {

    const cardValues = [
        { 
            labelText: "Feels like", 
            valueText: `${Math.round(weatherInfo.data.current.apparent_temperature)}${weatherInfo.data.current_units.apparent_temperature}`
        },

        {
            labelText: "Humidity", 
            valueText: `${Math.round(weatherInfo.data.current.relative_humidity_2m)}%`
        },

        {
            labelText: "Wind", 
            valueText: `${weatherInfo.data.current.wind_speed_10m} ${weatherInfo.data.current_units.wind_speed_10m}`
        },

        {
            labelText: "Precipitation", 
            valueText: `${weatherInfo.data.current.precipitation} ${weatherInfo.data.current_units.precipitation}`
        }
    ];

    cardValues.forEach(value => {
        createCurrentDetailCard(value, currentWeatherDetails);
    })
}

function createDailyForecastCard(dailyList, weatherInfo) {
    const day = document.createElement("li");
    day.classList.add("day")

    const weekDay = document.createElement("span")
    weekDay.classList.add("week-day")
    weekDay.textContent = "Tue"

    day.appendChild(weekDay)

    const weatherIcon = document.createElement("img")
    weatherIcon.classList.add("weather-icon")
    weatherIcon.setAttribute("src","./assets/images/icon-rain.webp")
    weatherIcon.setAttribute("alt","Rain")

    day.appendChild(weatherIcon)

    const temperatureRange = document.createElement("span")
    temperatureRange.classList.add("temperature-range")

    const max = document.createElement("span")
    max.classList.add("max")
    max.textContent = "20°"

    temperatureRange.appendChild(max)

    const min = document.createElement("span")
    min.classList.add("min")
    min.textContent = "14°"

    temperatureRange.appendChild(min)
    
    day.appendChild(temperatureRange)

    dailyList.appendChild(day)    
}

export function renderDailyForecast(dailyForecast, weatherInfo) {
   createDailyForecastCard(dailyForecast, weatherInfo)
   createDailyForecastCard(dailyForecast, weatherInfo)
   createDailyForecastCard(dailyForecast, weatherInfo)
}

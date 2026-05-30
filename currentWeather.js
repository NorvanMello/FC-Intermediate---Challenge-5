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

    console.log(currentTemperature.data)

    const temperature = document.createElement("span")
    temperature.classList.add("temperature")

    temperature.textContent = `${Math.round(currentTemperature.data.current.temperature_2m)}°`;

    temperatureContainer.appendChild(temperature);
}
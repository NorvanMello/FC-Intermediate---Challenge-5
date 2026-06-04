import { weatherIconMap, weatherDescriptionMap } from "./weatherMaps.js";
import { formatWeatherDate, shortWeekDay, hourOfDay } from "./formatDate.js";

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

    const img = document.createElement("img")
    img.classList.add("temperature-icon")

    const weatherCode = weatherInfo.data.current.weather_code;

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

function createDailyForecastCard(dailyList, i, { weekday, icon, temMax, temMin }) {
    const day = document.createElement("li");
    day.classList.add("day")

    const weekDay = document.createElement("span")
    weekDay.classList.add("week-day")
    weekDay.textContent = `${shortWeekDay(weekday[i])}`

    day.appendChild(weekDay)

    const weatherIcon = document.createElement("img")
    weatherIcon.classList.add("weather-icon")

    const iconName = weatherIconMap[icon[i]] ?? "icon-error-weather.png";
    const iconFile = `./assets/images/${iconName}`;
    
    const description = weatherDescriptionMap[icon[i]] ?? "Unknown weather";

    weatherIcon.setAttribute("src",`./assets/images/${iconName}`)
    weatherIcon.setAttribute("alt",`${description}`)

    day.appendChild(weatherIcon)

    const temperatureRange = document.createElement("span")
    temperatureRange.classList.add("temperature-range")

    const max = document.createElement("span")
    max.classList.add("max")
    max.textContent = `${Math.round(temMax[i])}`

    temperatureRange.appendChild(max)

    const min = document.createElement("span")
    min.classList.add("min")
    min.textContent = `${Math.round(temMin[i])}`

    temperatureRange.appendChild(min)
    
    day.appendChild(temperatureRange)

    dailyList.appendChild(day)    
}

export function renderDailyForecast(dailyList, weatherInfo) {

    for(let i = 0; i < weatherInfo.data.daily.time.length; i++) {
        createDailyForecastCard(dailyList, i, 
        { 
            weekday: weatherInfo.data.daily.time,
            icon: weatherInfo.data.daily.weather_code,
            temMax: weatherInfo.data.daily.temperature_2m_max,
            temMin: weatherInfo.data.daily.temperature_2m_min 
        })
    }
}

function createHourlyForecastCard(hourlyList, weatherInfo, j) {
     const card = document.createElement("li");
    card.classList.add("card");

    const iconHourWeapper = document.createElement("div");
    iconHourWeapper.classList.add("icon-hour-wrapper");

    const hourlyIcon = document.createElement("img");

    const iconName = weatherIconMap[weatherInfo.data.hourly.weather_code[j]] ?? "icon-error-weather.png";
    const iconFile = `./assets/images/${iconName}`;

    hourlyIcon.setAttribute("src", iconFile)

    iconHourWeapper.appendChild(hourlyIcon);

    const hour = document.createElement("span");
    hour.classList.add("hour");

    hour.textContent = hourOfDay(weatherInfo.data.hourly.time[j]);

    iconHourWeapper.appendChild(hour);
    
    card.appendChild(iconHourWeapper);

    const temperatureHour = document.createElement("span");
    temperatureHour.classList.add("temperature-hour");
    temperatureHour.textContent = `${Math.round(weatherInfo.data.hourly.temperature_2m[j])}${weatherInfo.data.hourly_units.temperature_2m}`

    card.appendChild(temperatureHour);

    hourlyList.appendChild(card)
}

export function renderHourlyForecast(hourlyList, weatherInfo, weekdayChoice) {

    let userChoice = weekdayChoice;

    if(userChoice === undefined) {
        userChoice = "Mon"
    }

    for(let i=0; i < 7; i++) {
        if(userChoice === shortWeekDay(weatherInfo.data.hourly.time[i * 24])) {
            for(let j=i * 24; j < (i*24) + 24; j++) {
                createHourlyForecastCard(hourlyList, weatherInfo, j)
            }
            break;
        }
    }    
}

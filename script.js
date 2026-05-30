
const weatherInfoContainer = document.querySelector(".weather-info-container");
const currentWeatherInfo = document.querySelector(".weather-info");

async function getPlace(cityName) {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}`;
    const response = await fetch(url);
    const data = await response.json();

    return data.results[0];
}

async function getWeatherInfo(setPlace) {
    const place = await getPlace("rio de janeiro");

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min&hourly=temperature_2m,weather_code&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,precipitation,wind_speed_10m&timezone=auto`

    const response = await fetch(url);

    const data = await response.json();

    console.log(data)

    return {
        place,
        data        
    };
}

// getWeather()

// Left Content

// Weather Info Container

// Location Info

// Functions



async function getLocation(locationInfo, weatherInfo) {

    const location = document.createElement("h3");
    location.classList.add("location");

    const cityName = await weatherInfo;
    location.textContent = cityName.place.name;

    locationInfo.appendChild(location);
}

async function getDate(locationInfo, weatherInfo) {
    const currentDate = document.createElement("span");
    currentDate.classList.add("date")

    const date = await weatherInfo;
    const isoDate = date.data.current.time;
    const parsedDate = new Date(isoDate);

    const options = {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric"
    }

    const formattedDate = parsedDate.toLocaleDateString("en-Us", options);

    currentDate.textContent = formattedDate;

    locationInfo.appendChild(currentDate);
}

async function getWeatherIcon(temperatureContainer, weatherInfo) {
    const icon = await weatherInfo;
    
    const weatherIconMap = {
        0: "icon-sunny.webp",

        1: "icon-partly-cloudy.webp",
        2: "icon-partly-cloudy.webp",
        3: "icon-overcast.webp",

        45: "icon-fog.webp",
        48: "icon-fog.webp",

        51: "icon-drizzle.webp",
        53: "icon-drizzle.webp",
        55: "icon-drizzle.webp",
        56: "icon-drizzle.webp",
        57: "icon-drizzle.webp",

        61: "icon-rain.webp",
        63: "icon-rain.webp",
        65: "icon-rain.webp",
        66: "icon-rain.webp",
        67: "icon-rain.webp",

        71: "icon-snow.webp",
        73: "icon-snow.webp",
        75: "icon-snow.webp",
        77: "icon-snow.webp",
        85: "icon-snow.webp",
        86: "icon-snow.webp",

        80: "icon-rain.webp",
        81: "icon-rain.webp",
        82: "icon-storm.webp",

        95: "icon-storm.webp",
        96: "icon-storm.webp",
        99: "icon-storm.webp",
    };

    const img = document.createElement("img")
    img.classList.add("temperature-icon")
    img.setAttribute("src", `./assets/images/${weatherIconMap[icon.data.current.weather_code]}`)

    temperatureContainer.appendChild(img);
}

async function getTemperature(temperatureContainer, weatherInfo) {
    const currentTemperature = await weatherInfo;

    console.log(currentTemperature.data)

    const temperature = document.createElement("span")
    temperature.classList.add("temperature")

    temperature.textContent = `${Math.round(currentTemperature.data.current.temperature_2m)}°`;

    temperatureContainer.appendChild(temperature);
}

async function setCurrentWeatherLocation() {
    const weatherInfo = getWeatherInfo();

    const locationInfo = document.createElement("div");
    locationInfo.classList.add("location-info");

    // Location
    await getLocation(locationInfo, weatherInfo);

    // Date
    await getDate(locationInfo, weatherInfo);

    currentWeatherInfo.appendChild(locationInfo);
    weatherInfoContainer.appendChild(currentWeatherInfo);

    const temperatureContainer = document.createElement("div");
    temperatureContainer.classList.add("temperature-container");

    //Icon
    await getWeatherIcon(temperatureContainer, weatherInfo);

    //Temperature
    await getTemperature(temperatureContainer, weatherInfo);

    currentWeatherInfo.appendChild(temperatureContainer);

}

setCurrentWeatherLocation();

// Logic




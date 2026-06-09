export async function getPlace(cityName) {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}`;
    const response = await fetch(url);
    const data = await response.json();

    return data.results[0];
}

export async function getWeatherInfo(cityName, temperatureUnit = "", windUnit = "", precipitationUnit = "") {
    const place = await getPlace(cityName);

    console.log(temperatureUnit)
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min&hourly=temperature_2m,weather_code&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,precipitation,wind_speed_10m&timezone=auto${temperatureUnit}${windUnit}${precipitationUnit}`
    console.log(url)
    const response = await fetch(url);
    const data = await response.json();

    return {
        place,
        data        
    };
}

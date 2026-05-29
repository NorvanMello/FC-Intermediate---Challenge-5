async function getPlace(cityName) {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}`;

    const response = await fetch(url);

    const data = await response.json();

    return data.results[0];
}



getPlace("patrocínio do muriaé");

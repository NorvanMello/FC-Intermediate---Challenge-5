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

function toggleUnitsContainer(unitsDropdown) {
    unitsDropdown.classList.toggle("hidden");

    if(!unitsDropdown.classList.contains("hidden")) {
        unitsDropdown.removeAttribute("aria-hidden");
        return;
    }
    unitsDropdown.setAttribute("aria-hidden", "true");
}

async function imperialMetricSwticher(metricImperial, temperatureContainer, currentWeatherDetails) {
    if(metricImperial === "Switch to Metric") {
       const weatherInfoMetric = await getWeatherInfo("patrocínio do muriaé", "&temperature_unit=fahrenheit", "&wind_speed_unit=mph", "&precipitation_unit=inch");

        renderTemperature(temperatureContainer, weatherInfoMetric);
        renderCurrentWeatherDetails(currentWeatherDetails, weatherInfoMetric)
    } else {
        const weatherInfoMetric = await getWeatherInfo("patrocínio do muriaé", "");

        renderTemperature(temperatureContainer, weatherInfoMetric);
        renderCurrentWeatherDetails(currentWeatherDetails, weatherInfoMetric)
    }
}

export function unitSwticherEvent(settingsBtn,unitsDropdown, unit, temperatureContainer, currentWeatherDetails) {
    settingsBtn.addEventListener("click", () => {
        toggleUnitsContainer(unitsDropdown);
    })

    unit.forEach(element => {
        console.log(element.dataset.unit)
        if(element.dataset.unit === "metricImpirial") {
            element.addEventListener("click", (e) => {
            e.target.innerText === "Switch to Imperial" ?  e.target.innerText = "Switch to Metric" : e.target.innerText = "Switch to Imperial"

            imperialMetricSwticher(e.target.innerText, temperatureContainer, currentWeatherDetails)
            })
        }

        if(element.dataset.unit === "temperature") {
            element.addEventListener("click", (e) => {
                
            })
        }

    });
}

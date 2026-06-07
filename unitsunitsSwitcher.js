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

async function imperialMetricSwticher(metricImperial, temperatureContainer) {
    if(metricImperial === "Switch to Metric") {
       const weatherInfoMetric = await getWeatherInfo("patrocínio do muriaé", "&temperature_unit=fahrenheit");

        renderTemperature(temperatureContainer, weatherInfoMetric);
    } else {
        const weatherInfoMetric = await getWeatherInfo("patrocínio do muriaé", "");

        renderTemperature(temperatureContainer, weatherInfoMetric);
    }
}

export function unitSwticherEvent(settingsBtn,unitsDropdown, unit, temperatureContainer) {
    settingsBtn.addEventListener("click", () => {
        toggleUnitsContainer(unitsDropdown);
    })

    unit.forEach(element => {
        element.addEventListener("click", (e) => {
            e.target.innerText === "Switch to Imperial" ?  e.target.innerText = "Switch to Metric" : e.target.innerText = "Switch to Imperial"

            imperialMetricSwticher(e.target.innerText, temperatureContainer)
        })
    });
    

}

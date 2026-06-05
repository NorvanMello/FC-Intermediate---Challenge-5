import { getWeatherInfo } from "./weatherAPI.js"

function toggleUnitsContainer(unitsDropdown) {
    unitsDropdown.classList.toggle("hidden");

    if(!unitsDropdown.classList.contains("hidden")) {
        unitsDropdown.removeAttribute("aria-hidden");
        return;
    }
    unitsDropdown.setAttribute("aria-hidden", "true");
}

function imperialMetricSwticher(metricImperial) {
    console.log (metricImperial === "Switch to Imperial")
    if(metricImperial === "Switch to Imperial") {
        getWeatherInfo("patrocinio do muriaé", "&temperature_unit=fahrenheit")
    }
}

export function unitSwticherEvent(settingsBtn,unitsDropdown, unit) {
    settingsBtn.addEventListener("click", () => {
        toggleUnitsContainer(unitsDropdown);
    })

    unit.forEach(element => {
        element.addEventListener("click", (e) => {
            e.target.innerText === "Switch to Imperial" ?  e.target.innerText = "Switch to Metric" : e.target.innerText = "Switch to Imperial"
            console.log(e.target.innerText)
            imperialMetricSwticher(e.target.innerText)
        })
    });
    

}
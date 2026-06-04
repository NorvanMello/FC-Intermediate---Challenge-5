
import { renderHourlyForecast } from "./currentWeather.js"

function toggleHourlyContainer(hourlyDaysContainer) {
    hourlyDaysContainer.classList.toggle("hidden")
    if(!hourlyDaysContainer.classList.contains("hidden")) {
        hourlyDaysContainer.removeAttribute("aria-hidden");
        return;
    }
    hourlyDaysContainer.setAttribute("aria-hidden", "true")
}

function weekDayOptions(opt, dayBtn, hourlyList, weatherInfo) {
    dayBtn.textContent = `${opt}`

    const weekdayChoice = opt.slice(0, 3);
    renderHourlyForecast(hourlyList, weatherInfo, weekdayChoice)
}


export function hourlyForecastEvent(hourlyDayBtn, hourlyDaysContainer, weekdayBtn, dayBtn, hourlyList, weatherInfo) {
    dayBtn.textContent = "Monday"
    hourlyDayBtn.addEventListener("click", () => {
       toggleHourlyContainer(hourlyDaysContainer)
    })

    weekdayBtn.forEach(opt => {
        opt.addEventListener("click", (event) => {   
            console.log(event.target.innerText)
            weekDayOptions(event.target.innerText, dayBtn, hourlyList, weatherInfo)
        })
    });    
}
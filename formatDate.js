export function formatWeatherDate(isoDate) {
    const parsedDate = new Date(isoDate);

    const options = {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
    }

    return parsedDate.toLocaleString("en-Us", options);
}
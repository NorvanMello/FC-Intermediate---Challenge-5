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

export function shortWeekDay(isoDate) {
    const year = isoDate.slice(0,4)
    const month = isoDate.slice(5,7)
    const day = isoDate.slice(8,10)

    const parsedDate = new Date(year, month-1, day);

    const options = {
        weekday: "short",
    }

    return parsedDate.toLocaleString("en-Us", options);
}

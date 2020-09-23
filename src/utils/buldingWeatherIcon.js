export const buldingWeatherIcon = (weatherIcon) => {
    return weatherIcon < 10 ? "./weather-icons/0" + weatherIcon + "-s.png" : "./weather-icons/" + weatherIcon + "-s.png"
}
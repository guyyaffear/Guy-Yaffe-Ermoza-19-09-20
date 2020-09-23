export const createMainWeatherObj = (cityKey, cityName, isFavorite, countryName, weatherObject, fiveDayForecastObject) => {
    return {
        cityKey: cityKey,
        cityName: cityName,
        isFavorite: isFavorite,
        countryName: countryName,
        weatherObject: weatherObject,
        fiveDayForecastObject: fiveDayForecastObject
    }
}
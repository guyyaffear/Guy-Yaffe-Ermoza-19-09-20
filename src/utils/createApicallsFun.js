const apiKey = "3V6GRUxJPLfsDeBHAhcn9fwvTOYZoh5u"

export const createGeolocationEndpoint = (lat, lon) => {
    return "https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=" + apiKey + "&q=" + lat + "%2C" + lon
}

export const createCurrentWeatherEndpoint = (cityKey) => {
    return "https://dataservice.accuweather.com/currentconditions/v1/" + cityKey + "?apikey=" + apiKey
}

export const createFiveDayForecastEndpoint = (cityKey) => {
    return "https://dataservice.accuweather.com/forecasts/v1/daily/5day/" + cityKey + "?apikey=" + apiKey
}

export const makeAutocompleteEndPoint = (q) => {
    return "https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=" + apiKey + "&q=" + q
}
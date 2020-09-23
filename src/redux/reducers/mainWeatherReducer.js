const initialState = {
    cityKey: 0,
    cityName: "",
    countryName: "",
    isFavorite: false,
    weatherObject: [{}],
    fiveDayForecastObject: {
        Headline: {},
        DailyForecasts: []
    }
}

const mainWeather = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_MAIN_WEATHER':
            return action.payload
        case 'ADD_FAVORITE':
            return Object.assign({}, state, {
                isFavorite: true
            });
        case 'REMOVE_FAVORITE':
            if (state.cityKey === action.payload) {
                return Object.assign({}, state, {
                    isFavorite: false
                });
            } else {
                return state
            }
        default:
            return state
    }
}

export default mainWeather;
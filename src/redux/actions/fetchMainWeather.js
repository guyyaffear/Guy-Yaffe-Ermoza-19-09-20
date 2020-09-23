const fetchMainWeather = (weatherObject) => {
    return {
        type: 'FETCH_MAIN_WEATHER',
        payload: weatherObject
    }
}

export default fetchMainWeather;
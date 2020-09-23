import { combineReducers } from 'redux';
import mainWeather from './mainWeatherReducer'
import favorites from './fetchFavReducer'
import tempUnit from './tempReducerUnit'
import fetchApiState from './fetchApiState'


const allReducers = combineReducers({
    mainWeather: mainWeather,
    favorites: favorites,
    tempUnit: tempUnit,
    fetchApiState: fetchApiState,
})

export default allReducers;


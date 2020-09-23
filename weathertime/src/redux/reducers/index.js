import { combineReducers } from 'redux';
import mainWeather from './mainWeatherReducer'
import favorites from './fetchFavReducer'
import tempUnit from './tempReducerUnit'
import fetchApiState from './fetchApiState'
// import toggleMode from './drakModeReducer'


const allReducers = combineReducers({
    mainWeather: mainWeather,
    favorites: favorites,
    tempUnit: tempUnit,
    fetchApiState: fetchApiState,
    // toggleMode: toggleMode,
})

export default allReducers;


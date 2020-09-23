import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux'
import { bindActionCreators, combineReducers } from 'redux'
import fetchMainWeather from './redux/actions/fetchMainWeather'
import fetchApiSucceed from './redux/actions/fetchApiSucceed'
import fetchApiFailed from './redux/actions/fetchApiFailed'
import { createMainWeatherObj } from './utils/mainWeatherObject'
import { createGeolocationEndpoint, createCurrentWeatherEndpoint, createFiveDayForecastEndpoint } from './utils/createApicallsFun'

/* Styles */
import './App.css';
import '../node_modules/semantic-ui-css/semantic.min.css'
import '../node_modules/animate.css/animate.min.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import "../node_modules/react-loader-spinner/dist/loader/css/react-spinner-loader.css"
/* Custom components */
import MainNavbar from './components/navbar/MainNavbar'
import home from './components/home/home'
import fav from './components/favorites/fav'
import Swal from 'sweetalert2';


class App extends Component {
  componentDidMount() {
    if (window.innerWidth > 767) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.updateStoreMainWeather(position.coords.latitude, position.coords.longitude)
          return
        })
      }
    }
    this.updateStoreMainWeather(32.0853, 34.7818)
  }
  

  handleFetchError(error) {
    this.props.fetchApiFailed()
    Swal.fire({
      type: 'error',
      title: 'You have exceeded the 50 free calls!',
      text: 'Please, let me know and I will provide you with a different api key'
    })
  }

  async updateStoreMainWeather(lat, lon) {
    var geolocationEndpoint = createGeolocationEndpoint(lat, lon)
    var locationObject = await fetch(geolocationEndpoint)
      .then(res => res.json())
      .catch(error => this.handleFetchError(error))
    if (locationObject === undefined) return
    var cityKey = locationObject.Key
    var cityName = locationObject.ParentCity.LocalizedName
    var countryName = locationObject.Country.LocalizedName
    var currentWeatherEndpoint = createCurrentWeatherEndpoint(cityKey)
    var weatherObject = await fetch(currentWeatherEndpoint)
      .then(res => res.json())
      .catch(error => this.handleFetchError(error))
    if (weatherObject === undefined) return
    var fiveDayForecastEndpoint = createFiveDayForecastEndpoint(cityKey)
    var fiveDayForecastObject = await fetch(fiveDayForecastEndpoint)
      .then(res => res.json())
      .catch(error => this.handleFetchError(error))
    if (fiveDayForecastObject === undefined) return
    var mainWeatherObject = createMainWeatherObj(cityKey, cityName, false, countryName, weatherObject, fiveDayForecastObject)
    this.props.fetchApiSucceed()
    this.props.fetchMainWeather(mainWeatherObject)
    console.log("this is his Props",this.props);

  }

  render() {
    return (
           <Router>
        <div id="container1">
        <div id="cloud-intro">
        <div className="App">
          <MainNavbar />
          <Switch>
            <Route path="/" exact component={home}></Route>
            <Route path="/favorites" component={fav}></Route>
          </Switch>
          </div>
          </div>
        </div>
      </Router>
      )
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchMainWeather: fetchMainWeather,
    fetchApiSucceed: fetchApiSucceed,
    fetchApiFailed: fetchApiFailed
  }, dispatch);
}

export default connect(null, matchDispatchToProps)(App)


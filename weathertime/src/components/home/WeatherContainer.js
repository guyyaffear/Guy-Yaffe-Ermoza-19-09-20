import React, { Component } from 'react'
import { Grid, Container } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Loader from 'react-loader-spinner'
import './weatherContainer.css'
/* Custom components */
import MainWeatherDetails from './weatherDetails'
import AddToFavorite from './addingFav'
import FiveDayForecastContainer from './fiveForecastContainer'
/* Actions */
import removeFav from '../../redux/actions/removeFav'
import addingFav from '../../redux/actions/addingFav'

class MainWeatherContainer extends Component {

    toggleFavorite() {
        // this.props.favoritesArray.forEach(favorite => favorite.cityKey == this.props.cityKey)
        if (this.props.isFavorite) {
            this.props.removeFav(this.props.cityKey)
        } else {
            // console.log("this is the Obj",this.props)
            this.props.addingFav({
                cityKey: this.props.cityKey,
                cityName: this.props.cityName,
                countryName: this.props.countryName,
                weatherObject: this.props.weatherObject,
                forecastObject: this.props.fiveDayForecastObject,
            })
        }
    }

    renderMainContainer() {
        return <Container className="animated zoomInDown">
            <Grid stackable className="main-weather-grid">
                <Grid.Row verticalAlign="middle" columns={3}>
                    <Grid.Column textAlign="left">
                        <MainWeatherDetails
                            cityName={this.props.cityName}
                            countryName={this.props.countryName}
                            weatherObject={this.props.weatherObject[0]}
                            temperatureUnit={this.props.temperatureUnit} />
                    </Grid.Column>
                    <Grid.Column>
                        <h2 className="cool-font" style={{ marginTop: 10, fontSize: 50 }}>
                            {this.props.weatherObject[0].WeatherText}
                        </h2>
                    </Grid.Column>
                    <Grid.Column textAlign={window.innerHeight > 767 ? 'right' : 'center'}>
                        <AddToFavorite isFavorite={this.props.isFavorite}
                            toggleFavorite={() => this.toggleFavorite()} />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <FiveDayForecastContainer forecastObject={this.props.fiveDayForecastObject} temperatureUnit={this.props.temperatureUnit} />
                </Grid.Row>
            </Grid>
        </Container>
    }

    renderLoader() {
        return <Loader
            type="Oval"
            color="White"
            height={80}
            width={80}
        />
    }

    renderFailedMessage() {
        return <h1>Failed fetching data from API!</h1>
    }

    render() {
        return (
            <Grid.Row>
                <Grid.Column className="main-weather-column">
                    {this.props.fetchApiState === 'loading' ?
                        this.renderLoader()
                        :
                        this.props.fetchApiState === 'failed' ? this.renderFailedMessage() : this.renderMainContainer()
                    }
                </Grid.Column>
            </Grid.Row>
        )
    }
}

function mapStateToProps(state) {
    const mainWeather = state.mainWeather
    const tempUnit = state.tempUnit
    const favorites = state.favorites 
    return {
        cityKey: mainWeather.cityKey,
        cityName: mainWeather.cityName,
        countryName: mainWeather.countryName,
        favoritesArray:favorites,
        weatherObject: mainWeather.weatherObject,
        isFavorite: mainWeather.isFavorite,
        fiveDayForecastObject: mainWeather.fiveDayForecastObject,
        temperatureUnit: tempUnit,
        fetchApiState: state.fetchApiState
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            removeFav: removeFav,
            addingFav: addingFav
        }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(MainWeatherContainer)

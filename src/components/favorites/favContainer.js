import React, { Component } from 'react'
import { Container, Card } from 'semantic-ui-react'
import { connect } from 'react-redux'
import FavoriteCard from './favCard'
import NoFavs from './noFav'

class MainFavorites extends Component {

    render() {
        return (
            <Container>
                {this.props.favoritesArray.length !== 0 ?
                <Card.Group centered itemsPerRow={window.innerWidth > 767 ? 4 : 2}>
                    {this.props.favoritesArray.map(fav =>
                        <FavoriteCard
                            key={fav.cityKey}
                            cityKey={fav.cityKey}
                            cityName={fav.cityName}
                            countryName={fav.countryName}
                            weatherObject={fav.weatherObject[0]}
                            forecastObject={fav.forecastObject}
                            mainWeatherDisplayed={this.props.mainWeatherDisplayed}
                            temperatureUnit={this.props.temperatureUnit}
                        />
                    )
                    }
                </Card.Group>
                :
                <NoFavs />
                }
            </Container>
        )
    }
}

function mapStateToProps(state) {//THIS IS CONNECTING THE REDUX STATE TO YOUR CURRENT STATE
    const favorites = state.favorites
    const mainWeatherDisplayed = state.mainWeather.cityKey
    const tempUnit = state.tempUnit
    return {
        mainWeatherDisplayed: mainWeatherDisplayed,
        favoritesArray: favorites,
        temperatureUnit: tempUnit
    }
}

export default connect(mapStateToProps, null)(MainFavorites)
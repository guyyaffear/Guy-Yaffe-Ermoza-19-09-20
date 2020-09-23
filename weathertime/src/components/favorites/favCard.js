import React, { Component } from 'react'
import { Card, Image, Button, Header } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import removeFromFavorites from '../../redux/actions/removeFav'
import fetchMainWeather from '../../redux/actions/fetchMainWeather'
import { createHashHistory } from 'history'
import { createMainWeatherObj } from '../../utils/mainWeatherObject'
import { buldingWeatherIcon } from '../../utils/buldingWeatherIcon'
import { getTemperatureWithCurrentUnit } from '../../utils/getTemperatureUnit'
import Swal from 'sweetalert2'

class FavoriteCard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            fade: false
        }
        this.handleClick = this.handleClick.bind(this)
        this.removeCardFromFavorites = this.removeCardFromFavorites.bind(this)
        this.showDetailsOnHomePage = this.showDetailsOnHomePage.bind(this)
    }

    removeCardFromFavorites(key) {
        this.setState({ fade: false })
        this.props.removeFromFavorites(key)
    }

    showDetailsOnHomePage(key) {
        if (this.props.mainWeatherDisplayed === key) {
            createHashHistory().goBack()
        } else {
            this.props
                .fetchMainWeather(createMainWeatherObj(
                    this.props.cityKey,
                    this.props.cityName,
                    true,
                    this.props.countryName,
                    [this.props.weatherObject],
                    this.props.forecastObject
                ))
            createHashHistory().goBack()
        }
    }

    handleClick() {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
                this.setState({ fade: true })
            }
        })
    }

    render() {
        return (
            <Card raised className={this.state.fade ? 'animated zoomOutDown' : ''} onAnimationEnd={() => this.removeCardFromFavorites(this.props.cityKey)}>
                <Card.Header>
                    <Header as="h2" style={{ marginTop: 10 }}>
                        {this.props.cityName}
                    </Header>
                </Card.Header>
                <Card.Description>
                    <Image src={buldingWeatherIcon(this.props.weatherObject.WeatherIcon)} size="medium" />
                    <Header as="h2" style={{ marginBottom: 10, marginTop: 0 }}>{getTemperatureWithCurrentUnit(this.props.weatherObject, this.props.temperatureUnit)}</Header>
                </Card.Description>
                <Card.Content>
                    <Card.Header className="cool-font">{this.props.weatherObject.WeatherText}</Card.Header>
                </Card.Content>
                <Card.Content extra>
                    <Button.Group vertical={window.innerWidth > 767 ? false : true}>
                        <Button onClick={() => this.showDetailsOnHomePage(this.props.cityKey)} color="blue">See more</Button>
                        {window.innerWidth > 767 ? <Button.Or /> : null}
                        <Button onClick={this.handleClick} negative>
                            Remove
                        </Button>
                    </Button.Group>
                </Card.Content>
            </Card>
        )
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            fetchMainWeather: fetchMainWeather,
            removeFromFavorites: removeFromFavorites
        }, dispatch);
}

function mapStateToProps(state) {
    return {
        texto: state.mainWeather.cityName
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(FavoriteCard)

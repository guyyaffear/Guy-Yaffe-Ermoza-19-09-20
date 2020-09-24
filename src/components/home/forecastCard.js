import React, { Component } from 'react'
import { Image, Header, Card, List } from 'semantic-ui-react'
import { buldingWeatherIcon } from '../../utils/buldingWeatherIcon'
import './styleForecastCard.css'

export default class ForecastCard extends Component {

    getDayFromEpochDate(epochDate) {
        var date = (new Date(epochDate * 1000)).toLocaleDateString('en-us', { weekday: 'long' })
        return date
    }

    convertFarenheitToCelsius(val) {
        return ((val - 32) * 5 / 9).toFixed(1)
    }
    
    render() {
        return (
            <Card raised className="small-card">
                <h2 className="cool-font weekday-title">
                    {this.getDayFromEpochDate(this.props.dayObject.EpochDate)}
                </h2>
                <Card.Content>
                    <Header as="h1" icon textAlign="center">
                        <Image src={buldingWeatherIcon(this.props.dayObject.Day.Icon)} />
                        <Header.Content>
                            <List divided horizontal size="large">
                                <List.Item>
                                    { this.props.temperatureUnit === false ?
                                        this.convertFarenheitToCelsius(this.props.dayObject.Temperature.Maximum.Value) + "°"
                                        :
                                        this.props.dayObject.Temperature.Maximum.Value + "°"
                                    }
                                </List.Item>
                                <List.Item>
                                    {this.props.temperatureUnit === false ?
                                        this.convertFarenheitToCelsius(this.props.dayObject.Temperature.Minimum.Value) + "°"
                                        :
                                        this.props.dayObject.Temperature.Minimum.Value + "°"
                                    }
                                </List.Item>
                            </List>
                        </Header.Content>
                    </Header>
                </Card.Content>
            </Card>
        )
    }
}

import React from 'react'
import { Header, Image } from 'semantic-ui-react'
import { buldingWeatherIcon } from '../../utils/buldingWeatherIcon'
import { getTemperatureWithCurrentUnit } from '../../utils/getTemperatureUnit'

export default function MainWeatherDetails(props) {
    return (
        <div>
            <Header as='h1'>
                <Image src={buldingWeatherIcon(props.weatherObject.WeatherIcon)} />
                <Header.Content>
                    {props.cityName}
                    <Header.Subheader>{props.countryName}</Header.Subheader>
                    <Header.Subheader>
                        {getTemperatureWithCurrentUnit(props.weatherObject,props.temperatureUnit)}
                    </Header.Subheader>
                </Header.Content>
            </Header>
        </div>
    )
}

import React from 'react'
import ForecastCard from './forecastCard'
import { Grid, Card, Container } from 'semantic-ui-react'
export default function FiveDayForecastContainer(props) {
    return (
        <Grid.Column>
            <Container>
                <Card.Group stackable itemsPerRow={5}>
                    {props.forecastObject.DailyForecasts.map(day =>
                        <ForecastCard key={day.EpochDate} dayObject={day} temperatureUnit={props.temperatureUnit} />
                    )}
                </Card.Group>
            </Container>
        </Grid.Column>
    )
}

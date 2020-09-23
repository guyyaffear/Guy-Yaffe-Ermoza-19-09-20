import React from 'react'
import SearchForm from './searchForm'
import MainWeather from './WeatherContainer'
import { Grid, Container } from 'semantic-ui-react'

export default function home() {
    return (
        <Container>
            <Grid>
                <MainWeather />
                <SearchForm />
            </Grid>
        </Container>
    )
} 
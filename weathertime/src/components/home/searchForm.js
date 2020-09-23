import React, { Component } from 'react'
import { Dropdown, Grid, Container } from 'semantic-ui-react'
import { animateScroll as scroll } from 'react-scroll'
import { makeAutocompleteEndPoint, createCurrentWeatherEndpoint, createFiveDayForecastEndpoint } from '../../utils/createApicallsFun'
import { createMainWeatherObj } from '../../utils/mainWeatherObject'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import fetchMainWeather from '../../redux/actions/fetchMainWeather'
import Swal from 'sweetalert2'

class SearchForm extends Component {

    constructor() {
        super()
        this.state = {
            autocompleteData: [],
            locationObjects: []
        }
        this.handleSearchChange = this.handleSearchChange.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e, { value }) {
        this.updateMainWeatherOnStore(value)
        if (window.innerWidth <= 767) {
            scroll.scrollToTop()
        }
    }

    handleSearchChange(e, { searchQuery }) {
        if (searchQuery !== "") {
            var autoCompleteEndpoint = makeAutocompleteEndPoint(searchQuery)
            fetch(autoCompleteEndpoint)
                .then(res  => res.json())
                .then(data => this.parseForDropdown(data))
                .catch(error => Swal.fire({
                    type: 'error',
                    title: 'You have exceeded the 50 free calls!',
                    text: 'Please, let me know and I will provide you with a different api key'
                }))
        } else {
            this.setState({ autocompleteData: [] })
        }
    }

    parseForDropdown(data) {
        this.setState({
            autocompleteData: data.map(this.convertDataToObject),
            locationObjects: data
        })
    }

    convertDataToObject(data) {
        return {
            key: data.Key,
            text: data.LocalizedName + ", " + data.Country.LocalizedName,
            value: data.Key
        }
    }

    async updateMainWeatherOnStore(key) {
        var weatherObject = await fetch(createCurrentWeatherEndpoint(key))
            .then(res => res.json())
        var fiveDayForecastObject = await fetch(createFiveDayForecastEndpoint(key))
            .then(res => res.json())
        var locationObject = this.state.locationObjects.filter(location => location.Key === key)
        var mainWeatherObject = createMainWeatherObj(key, locationObject[0].LocalizedName, false, locationObject[0].Country.LocalizedName, weatherObject, fiveDayForecastObject)
        this.props.fetchMainWeather(mainWeatherObject)
    }

    renderSearchDropdown() {
        return <Dropdown
            button
            className='icon teal big'
            selectOnNavigation={false}
            floating
            labeled
            icon='world'
            options={this.state.autocompleteData}
            search
            text='Search a city'
            onChange={this.handleChange}
            onSearchChange={this.handleSearchChange}
        />
    }

    render() {
        return (
            <Grid.Row className="animated slideInRight" style={{ marginTop: '3rem' }}>
                <Grid.Column computer={16} mobile={16}>
                    <Container>
                        {this.props.fetchApiState === 'loading' || this.props.fetchApiState === 'failed' ? null : this.renderSearchDropdown()}
                    </Container>
                </Grid.Column>
            </Grid.Row>
        )
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({ fetchMainWeather: fetchMainWeather }, dispatch);
}

function mapStateToProps(state) {
    return { fetchApiState: state.fetchApiState}
}

export default connect(mapStateToProps, matchDispatchToProps)(SearchForm)

import React, { Component } from 'react'
import { Icon, Header, Checkbox, Container } from 'semantic-ui-react'
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import tempToggleUnit from '../../redux/actions/tempToggle'
import './MainNavbar.css'


class MainNavbar extends Component {

    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)

    }


    handleChange() {
        this.props.toggleUnit()
    }

    render() {
        return (

            <Container className="navbar-container">
                <Navbar collapseOnSelect expand="lg" bg="transparent" variant="dark">
                    <Navbar.Brand href="/">
                        <Header as="h1">
                            <Icon name="sun" size="big" color="yellow" />
                            <Header.Content className="title">
                                Weather app
                        </Header.Content>
                        </Header>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ml-auto">
                            <Link to="/">
                                <h1 className="title active">Home</h1>
                            </Link>
                        </Nav>
                        <Nav className='second-item-right'>
                            <Link to="/favorites">
                                <h1 className="title active">Favs</h1>
                            </Link>
                        </Nav>
                        <Nav className='third-item-right'>
                            <Header as="h1">
                                <Checkbox onChange={this.handleChange} toggle />
                                <Header.Subheader>{"°C"} | {"°F"}</Header.Subheader>
                            </Header>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </Container>
        )
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            toggleUnit: tempToggleUnit,

        }, dispatch);
}

export default connect(null, matchDispatchToProps)(MainNavbar)



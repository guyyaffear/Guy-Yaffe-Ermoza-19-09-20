import React, { Component } from 'react'
import { Header, Icon } from 'semantic-ui-react'
import { createHashHistory } from 'history'

export default class NoFavs extends Component {
    render() {
        return (
            <Header as="h1" icon style={{marginTop: 80}}>
                <Icon name="sun" size="huge" onClick={() => createHashHistory().goBack()}/>
                You have no favorites on your list
                <Header.Subheader>
                    Click on the sun and start adding your favorite weathers!
                </Header.Subheader>
            </Header>
        )
    }
}
import { Icon, Popup } from 'semantic-ui-react'
import React, { Component } from 'react'

export default class AddToFav extends Component {

    constructor(props) {
        super(props)
        this.state = {
            pulse: false
        }
        this.handleOnClick = this.handleOnClick.bind(this)
    }

    handleOnClick() {
        this.props.toggleFavorite()
        this.setState({ pulse: true })
    }

    render() {
        return (
            <div>
                {this.props.isFavorite ?
                    <Popup
                        disabled={window.innerWidth > 767 ? false : true}
                        trigger={
                            <Icon name="heart" size="huge" color="red"
                                onClick={this.handleOnClick}
                                onAnimationEnd={() => this.setState({ pulse: false })}
                                className={this.state.pulse ? 'animated heartBeat' : ''}
                            />
                        }
                        content='Click to remove this city from favorites'
                        position='right center'
                    />
                    :
                    <Popup
                        disabled={window.innerWidth > 767 ? false : true}
                        trigger={
                            <Icon name="heart outline" size="huge" color="red"
                                onClick={this.handleOnClick}
                                onAnimationEnd={() => this.setState({ pulse: false })}
                                className={this.state.pulse ? 'animated heartBeat' : ''}
                            />
                        }
                        content='Click to add this city to favorites'
                        position='right center'
                    />
                }
            </div>
        )
    }
}


import PropTypes from 'prop-types'
import React, { Component } from 'react'

import './HighScoreInput.css'

import { saveHOFEntry } from './HallOfFame'

class HighScoreInput extends Component {
    state = {winner:''};

    handleWinnerUpdate = (event) => {
        this.setState({winner: event.target.value.toUpperCase()});
    }

    render() {
        return (
            <form className="highScoreInput">
                <p>
                    <label>
                        Bravo ! Entre ton prénom :
                        <input 
                            type="text" 
                            autoComplete="given-name"
                            value = {this.state.winner}
                            onChange = {this.handleWinnerUpdate} 
                        />
                    </label>
                    <button type="submit">J’ai gagné !</button>
                </p>
            </form>
        )
    }
}

HighScoreInput.propTypes = {
    guesses: PropTypes.number.isRequired,
}

export default HighScoreInput
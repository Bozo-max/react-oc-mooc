import React, {Component} from 'react';
import logo from './logo.svg';
import GuessCount from './GuessCount';
import Card from './Card';
import shuffle from 'lodash.shuffle';
import HallOfFame, {FAKE_HOF} from './HallOfFame'
import HighScoreInput from './HighScoreInput';
import './App.css';

const SIDE = 6
export const SYMBOLS = '😀🎉💖🎩🐶🐱🦄🐬🌍🌛🌞💫🍎🍌🍓🍐🍟🍿'
const VISUAL_PAUSE_MSECS = 750;

class App extends Component {
  state = {
    cards: this.generateCards(),
    guesses: 0,
    currentPair: [],
    matchedCardIndices: [],
    hallOfFame: null,
  }

  displayHallOfFame = (hallOfFame)=>this.setState({hallOfFame}); 

  generateCards(){
    const result = [];
    const size = SIDE*SIDE;
    const candidates = shuffle(SYMBOLS);

    while(result.length<size){
      const card = candidates.pop();
      result.push(card,card);
    }
    return shuffle(result);
  }

  handleCardClick = (index) => {
    const { currentPair} = this.state;
    if(currentPair.length === 0){
      this.setState({currentPair:[index]});
      return;
    }
    if(currentPair.length === 2){
      return;
    }
    this.handleNewPairClosedBy(index);
  }

  handleNewPairClosedBy(index){
    const {cards, currentPair, guesses, matchedCardIndices} = this.state;

    const newPair = [currentPair[0], index];
    const newGuesses = guesses+1;
    const matched = cards[newPair[1]] === cards[newPair[0]];
    this.setState({currentPair: newPair, guesses: newGuesses});

    if(matched){
      this.setState({matchedCardIndices:[...matchedCardIndices, ...newPair]});
    }
    setTimeout(()=>this.setState({ currentPair:[] }), VISUAL_PAUSE_MSECS);

  }

  getFeedbackForCard(index) {
    const { currentPair, matchedCardIndices } = this.state
    const indexMatched = matchedCardIndices.includes(index)

    if (currentPair.length < 2) {
      return indexMatched || index === currentPair[0] ? 'visible' : 'hidden'
    }

    if (currentPair.includes(index)) {
      return indexMatched ? 'justMatched' : 'justMismatched'
    }

    return indexMatched ? 'visible' : 'hidden'
  }

  render(){
    const {cards, guesses, matchedCardIndices, hallOfFame} = this.state
    const won = matchedCardIndices.length === 4
    return (
      <div className="memory">
        <GuessCount guesses={guesses}/>
        {cards.map((card,index) => (
          <Card
            card={card}
            key = {index}
            index={index}
            onClick = {this.handleCardClick}
            feedback = {this.getFeedbackForCard(index)}/>
        ))}
        {won && (
          hallOfFame? <HallOfFame entries={hallOfFame}/>
          :<HighScoreInput guesses={guesses} onStored={this.displayHallOfFame}/>
          )}
      </div>
    )
  }
}

export default App;

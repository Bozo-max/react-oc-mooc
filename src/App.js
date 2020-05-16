import React, {Component} from 'react';
import logo from './logo.svg';
import GuessCount from './GuessCount';
import Card from './Card';
import shuffle from 'lodash.shuffle';
import HallOfFame, {FAKE_HOF} from './HallOfFame'

import './App.css';

const SIDE = 6
const SYMBOLS = '😀🎉💖🎩🐶🐱🦄🐬🌍🌛🌞💫🍎🍌🍓🍐🍟🍿'

class App extends Component {
  state = {
    cards: this.generateCards(),
    guesses: 0,
    currentPair: [],
    matchedCardIndices: [],
  }

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

  handleCardClick = (card) => {
    console.log(card, this)
  }

  getFeedbackForCard(index){
    const {currentPair, matchedCardIndices} = this.state;
    var indexMatched = matchedCardIndices.includes(index) ? 'visible' : 'hidden';

    if (currentPair.length===1 && currentPair[0]===index){
      indexMatched = 'visible';
    }
    else if (currentPair.length===2 && currentPair.includes(index)) {
      indexMatched = matchedCardIndices.includes(index) ? 'justMatched' : 'justMismatched';
    }
    return indexMatched;
  }

  render(){
    const {cards, guesses, matchedCardIndices} = this.state;
    const won = matchedCardIndices.length === cards.length;
    return (
      <div className="memory">
        <GuessCount guesses={guesses}/>
        {cards.map((card,index) => (
          <Card
            card={card}
            key = {index}
            onClick = {this.handleCardClick}
            feedback = {this.getFeedbackForCard(index)}/>
        ))}
        {won && <HallOfFame entries={FAKE_HOF}/>}
      </div>
    );
  }
}

export default App;

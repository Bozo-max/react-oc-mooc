import React from 'react'
import PropTypes from 'prop-types'
import './Card.css'

const HIDDEN_SYMBOL = '❓'

const Card = ({card,feedback, onClick, index}) => (
  <div className={`card ${feedback}`} onClick={() => onClick(index)}>
    <span className='symbol'>
      {feedback==="hidden" ? HIDDEN_SYMBOL : card}
    </span>
  </div>
)

Card.propTypes = {
  card: PropTypes.string.isRequired,
  feedback: PropTypes.oneOf([
    'visible',
    'hidden',
    'justMatched',
    'justMismatched'
  ]).isRequired,
  onClick: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired
}

export default Card

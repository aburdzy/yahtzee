import React, { useContext } from 'react';
import { AppContext } from '../AppContext';

function Dice(props) {
  const { dices, setDices } = useContext(AppContext);

  function disableDice() {
    let newDices = [...dices];
    let dice = newDices.find((dice) => dice.id === props.id);
    let index = newDices.findIndex((d) => d === dice);

    dice = {...dice, isDisable: !dice.isDisable };
    newDices[index] = dice;
    setDices(newDices);
  }

  return (
    <div className='dice-container' style={{ border: props.isDisable ? '8px solid rgb(255, 147, 147)'
      : '8px solid transparent' }} onClick={disableDice}>
      <div className={`dice ${props.diceType}`}>
        <div className='row'>
          <div className='dot'></div>
          <div className='dot'></div>
          <div className='dot'></div>
        </div>
        <div className='row'>
          <div className='dot'></div>
          <div className='dot'></div>
          <div className='dot'></div>
        </div>
        <div className='row'>
          <div className='dot'></div>
          <div className='dot'></div>
          <div className='dot'></div>
        </div>
      </div>
    </div>
  );
}

export default Dice;
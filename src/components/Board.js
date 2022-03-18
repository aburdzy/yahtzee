import React, { useState, useContext, useEffect } from 'react';
import Dice from './Dice';
import { AppContext } from '../AppContext';
import { sumScore, meshesScore, yahtzeeScore, smallStraightScore, largeStraightScore, 
  fullHouseScore, threeOfKindScore, fourOfKindScore } from '../CheckScore';
import { scoresValue, tmpScoresValue } from '../Scores';
import Modal from './Modal';

function Board() {
  const { dices, setDices, tmpScores, scores, setScores, setTmpScores, isThrown, setIsThrown } = useContext(AppContext);
  const types = new Map([
    [1, 'one'],
    [2, 'two'],
    [3, 'three'],
    [4, 'four'],
    [5, 'five'],
    [6, 'six']
  ]);

  const [round, setRound] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  
  function throwDices() {
    setRound(round + 1);

    const diceCopy = [...dices];
    const activeDices = diceCopy.filter((dice) => dice.isDisable === false);
    
    const thrownDices = activeDices.map((dice) => {
      return (
        {
          ...dice,
          value: Math.floor(Math.random() * 6) + 1
        }
      )
    });

    const newDices = diceCopy.map((dice) => {
      if(thrownDices.find((el) => el.id === dice.id)) {
        return {
          ...thrownDices.find((el) => el.id === dice.id)
        }
      }
      else {
        return {
          ...dice
        }
      }
    });

    let scoresCopy = new Map(tmpScores);

    if(scores.get('ones') === '-') scoresCopy.set('ones', meshesScore(newDices, 1));
    if(scores.get('twos') === '-') scoresCopy.set('twos', meshesScore(newDices, 2));
    if(scores.get('threes') === '-') scoresCopy.set('threes', meshesScore(newDices, 3));
    if(scores.get('fours') === '-') scoresCopy.set('fours', meshesScore(newDices, 4));
    if(scores.get('fives') === '-') scoresCopy.set('fives', meshesScore(newDices, 5));
    if(scores.get('sixes') === '-') scoresCopy.set('sixes', meshesScore(newDices, 6));
    if(scores.get('chance') === '-') scoresCopy.set('chance', sumScore(newDices));
    if(scores.get('3 of kind') === '-') scoresCopy.set('3 of kind', threeOfKindScore(newDices));
    if(scores.get('4 of kind') === '-') scoresCopy.set('4 of kind', fourOfKindScore(newDices));
    if(scores.get('small straight') === '-') scoresCopy.set('small straight', smallStraightScore(newDices));
    if(scores.get('large straight') === '-') scoresCopy.set('large straight', largeStraightScore(newDices));
    if(scores.get('full house') === '-') scoresCopy.set('full house', fullHouseScore(newDices));
    if(scores.get('yahtzee') === '-') scoresCopy.set('yahtzee', yahtzeeScore(newDices));
 
    scoresCopy.set('total', scores.get('total'));
    scoresCopy.set('grand total', scores.get('grand total'));
    scoresCopy.set('bonus', scores.get('bonus'));

    setIsThrown(true);
    setTmpScores(scoresCopy);
    setDices(newDices);
  }

  function resetGame() {
    setTmpScores(tmpScoresValue);
    setScores(scoresValue);
    setIsModalVisible(false);
  }

  useEffect(() => {
    if(!isThrown) {
      setRound(0);

      let counter = 0;

      for (let value of scores.values()){
        if(!isNaN(value)) {
          counter++;
        }
      }

      if(counter === scores.size) {
        setIsModalVisible(true);
      }
    }
  }, [isThrown]);

  return (
    <div className='board'>
      <div className='rounds'>
        <div className='circle' style={{ backgroundColor: round === 1 || round === 2 || round === 3 ? 'rgb(255, 147, 147)' : null}}></div>
        <div className='circle' style={{ backgroundColor: round === 2 || round === 3 ? 'rgb(255, 147, 147)' : null}}></div>
        <div className='circle' style={{ backgroundColor: round === 3 ? 'rgb(255, 147, 147)' : null}}></div>
      </div>
      <div className='dices'>
        {isThrown ? dices.map((dice) => {
          return (
            <Dice key={dice.id} id={dice.id} isDisable={dice.isDisable} diceType={types.get(dice.value)} />
          );
        }): null}
      </div>
    <button className={round === 3 ? `throw disabled` : 'throw'} onClick={throwDices} 
      disabled={round === 3 ? true : false}>ROLL</button>
    <Modal isVisible={isModalVisible} onClose={() => setIsModalVisible(false)} resetGame={resetGame}/>
  </div>
  );
}

export default Board;
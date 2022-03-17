import React, { useContext } from 'react';
import { AppContext } from '../AppContext';
import { bonusScore, grandTotalScore, totalScore } from '../CheckScore';

function ScoreTable() {
  const { scores, setScores, tmpScores, isThrown, setIsThrown, dices, setDices } = useContext(AppContext);

  function saveScore(entry) {
    let scoresCopy = new Map(scores);
    scoresCopy.set(entry[0], entry[1]);
    
    scoresCopy.set('total', totalScore(scoresCopy));
    scoresCopy.set('grand total', grandTotalScore(scoresCopy));
    scoresCopy.set('bonus', bonusScore(totalScore(scoresCopy)));

    const dicesCopy = [...dices];
    const newDices = dicesCopy.map((dice) => {
      return (
        { 
          ...dice,
          isDisable: false
        }
      );
    });

    setScores(scoresCopy);
    setDices(newDices);
    setIsThrown(false);
  }

  return (
    <div className='table-container'>
      <h2>Score</h2>
      <table>
        <tbody>
          {isThrown ? Array.from(tmpScores).map((entry, j) => {
            return (
              <tr key={j} className={scores.get(entry[0]) !== '-' ? 'completed' : 'uncompleted'} onClick={() => scores.get(entry[0]) !== '-' ? null : saveScore(entry)}>
                {entry.map((el, i) => {
                  return (
                    <td key={i} className={scores.get(entry[0]) !== '-' || el === entry[0] ? 'completed' : 'uncompleted'}>{el}</td>
                  );
                })}
              </tr>
            );
          }) 
          : Array.from(scores).map((entry, j) => {
            return (
              <tr key={j}>
                {entry.map((el, i) => {
                  return (
                    <td key={i}>{el}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ScoreTable;
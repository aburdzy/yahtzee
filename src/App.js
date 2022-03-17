import './App.css';
import Board from './components/Board';
import ScoreTable from './components/ScoreTable';
import { useState } from 'react';
import { AppContext, defaultValue } from './AppContext';
import { scoresValue, tmpScoresValue } from './Scores';

function App() {
  const [dices, setDices] = useState(defaultValue);
  const [scores, setScores] = useState(scoresValue);
  const [tmpScores, setTmpScores] = useState(tmpScoresValue);
  const [isThrown, setIsThrown] = useState(false);
  
  return (
    <div className="App">
      <AppContext.Provider value={{ dices, setDices, scores, setScores, tmpScores, setTmpScores, isThrown, setIsThrown }}>
        <div className='container'>
          <Board />
          <ScoreTable />
        </div>
     </AppContext.Provider>
    </div>
  );
}

export default App;

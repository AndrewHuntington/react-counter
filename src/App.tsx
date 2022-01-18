import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isRunning]);

  return (
    <div className="App">
      <div className="counter-display">
        <h1 className="counter" role="timer">
          {seconds}
        </h1>
      </div>
      <div className="buttons">
        <div className="start-btn-wrapper bottom-margin">
          <button className="start-btn" onClick={() => setIsRunning(true)}>
            START
          </button>
        </div>
        <div className="pause-btn-wrapper bottom-margin">
          <button
            className="pause-btn"
            onClick={() => {
              setIsRunning(!isRunning);
            }}
          >
            PAUSE
          </button>
        </div>
        <div className="reset-btn-wrapper">
          <button className="reset-btn">RESET</button>
        </div>
      </div>
    </div>
  );
}

export default App;

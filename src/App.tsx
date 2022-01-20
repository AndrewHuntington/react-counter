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
    <div className="text-center">
      <div className="">
        <h1 className="text-8xl" role="timer">
          {seconds < 60
            ? seconds
            : `${Math.floor(seconds / 60)}:${(seconds % 60)
                .toString()
                .padStart(2, '0')}`}
        </h1>
      </div>
      <div className="">
        {isRunning ? null : (
          <button
            data-testid="start-btn"
            className="mr-5"
            onClick={() => setIsRunning(true)}
          >
            <i className="fa-solid fa-play fa-2x"></i>
          </button>
        )}

        {isRunning ? (
          <button
            data-testid="pause-btn"
            className="mr-5"
            onClick={() => {
              setIsRunning(!isRunning);
            }}
          >
            <i className="fa-solid fa-pause fa-2x"></i>
          </button>
        ) : null}

        <button
          data-testid="reset-btn"
          className="reset-btn"
          onClick={() => setSeconds(0)}
        >
          <i className="fa-solid fa-power-off fa-2x"></i>
        </button>
      </div>
    </div>
  );
}

export default App;

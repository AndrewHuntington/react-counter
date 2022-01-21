import { useState, useEffect } from 'react';
import { Button } from './components/Button';
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
    <div className="min-h-screen text-center bg-indigo-900 flex items-center justify-center">
      <div className="bg-gray-200 border-solid border-black border-2 w-1/2 max-w-screen-sm mx-auto p-10 ">
        <h1 className="text-8xl text-black pb-8" role="timer">
          {seconds < 60
            ? seconds
            : `${Math.floor(seconds / 60)}:${(seconds % 60)
                .toString()
                .padStart(2, '0')}`}
        </h1>
        <div className="flex flex-col sm:flex-row sm:justify-center">
          {isRunning ? null : (
            <Button
              className="sm:mr-10 mb-5 sm:mb-0"
              data-testid="start-btn"
              onClick={() => setIsRunning(true)}
            >
              <i className="btn-border p-2.5 bg-gray-500 fa-solid fa-play fa-2x"></i>
            </Button>
          )}

          {isRunning ? (
            <Button
              className="sm:mr-10 mb-5 sm:mb-0"
              data-testid="pause-btn"
              onClick={() => {
                setIsRunning(!isRunning);
              }}
            >
              <i className="btn-border py-2.5 px-4 bg-gray-500 fa-solid fa-pause fa-2x"></i>
            </Button>
          ) : null}

          <Button data-testid="reset-btn" onClick={() => setSeconds(0)}>
            <i className="btn-border p-2.5 bg-gray-500 fa-solid fa-redo-alt fa-2x"></i>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;

import "./styles.css";
import React, { useState } from "react";

function Clock({ time }) {
  return (
    <div className="clock">
      <span>{time.hr < 10 ? "0" + time.hr : time.hr}</span>&nbsp;:&nbsp;
      <span>{time.min < 10 ? "0" + time.min : time.min}</span>&nbsp;:&nbsp;
      <span>{time.sec < 10 ? "0" + time.sec : time.sec}</span>&nbsp;:&nbsp;
      <span>
        {time.millisec < 10
          ? "00" + time.millisec
          : time.millisec < 100
          ? "0" + time.millisec
          : time.millisec}
      </span>
    </div>
  );
}

export default function App() {
  let [timer, setTimer] = useState({ hr: 0, min: 0, sec: 0, millisec: 0 });
  let [interv, setInterv] = useState();
  var seconds = timer.sec,
    minutes = timer.min,
    hours = timer.hr,
    milliseconds = timer.millisec;

  const handleStart = () => {
    timerLogic();
    setInterv(setInterval(timerLogic, 10));
  };

  const handlePause = () => {
    clearInterval(interv);
  };

  const handleReset = () => {
    clearInterval(interv);
    setTimer({ hr: 0, min: 0, sec: 0, millisec: 0 });
  };

  function timerLogic() {
    milliseconds += 10;
    if (milliseconds === 1000) {
      milliseconds = 0;
      seconds++;
      if (seconds === 60) {
        minutes++;
        seconds = 0;
        if (minutes === 60) {
          hours++;
          minutes = 0;
        }
      }
    }

    return setTimer({
      hr: hours,
      min: minutes,
      sec: seconds,
      millisec: milliseconds
    });
  }

  return (
    <div className="container">
      <Clock time={timer} />
      <div className="buttons">
        <button id="start" onClick={handleStart}>
          Start
        </button>
        <button id="pause" onClick={handlePause}>
          Pause
        </button>
        <button id="reset" onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
}

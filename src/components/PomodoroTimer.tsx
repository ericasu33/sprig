import React, { useState } from 'react';
import Button from './Button'
import './PomodoroTimer.scss';

const PomodoroTimer = (props: any) => {
  const [expand, setExpand] = useState(false);
  return (
    <div className="pomodoro-display">
      <Button
        onClick={(e: any) => setExpand((prev: boolean) => (!prev))}
      >
        { (expand && "shrink") || "expand" }
      </Button>
      { (expand && (
        <div>
          expanded
        </div>
      )) || ( 
        <>
          <div>
            <label>Name</label>
            <input type="text" disabled={true} value={props.name} />
          </div>
          <div>
            <label>Work</label>
            <input type="text" disabled={true} value={props.work} />
          </div>
          <div>
            <label>Short break</label>
            <input type="text" disabled={true} value={props.break} />
          </div>
          <div>
            <label>Cycles remaining</label>
            <input type="text" disabled={true} value={props.cycles} />
          </div>
          <div>
            <label>Long break</label>
            <input type="text" disabled={true} value={props.longBreak} />
          </div>
          <div>
            <label>Time remaining</label>
            <input type="text" disabled={true} value={props.total_time} />
          </div>
          <Button
            play
          >
            <i className="far fa-play-circle fa-lg"></i>
            <i className="far fa-pause-circle fa-lg"></i>
          </Button>
          <Button
            stop
          >
            <i className="far fa-stop-circle fa-lg"></i>
          </Button>
        </>
      )}
    </div>
  );
};

export default PomodoroTimer;
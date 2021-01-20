import React, { useEffect, useState } from 'react';
import Button from './Button'
import PomodoroForm from './PomodoroForm';
import './PomodoroTimer.scss';
import StepInputTimer from './StepInputTimer';
import StepInputInt from './StepInputInt';

interface IObject {
  [key: string]: any;
}
const initData: IObject = {
  id: 1,
  name: "Pomodoro Timer",
  current: "",
  cycles: 3,
  playing: false,
  stopped: true,
  work: 2,
  short_break: 2,
  long_break: 2,
  clock: 0,
  partition: 0,
}


const PomodoroTimer = (props: any) => {
  const [expand, setExpand] = useState(false);
  const [times, setTimes] = useState(initData);

  const togglePlay = () => {
    setTimes((prev) => {
      return { 
        ...prev, 
        playing: !prev.playing,
        stopped: false,
      }
    });
  };

  const handleStop = () => {
    setTimes((prev) => {
      return { 
        ...prev, 
        playing: false,
        stopped: true,
      }
    });
  };

  const calcCycle = ({clock, work, short_break, long_break}: {[key:string]: number}) => {
    const result = Math.ceil((clock - long_break - work) / (work + short_break));
    return result < 0 ? 0 : result;
  };

  const calcTotalTime = ({cycles, work, short_break, long_break}: {[key:string]: number}) => {
    return ((work + short_break) * cycles + long_break + work);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (times.playing) {
      timer = setInterval(() => {
        setTimes((prev: any) => {
          let { partition, current, clock } = prev;
          if (partition === 0) {
            if(calcCycle(prev) === 0) {
              current = current === "work" ? "long_break" : "work";
            } else {
              current = current === "work" ? "short_break" : "work";
            }
            partition = prev[current];
          }
          if (clock === 0) {
            return {
              ...prev,
              playing: false,
              current: "",
              clock: calcTotalTime(prev),
            };
          }
          return {
            ...prev,
            current,
            partition: !partition ? partition : partition - 1,
            clock: clock - 1,
          }
        });
      }, 1000);
    } else if (times.clock !== calcTotalTime(times) && times.stopped) {
      setTimes(prev => ({
        ...prev,
        clock: calcTotalTime(prev),
        partition: prev.work,
        current: "work",
      }));
    }
    return () => (clearInterval(timer));
  }, [times]);

  return (
    <div className="pomodoro-display">
      <Button
        onClick={(e: any) => setExpand((prev: boolean) => (!prev))}
      >
        { (expand && "shrink") || "expand" }
      </Button>
      { (expand && (
        <PomodoroForm 
          pomo_timer={times}
          setPomoTimer={setTimes}
        />
      )) || ( 
        <>
          <div>
            <label>Name</label>
            <input type="text" disabled={true} value={times.name} />
          </div>
          <div>
            <label>Work</label>
            <StepInputTimer disabled
              value={times.current === "work" ? times.partition : times.work}
            />
          </div>
          <div>
            <label>Short break</label>
            <StepInputTimer disabled
              value={times.current === "short_break" ? times.partition : times.short_break}
            />
          </div>
          <div>
            <label>Cycles remaining</label>
            <StepInputInt disabled
              value={calcCycle(times)}
            />
          </div>
          <div>
            <label>Long break</label>
            <StepInputTimer disabled
              value={times.current === "long_break" ? times.partition : times.long_break}
            />
          </div>
          <div>
            <label>Time remaining</label>
            <StepInputTimer disabled
              value={times.clock}
            />
          </div>
          <Button
            play={times.playing}
            pause={!times.playing}
            onClick={() => togglePlay()}
          >
            { (times.playing && 
              <i className="far fa-pause-circle fa-lg"></i>) ||
              <i className="far fa-play-circle fa-lg"></i>
            }
          </Button>
          <Button
            stop
            onClick={() => handleStop()}
          >
            <i className="far fa-stop-circle fa-lg"></i>
          </Button>
        </>
      )}
    </div>
  );
};

export default PomodoroTimer;
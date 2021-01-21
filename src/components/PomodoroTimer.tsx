import React, { useEffect, useState } from 'react';
import Button from './Button'
import PomodoroForm from './PomodoroForm';
import './PomodoroTimer.scss';
import StepInputTimer from './StepInputTimer';
import StepInputInt from './StepInputInt';

interface IObject {
  [key: string]: any;
}

interface Sound {
  id: number;
  file: string;
};

const timerData = [
  {
    id: 1,
    name: "Classic Pomodoro",
    current: "",
    cycles: 2,
    playing: false,
    stopped: true,
    work: 25 * 60,
    short_break: 5 * 60,
    long_break: 35 * 60,
    short_b_start_sound: "",
    short_b_end_sound: "",
    long_b_start_sound: "",
    long_b_end_sound: "",
    clock: 0,
    partition: 0,
  },
  {
    id: 2,
    name: "Classic Eye-Strain",
    current: "",
    cycles: 3,
    playing: false,
    stopped: true,
    work: 2,
    short_break: 2,
    long_break: 2,
    short_b_start_sound: "",
    short_b_end_sound: "",
    long_b_start_sound: "",
    long_b_end_sound: "",
    clock: 0,
    partition: 0,
  },
  {
    id: 3,
    name: "Classic 50-7",
    current: "",
    cycles: 3,
    playing: false,
    stopped: true,
    work: 50 * 60,
    short_break: 7 * 60,
    long_break: 0,
    short_b_start_sound: "",
    short_b_end_sound: "",
    long_b_start_sound: "",
    long_b_end_sound: "",
    clock: 0,
    partition: 0,
  },
  
];

const sounds: Sound[] = [
  {id: 1, file: "test1.mp3"},
  {id: 2, file: "test2.mp3"},
  {id: 3, file: "test3.mp3"},
];

const timers = [
  { id: 1, name: "Classic Pomodoro"},
  { id: 2, name: "Classic Eye-Strain"},
  { id: 3, name: "Classic 50-7"},
];


const PomodoroTimer = (props: any) => {
  const [expand, setExpand] = useState(false);
  const [curTimer, setCurTimer] = useState(1);
  const [times, setTimes] = useState(timerData[0]);

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

  const calcCycle = ({clock, work, short_break, long_break}: IObject) => {
    const result = Math.ceil((clock - long_break - work) / (work + short_break));
    return result < 0 ? 0 : result;
  };

  const calcTotalTime = ({cycles, work, short_break, long_break}: IObject) => {
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
    } else if (times.stopped) {
      setTimes(prev => ({
        ...prev,
        clock: calcTotalTime(prev),
        partition: prev.work,
        current: "work",
      }));
    }
    return () => (clearInterval(timer));
  }, [times.stopped, times.playing]);

  useEffect(() => {
    const new_timer = timerData.find((data) => curTimer === data.id);
    if (!new_timer) return;
    setTimes(new_timer);
  }, [curTimer]);

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
          timer={curTimer}
          changeTimer={setCurTimer}
          sounds={sounds}
          timers={timers}
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
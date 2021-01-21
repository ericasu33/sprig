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
    id: 0,
    name: "New Pomodoro",
    cycles: 0,
    work: 0,
    short_break: 0,
    long_break: 0,
    short_b_start_sound: 0,
    short_b_end_sound: 0,
    long_b_start_sound: 0,
    long_b_end_sound: 0,
  },
  {
    id: 1,
    name: "Classic Pomodoro",
    cycles: 2,
    work: 25 * 60,
    short_break: 5 * 60,
    long_break: 35 * 60,
    short_b_start_sound: 0,
    short_b_end_sound: 0,
    long_b_start_sound: 0,
    long_b_end_sound: 0,
  },
  {
    id: 2,
    name: "Classic Eye-Strain",
    cycles: 3,
    work: 2,
    short_break: 2,
    long_break: 2,
    short_b_start_sound: 0,
    short_b_end_sound: 0,
    long_b_start_sound: 0,
    long_b_end_sound: 0,
  },
  {
    id: 3,
    name: "Classic 50-7",
    cycles: 3,
    work: 50 * 60,
    short_break: 7 * 60,
    long_break: 0,
    short_b_start_sound: 0,
    short_b_end_sound: 0,
    long_b_start_sound: 0,
    long_b_end_sound: 0,
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
  const [curTimer, setCurTimer] = useState(timerData[0].name);
  const [times, setTimes]: [any, any] = useState(timerData[0]);
  const [activeTimer, setActiveTimer] = useState({
    playing: false,
    stopped: true,
    current: "work",
    clock: 0,
    partition: 0,
  });

  const togglePlay = () => {
    setActiveTimer((prev) => {
      return { 
        ...prev, 
        playing: !prev.playing,
        stopped: false,
      }
    });
  };

  const handleStop = () => {
    setActiveTimer((prev) => {
      return { 
        ...prev, 
        playing: false,
        stopped: true,
      }
    });
  };

  const calcCycle = ({clock, work, short_break, long_break}: IObject) => {
    if (!work && ! short_break) return 0;
    const result = Math.ceil((clock - long_break - work) / (work + short_break));
    return result < 0 ? 0 : result;
  };

  const calcTotalTime = ({cycles, work, short_break, long_break}: IObject) => {
    return ((work + short_break) * cycles + long_break + work);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (activeTimer.playing) {
      const {cycles, work, short_break, long_break} = times;
      timer = setInterval(() => {
        setActiveTimer((prev: any) => {
          let { partition, current, clock } = prev;
          if (partition === 0) {
            if(calcCycle({clock, work, short_break, long_break}) === 0) {
              current = current === "work" ? "long_break" : "work";
            } else {
              current = current === "work" ? "short_break" : "work";
            }
            partition = times[current];
          }
          if (clock === 0) {
            return {
              ...prev,
              playing: false,
              current: "",
              clock: calcTotalTime({cycles, work, short_break, long_break}),
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
    } else if (activeTimer.stopped) {
      setActiveTimer(prev => ({
        ...prev,
        clock: calcTotalTime(times),
        partition: times.work,
        current: "work",
      }));
    }
    return () => (clearInterval(timer));
  }, [activeTimer.stopped, activeTimer.playing, times]);

  useEffect(() => {
    let new_timer = timerData.find((data) => curTimer.toLowerCase() === data.name.toLowerCase());
    if (!new_timer) {
      setTimes((prev: any) => {
        return {
          ...prev,
          id: -1,
          name: curTimer,
        }
      });
    } else {
      setTimes(new_timer);
    }
    setActiveTimer((prev) => {
      return {
        ...prev,
        playing: false,
        stopped: true,
      };
    });
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
          disabled={activeTimer.playing}
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
              value={activeTimer.current === "work" ? activeTimer.partition : times.work}
            />
          </div>
          <div>
            <label>Short break</label>
            <StepInputTimer disabled
              value={activeTimer.current === "short_break" ? activeTimer.partition : times.short_break}
            />
          </div>
          <div>
            <label>Cycles remaining</label>
            <StepInputInt disabled
              value={calcCycle({...times, clock: activeTimer.clock})}
            />
          </div>
          <div>
            <label>Long break</label>
            <StepInputTimer disabled
              value={activeTimer.current === "long_break" ? activeTimer.partition : times.long_break}
            />
          </div>
          <div>
            <label>Time remaining</label>
            <StepInputTimer disabled
              value={activeTimer.clock}
            />
          </div>
          <Button
            play={activeTimer.playing}
            pause={!activeTimer.playing}
            onClick={() => togglePlay()}
          >
            { (activeTimer.playing && 
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
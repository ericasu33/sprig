import React, { useEffect, useState } from 'react';
import Button from './Button'
import PomodoroForm from './PomodoroForm';
import StepInputTimer from './StepInputTimer';
import StepInputInt from './StepInputInt';

import './PomodoroTimer.scss';

interface IObject {
  [key: string]: any;
}

const PomodoroTimer = (props: any) => {
  const [expand, setExpand] = useState(false);
  const [curTimer, setCurTimer] = useState(props.timers && {
    id: props.timers[0].id,
    name: props.timers[0].name,
  });
  const [timer, setTimer]: [any, any] = useState(props.timers && props.timers[0]);
  const [clock, setClock] = useState({
    playing: false,
    stopped: true,
    current: "work",
    time: 0,
    partition: 0,
  });

  const togglePlay = () => {
    setClock((prev) => {
      return { 
        ...prev, 
        playing: !prev.playing,
        stopped: false,
      }
    });
  };

  const handleStop = () => {
    setClock((prev) => {
      return { 
        ...prev, 
        playing: false,
        stopped: true,
      }
    });
  };

  const calcCycle = ({time, work, short_break, long_break}: IObject) => {
    if (!work && ! short_break) return 0;
    const result = Math.ceil((time - long_break - work) / (work + short_break));
    return result < 0 ? 0 : result;
  };

  const calcTotalTime = ({cycles, work, short_break, long_break}: IObject) => {
    return ((work + short_break) * cycles + long_break + work);
  };

  useEffect(() => {
    if (clock.playing) {
      const {cycles, work, short_break, long_break} = timer;
      const interval: NodeJS.Timeout = setInterval(() => {
        setClock((prev: any) => {
          let { partition, current, time } = prev;
          if (partition === 0) {
            if(calcCycle({time, work, short_break, long_break}) === 0) {
              current = current === "work" ? "long_break" : "work";
            } else {
              current = current === "work" ? "short_break" : "work";
            }
            partition = timer[current];
          }
          if (time === 0) {
            return {
              ...prev,
              playing: false,
              current: "",
              time: calcTotalTime({cycles, work, short_break, long_break}),
            };
          }
          return {
            ...prev,
            current,
            partition: !partition ? partition : partition - 1,
            time: time - 1,
          }
        });
      }, 1000);
      return () => (clearInterval(interval));
    }
    if (clock.stopped) {
      setClock(prev => ({
        ...prev,
        time: calcTotalTime(timer),
        partition: timer.work,
        current: "work",
      }));
    }
  }, [clock.stopped, clock.playing, timer]);

  useEffect(() => {
    setClock(prev => ({
      ...prev,
      time: calcTotalTime(timer),
      partition: timer.work,
      current: "work",
    }));
  }, [timer]);

  useEffect(() => {
    let new_timer = props.timers.find((data: any) => curTimer.id === data.id);
    if (!new_timer) {
      setTimer((prev: any) => {
        return {
          ...prev,
          uid: null,
          id: curTimer.id,
          name: curTimer.name,
        }
      });
    } else {
      setTimer(new_timer);
    }
    setClock((prev) => {
      return {
        ...prev,
        playing: false,
        stopped: true,
      };
    });
  }, [curTimer, props.timers]);

  const handleSave = (timer: any) => {
    if (timer.uid === 0) {
      console.log("can't edit timer :(", timer);
      return;
    }
    const id = props.saveTimer(timer);
    setCurTimer((prev: any) => {
      return {
        id,
        name: prev.name,
      }
    });
  };

  return (
    <>
      <h4 className="section-header pm-header">POMODORO TIMER</h4>
      <div className="pomodoro-display">

        <div className='pm-group'>
          <Button expand onClick={() => setExpand((prev: boolean) => (!prev))}>
            { (expand && "shrink") || "expand" }
          </Button>
        </div>

        { (expand && (
          <>
            <PomodoroForm 
              disabled={clock.playing}
              pomo_timer={timer}
              setPomoTimer={setTimer}
              changeTimer={setCurTimer}
              sounds={props.sounds}
              timers={props.timers}
              onSave={() => handleSave(timer)}
            />
          </>
        )) || ( 
          <>
            <div className='pm-group'>
              <label>Name</label>
              <input className='pm-name' type="text" disabled={true} value={timer.name} />
            </div>

            <div className='pm-group'>
              <label>Work</label>
              <StepInputTimer disabled
                value={clock.current === "work" ? clock.partition : timer.work}
              />
            </div>
            
            <div className='pm-group'>
              <label>Short break</label>
              <StepInputTimer disabled
                value={clock.current === "short_break" ? clock.partition : timer.short_break}
              />
            </div>
            
            <div className='pm-group'>
              <label>Cycles remaining</label>
              <StepInputInt disabled
                value={calcCycle({...timer, time: clock.time})}
              />
            </div>
            
            <div className='pm-group'>
              <label>Long break</label>
              <StepInputTimer disabled
                value={clock.current === "long_break" ? clock.partition : timer.long_break}
              />
            </div>
            
            <div className='pm-group'>
              <label>Time remaining</label>
              <StepInputTimer disabled
                value={clock.time}
              />
            </div>

            <div className='pm-right-buttons'>
              <Button 
                play={!clock.playing}
                pause={clock.playing}
                onClick={() => togglePlay()}
              />
              <Button stop onClick={() => handleStop()} />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default PomodoroTimer;

import React, { useEffect, useState } from 'react';
import Button from 'components/Button'
import PomodoroForm from './PomodoroForm';
import StepInputTimer from 'components/StepInputTimer';
import StepInputInt from 'components/StepInputInt';

import { ITimer, IClock } from 'ts-interfaces/interfaces';

import './PomodoroTimer.scss';

const PomodoroTimer = (props: any) => {
  const [expand, setExpand] = useState(false);
  const [curTimer, setCurTimer]: [{id: number | null, name: string}, Function] = useState({
    id: 1,
    name: "Loading",
  });
  const [timer, setTimer]: [ITimer, Function] = useState({
    id: null,
    uid: null,
    name: "",
    cycles: 0,
    work: 0,
    short_break: 0,
    long_break: 0,
    short_b_start_sound: null,
    short_b_end_sound: null,
    long_b_start_sound: null,
    long_b_end_sound: null,
  });
  const [clock, setClock]: [IClock, Function] = useState({
    playing: false,
    stopped: true,
    current: "work",
    time: 0,
    partition: 0,
  });

  const togglePlay = () => {
    setClock((prev: IClock) => {
      return { 
        ...prev, 
        playing: !prev.playing,
        stopped: false,
      }
    });
  };

  const handleStop = () => {
    setClock((prev: IClock) => {
      return { 
        ...prev, 
        playing: false,
        stopped: true,
      }
    });
  };

  const calcCycle = (time: number, { work, short_break, long_break}: ITimer) => {
    if (!work && ! short_break) return 0;
    const result = Math.ceil((time - long_break - work) / (work + short_break));
    return result < 0 ? 0 : result;
  };

  const calcTotalTime = ({cycles, work, short_break, long_break}: ITimer) => {
    return ((work + short_break) * cycles + long_break + work);
  };

  useEffect(() => {
    if (clock.playing) {
      const interval: NodeJS.Timeout = setInterval(() => {
        setClock((prev: IClock) => {
          let { partition, current, time } = prev;
          if (partition === 0) {
            if(calcCycle(time, timer) === 0) {
              current = current === "work" ? "long_break" : "work";
            } else {
              current = current === "work" ? "short_break" : "work";
            }
            if (current === "work") partition = timer.work;
            else if (current === "short_break") partition = timer.short_break;
            else if (current === "long_break") partition = timer.long_break;
          }
          if (time === 0) {
            return {
              ...prev,
              playing: false,
              current: "",
              time: calcTotalTime(timer),
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
      setClock((prev: IClock) => ({
        ...prev,
        time: calcTotalTime(timer),
        partition: timer.work,
        current: "work",
      }));
    }
  }, [clock.stopped, clock.playing, timer]);

  useEffect(() => {
    setClock((prev: IClock) => ({
      ...prev,
      time: calcTotalTime(timer),
      partition: timer.work,
      current: "work",
    }));
  }, [timer]);

  useEffect(() => {
    let new_timer = props.timers.find((data: any) => curTimer.id === data.id);
    if (!new_timer) {
      setTimer((prev: ITimer) => {
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
    setClock((prev: IClock) => {
      return {
        ...prev,
        playing: false,
        stopped: true,
      };
    });
  }, [curTimer, props.timers]);

  const handleSave = (timer: any) => {
    if (timer.uid === 0) {
      return;
    }
    const promise = props.saveTimer(timer);
    promise.then((id: number | null) => {
      if (!id) return;
      setCurTimer((prev: any) => {
        return {
          id: id,
          name: prev.name,
        };
      });
    });

  };

  return (
    <>
      <h4 className="section-header pm-header">POMODORO TIMER</h4>
      <div className="pomodoro-display">


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
              onShrink={() => setExpand((prev: boolean) => (!prev))}
            />
          </>
        )) || ( 
          <>
            <div className='pm-group'>
              <Button expand onClick={() => setExpand((prev: boolean) => (!prev))}>
                expand
              </Button>
            </div>
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
                value={calcCycle(clock.time, timer)}
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

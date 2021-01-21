import React, { useEffect, useState } from 'react';
import Button from './Button'
import PomodoroForm from './PomodoroForm';
import './PomodoroTimer.scss';
import StepInputTimer from './StepInputTimer';
import StepInputInt from './StepInputInt';

interface IObject {
  [key: string]: any;
}

const PomodoroTimer = (props: any) => {
  const [expand, setExpand] = useState(false);
  const [curTimer, setCurTimer] = useState(props.timers && props.timers[0].name);
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
    let interval: NodeJS.Timeout;
    if (clock.playing) {
      const {cycles, work, short_break, long_break} = timer;
      interval = setInterval(() => {
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
    } else if (clock.stopped) {
      setClock(prev => ({
        ...prev,
        time: calcTotalTime(timer),
        partition: timer.work,
        current: "work",
      }));
    }
    return () => (clearInterval(interval));
  }, [clock.stopped, clock.playing, timer]);

  useEffect(() => {
    let new_timer = props.timers.find((data: any) => curTimer.toLowerCase() === data.name.toLowerCase());
    if (!new_timer) {
      setTimer((prev: any) => {
        return {
          ...prev,
          id: -1,
          name: curTimer,
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

  const handleViewChange = () => {
    if (timer.id < 0) {
      props.addTimer(timer);
    }
    setExpand((prev: boolean) => (!prev));
  };

  return (
    <div className="pomodoro-display">
      <Button
        onClick={() => handleViewChange()}
      >
        { (expand && "shrink") || "expand" }
      </Button>
      { (expand && (
        <PomodoroForm 
          disabled={clock.playing}
          pomo_timer={timer}
          setPomoTimer={setTimer}
          timer={curTimer}
          changeTimer={setCurTimer}
          sounds={props.sounds}
          timers={props.timers}
        />
      )) || ( 
        <>
          <div>
            <label>Name</label>
            <input type="text" disabled={true} value={timer.name} />
          </div>
          <div>
            <label>Work</label>
            <StepInputTimer disabled
              value={clock.current === "work" ? clock.partition : timer.work}
            />
          </div>
          <div>
            <label>Short break</label>
            <StepInputTimer disabled
              value={clock.current === "short_break" ? clock.partition : timer.short_break}
            />
          </div>
          <div>
            <label>Cycles remaining</label>
            <StepInputInt disabled
              value={calcCycle({...timer, time: clock.time})}
            />
          </div>
          <div>
            <label>Long break</label>
            <StepInputTimer disabled
              value={clock.current === "long_break" ? clock.partition : timer.long_break}
            />
          </div>
          <div>
            <label>Time remaining</label>
            <StepInputTimer disabled
              value={clock.time}
            />
          </div>
          <Button
            play={clock.playing}
            pause={!clock.playing}
            onClick={() => togglePlay()}
          >
            { (clock.playing && 
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
import React, { useEffect, useState } from 'react';
import Button from './Button'
import './PomodoroTimer.scss';

interface IObject {
  [key: string]: any;
}
const initData: IObject = {
  current: "",
  cycles: 3,
  playing: false,
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
      return { ...prev, playing: !prev.playing }
    })
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (times.playing) {
      if (!times.clock && times.cycles > 0) {
        setTimes(prev => ({
          ...prev,
          clock: (prev.work + prev.short_break) * prev.cycles + prev.long_break + prev.work,
          partition: prev.work,
          current: "work",
        }));
      }
      timer = setInterval(() => {
        setTimes((prev: any) => {
          let { partition, current, cycles } = prev;
          if (partition === 0) {
            if(cycles === 0) {
              current = current === "work" ? "long_break" : "work";
            } else {
              current = current === "work" ? "short_break" : "work";
              cycles = current === "work" ? cycles - 1 : cycles;
            }
            partition = prev[current];
          }
          if (prev.clock === 0) {
            return {
              ...prev,
              playing: false,
              current: "",
              cycles: 3,
            }
          }
          return {
            ...prev,
            current,
            partition: partition - 1,
            clock: prev.clock - 1,
            cycles,
          }
        })
      }, 1000);
    }
    return () => (clearInterval(timer));
  }, [times.playing, times.current]);

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
            <input type="text" disabled={true} value={times.current === "work" ? times.partition : times.work} />
          </div>
          <div>
            <label>Short break</label>
            <input type="text" disabled={true} value={times.current === "short_break" ? times.partition : times.short_break} />
          </div>
          <div>
            <label>Cycles remaining</label>
            <input type="text" disabled={true} value={times.cycles} />
          </div>
          <div>
            <label>Long break</label>
            <input type="text" disabled={true} value={times.current === "long_break" ? times.partition : times.long_break} />
          </div>
          <div>
            <label>Time remaining</label>
            <input type="text" disabled={true} value={times.clock} />
          </div>
          <Button
            play={times.playing}
            pause={!times.playing}
            onClick={() => togglePlay()}
          >
            { (times.playing && 
              <i className="far fa-play-circle fa-lg"></i>) ||
              <i className="far fa-pause-circle fa-lg"></i>
            }
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
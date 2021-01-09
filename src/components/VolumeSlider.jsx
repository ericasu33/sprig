import React, { useState } from 'react';
import './VolumeSlider.scss'

const VolumeSlider = () => {
  const [volume, setVolume] = useState(1)
  const [muted, setMuted] = useState(false)
  const finalVolume = muted ? 0 : volume ** 2

  return (
    <>
      <section>
        <div id="player">
          <i className="fa fa-volume-down" />
          <input
            id="volume"
            type="range"
            min={0}
            max={1}
            step={0.02}
            value={volume}
            onChange={(e) => setVolume(e.target.valueAsNumber)}
          />
          <i className="fa fa-volume-up" />
        </div>

        <div>
          <button
            onClick={() => setMuted(prev => !prev)}
          >
            {muted ? "unmute" : "mute"}
          </button>
        </div>
      </section>

      <div>
        <p>Final Volume: {finalVolume.toFixed(3)}</p>
      </div>
    </>
  );
};

export default VolumeSlider;
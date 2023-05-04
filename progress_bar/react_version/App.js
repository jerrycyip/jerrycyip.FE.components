import { useState } from 'react';
import ProgressBar from './ProgressBar';

import './styles.css';

const INIT_VALUE = 50;

export default function App() {
  const [ progressValue, setProgressValue ] = useState(INIT_VALUE);

  function handleChange(newValue){
    setProgressValue(newValue);
  }

  return (
    <div className="progress-wrapper">
        <ProgressBar value={20} />    
        <ProgressBar value={80} />
      <div>
        <label for="slider-input">
          Control Progress
        </label>
        <input
          id="slider-input"
          type="range"
          min={0}
          max={100}
          value={progressValue}
          onChange={(event) => {
            handleChange(event.target.value)
            }}/>
      </div>
        <ProgressBar value={progressValue} />

    </div>
  );
}

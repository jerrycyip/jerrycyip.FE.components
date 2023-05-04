const MIN = 0;
const MAX = 100;

export default function ProgressBar({value}) {
  //handle invalid vals and convert them to be w/in range  
  const boundedValue = Math.min( MAX, Math.max(MIN, value));
  
  return (
    <div className="progress-bar-container">
      <div
        className="progress-bar"
        style={{ width: `${boundedValue}%`}}
        role="progressbar"
        aria-valuenow={boundedValue}
        aria-valuemin={MIN}
        aria-valuemax={MAX}>
      {boundedValue}%
      </div>
    </div>
  ); 
}

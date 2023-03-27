const MIN = 0;
const MAX = 100;

export default function ProgressBar({value}) {
  // handle invalid vals and convert them to be w/in range
  const clampedValue = Math.min(Math.max(value, MIN), MAX);

  return (
    <div className="progress">
      <div
        className="progress-bar"
        style={{ width: `${clampedValue}%` }}
        role ="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={MIN}
        aria-valuemax={MAX}>
        {clampedValue}%
      </div>
    </div>
  ); 
}

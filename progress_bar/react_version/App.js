/*
Filling the bar proportionately to the progress (a number between 0-100, inclusive) can be 
accomplished using the style attribute on React elements. Since the value is dynamic, we 
cannot possibly write classes for it beforehand and we have to use inline styles.
*/

import ProgressBar from './ProgressBar';

import './styles.css';

export default function App() {
  return (
    <div className="wrapper">
      <ProgressBar value={0} />
      <ProgressBar value={25} />
      <ProgressBar value={50} />
      <ProgressBar value={75} />
      <ProgressBar value={100} />
      <ProgressBar value={2} />
      <ProgressBar value={-10} />
      <ProgressBar value={120} />
    </div>
  );
}
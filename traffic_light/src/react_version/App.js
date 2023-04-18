import TrafficLight from './TrafficLight';

import './styles.css';

const config = {
  green: {
    backgroundColor: 'green',
    duration: 2100,
    next: 'yellow',
  },
  yellow: {
    backgroundColor: 'yellow',
    duration: 700,
    next: 'red',
  },
  red: {
    backgroundColor: 'red',
    duration: 2200,
    next: 'green',
  },
};

export default function App() {
  return (
    <div className="wrapper">
      <TrafficLight config={config} />
      <TrafficLight config={config} layout="horizontal" />
    </div>
  );
}

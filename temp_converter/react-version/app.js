import {useState} from 'react';

import './styles.css';

// func to round to 4 dec places as necessary
function format(number) {
  // show 4 dec places if number has more than 4 dec places
  return /\.\d{5}/.test(number)
    ? Number(number).toFixed(4)
    : number;
}

export default function App() {
  const [celsius, setCelsius] = useState('');
  const [fahrenheit, setFahrenheit] = useState('');

  // func for temp conversion
  function convert(value, setDestination, calculateValue) {
    // convert input string to num    
    const numericValue = Number(value);
    // check for non-nums and non-null/undefined values and blank spaces (trim)
    const isValid =
      !Number.isNaN(numericValue) && Boolean(value.trim());
      // apply formula and format if valid else display blank
      setDestination(
      isValid ? format(calculateValue(numericValue)) : '',
    );
  }

  return (
    <div>
      <div className="temperature-converter">
        {/* Use a label for better a11y */}
        <div className="temp-box">  
          <input
            id="celsius-input"
            value={celsius}
            onChange={(event) => {
              const newValue = event.target.value;
              setCelsius(newValue);
              convert(newValue,
                    setFahrenheit,
                    (value) => (value * 9) / 5 + 32,
                    );
            }}
            />
          <label 
            htmlFor="celsius-input" 
            className="temperature-converter-column"
            >
          Celsius
          </label>
        </div>
        <span className="temp-top-row">
        =
        </span>
        <div className="temp-box">  
          <input
            id="fahrenheit-input"
            value={fahrenheit}
            onChange={(event) => {
              const newValue = event.target.value;
              setFahrenheit(newValue);
              convert(newValue,
                    setCelsius,
                    (value) => (value - 32) * 5 / 9,
                    );
            }}
            />
          <label 
            htmlFor="fahrenheit-input" 
            className="temperature-converter-column"
            >
          Fahrenheit
          </label>
        </div>
      </div>
    </div>       
  )
}
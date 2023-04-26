import { useEffect, useState } from 'react';

// non-changing constant vars:
// css styles for complete square top/bottom half of 7-segment digit display
const All_SIDES = [ 
    'digit-square-border-top',
    'digit-square-border-bottom',
    'digit-square-border-left',
    'digit-square-border-right'
];

// create object storing each 7-segment digit's assoc styling classes
// as divided between top and bottom half squares of digit
const NUMBER_TO_CLASSES = {
    0: {
        top: [
            'digit-square-border-top',
            'digit-square-border-left',
            'digit-square-border-right',
        ],
        bottom: [
            'digit-square-border-bottom',
            'digit-square-border-left',
            'digit-square-border-right',
        ],
    },
    1: {
        top: ['digit-square-border-right'],
        bottom: ['digit-square-border-right'],
    },
    2: {
        top: [
            'digit-square-border-top',
            'digit-square-border-right',
            'digit-square-border-bottom',
        ],
        bottom: [
            'digit-square-border-top',
            'digit-square-border-left',
            'digit-square-border-bottom',
        ],
    },
    3: {
        top: [
            'digit-square-border-top',
            'digit-square-border-right',
            'digit-square-border-bottom',
        ],
        bottom: [
            'digit-square-border-top',
            'digit-square-border-right',
            'digit-square-border-bottom',
        ],
    },
    4: {
        top: [
            'digit-square-border-bottom',
            'digit-square-border-left',
            'digit-square-border-right'
        ],
        bottom: [
            'digit-square-border-top',
            'digit-square-border-right',
        ]
    },
    5: {
      top: [
        'digit-square-border-top',
        'digit-square-border-left',
        'digit-square-border-bottom',
      ],
      bottom: [
        'digit-square-border-top',
        'digit-square-border-right',
        'digit-square-border-bottom',
      ],
    },
    6: {
      top: [
        'digit-square-border-top',
        'digit-square-border-left',
        'digit-square-border-bottom',
      ],
      bottom: All_SIDES,
    },
    7: {
      top: [
        'digit-square-border-top',
        'digit-square-border-right',
      ],
      bottom: ['digit-square-border-right'],
    },
    8: {
      top: All_SIDES,
      bottom: All_SIDES,
    },
    9: {
      top: All_SIDES,
      bottom: [
        'digit-square-border-top',
        'digit-square-border-right',
        'digit-square-border-bottom',
      ],
    },
  };

export default function Clock() {
  const date = useCurrentDate();

  let hours = date.getHours() % 12;
  hours = hours === 12 ? 0 : hours;
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const dateTimeDisplay = `${padTwoDigit(
    date.getHours()
    )}:${padTwoDigit(minutes)}:${padTwoDigit(seconds)}`;

 // Use a <time> element with `datetime` attribute set
  // to the current time in 24-hour format so that
  // screen readers can read this component.  
  return (
    <time
      className="digital-clock"
      dateTime={dateTimeDisplay}>
        <Digit number={parseInt(hours / 10, 10)} /> 
        <Digit number={hours % 10} />
        <Separator />
        <Digit number={Math.trunc(minutes / 10)} />
        <Digit number={minutes % 10} />
        <Separator />
        <Digit number={Math.trunc(seconds / 10)} />
        <Digit number={seconds % 10} />
    </time>
  );
}

function useCurrentDate(){
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    // initiate the timer
    const timer = window.setInterval(() => {
      setDate(new Date());
    }, 100);

    // clear the timer upon unmount
    return () => {
      window.clearInterval(timer);
    }
  }, []);

  return date;
}

function padTwoDigit(number) {
  return number >= 10 ? String(number) : `0${number}`;
}

function Digit({number}){
  const {top, bottom} = NUMBER_TO_CLASSES[number];
  // hide as not useful for a11y screen readers
  return (
    <div aria-hidden={true}>
      <div
        className={[
          'digit-square', 
          'digit-square-top', 
          ...top,
          ].join(' ')}
        />
      <div
        className={[
          'digit-square',
          'digit-square-bottom',
          ...bottom,
          ].join(' ')}
        />
    </div>
  );
}

function Separator() {
  return (
    <div
      className="separator">
      <div className="separator-dot" />
      <div className="separator-dot" />
    </div>
  );
}

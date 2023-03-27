//import './styles.css'; // envmt specific

// IFFE best practice to prevent global namespace var collision via private vars
// also ensures module pattern (pre ES6 modules)
 (() => { 

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

  // invoke main fn
  clock(document.getElementById('digital-clock'));

  // main clock fn
  // $ prefix convention for params/vars to indicate DOM elems and ensure familiar syntax with legacy jquery APIs
  function clock($rootEl) {
    const timer = window.setInterval(() => {
      render($rootEl, new Date());
    }, 100); // note: clock renders/starts after first interval

    window.addEventListener('beforeunload', () => {
      window.clearInterval(timer); // clear set interval to prevent memory leaks (older browsers)
    });

    render($rootEl, new Date()); // start the clock immediately in case the interval duration is noticeably long
  }

  // function to render clock components together
  function render($rootEl, date) {
    let hours = date.getHours() % 12; // adjust for 12-hour display format
    hours = hours === 0 ? 12 : hours; // adjust for midnight
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    // for a11y set dateTime attribute to 24-hour format
    const dateTimeDisplay = `
    ${padTwoDigit(date.getHours())}: 
    ${padTwoDigit(minutes)}:
    ${padTwoDigit(seconds)}`;

    const $timeEl = document.createElement('time'); // digital clock element
    $timeEl.classList.add('digital-clock');
    $timeEl.dateTime = dateTimeDisplay; // set dateTime for a11y
    
    $timeEl.append(
      digit(parseInt(hours / 10, 10)), // first digit of hr rounded to nearest Int
      digit(hours % 10),
      separator(),
      digit(Math.trunc(minutes / 10)), // alternative to parseInt (which isn't advised for anything but small nums)
      digit(minutes % 10),
      separator(),
      digit(parseInt(seconds / 10, 10)),
      digit(seconds % 10),
    );

    $rootEl.innerHTML = ''; // teardown any prior renders (best practice)
    $rootEl.appendChild($timeEl); // construct clock
  }

  // format time comps into 2 digit hh:mm:ss format for valid datetime attribute of time tag
  function padTwoDigit(number) {
    return number > 10 ? String(number) : `0${number}`;
  }

  // render a single digit of clock
  function digit(number) {
    const {top, bottom} = NUMBER_TO_CLASSES[number]; // retrieve class styles
    const $digit = document.createElement('div'); // digit's container div for top & bottom square segments
    const $topSquare = document.createElement('div');
    $topSquare.classList.add( // assoc styles for top square half of digit
      'digit-square',
      'digit-square-top', /* adjust width (i.e. height) of square halve's shared top & bottom borders by 1/2 */
      ...top,
    );

    const $bottomSquare = document.createElement('div');
    $bottomSquare.classList.add(
      'digit-square', 
      'digit-square-bottom', /* adjust width (i.e. height) of square halve's shared top & bottom borders by 1/2 */
      ...bottom,
    );

    $digit.append($topSquare, $bottomSquare);
    $digit.setAttribute('aria-hidden', true); // hide as not useful for a11y screen readers
    return $digit;
  }

  // render the colon-like separators
  function separator() {
    const $separator = document.createElement('div');
    $separator.classList.add('separator');

    const $separatorDotTop = document.createElement('div');
    $separatorDotTop.classList.add('separator-dot');

    const $separatorDotBottom = document.createElement('div');
    $separatorDotBottom.classList.add('separator-dot');

    $separator.append($separatorDotTop, $separatorDotBottom);
    $separator.setAttribute('aria-hidden', true); // hide as not useful for screen readers    
    return $separator;
  }

 })()

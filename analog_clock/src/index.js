/*
We can separate out the solution into two parts, 
(i) the update loop
(ii) the rendering.
*/

// IFFE best practice to prevent global namespace var collision via private vars
// also ensures module pattern (pre ES6 modules)
(() => {
  // non-changing constant vars:
  const FULL_ROTATION_DEGREES = 360;

  // initialize clock by calling main function on clock as root Element with desired size in px
  clock(document.getElementById('analog-clock'), 200);

// main function: set interval to desired refresh (e.g. 1 sec) and size paramter in pixels
// $ prefix convention for params/vars to indicate DOM elems and ensure familiar syntax with legacy jquery APIs
  function clock($rootEl, size) {
    const timer = window.setInterval(() => {
      render($rootEl, new Date(), size);
    }, 100); // note: clock renders/starts after first interval

    window.addEventListener('beforeunload', () => {
      window.clearInteval(timer); // clear set interval to prevent memory leaks (older browsers)
    });

    render($rootEl, new Date(), size); // start the clock immediately in case the interval duration is noticeably long
  }

  function render($rootEl, date, size) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    // Percentages used for rotation angle calc of hands
    const secondsPercentage = seconds / 60; 
    const minutesPercentage = 
    (minutes + secondsPercentage) / 60;
    const hoursPercentage = 
    ((hours % 12) + minutesPercentage) / 12;
    
    // translate % to angle rotation for transformation in createHand
    const hourAngle = hoursPercentage * FULL_ROTATION_DEGREES; // translate to deg
    const minutesAngle = minutesPercentage * FULL_ROTATION_DEGREES;
    const secondsAngle = secondsPercentage * FULL_ROTATION_DEGREES;
    // create datetime attribute value for time tag for calendar reminders/search engine results
    const dateTimeDisplay = `${padTwoDigit(hours)}:
    ${padTwoDigit(minutes)}:${padTwoDigit(seconds)}`;

    // create clock element as html time tag
    const $timeEl = document.createElement('time'); 
    $timeEl.classList.add('analog-clock'); // attach approp styling
    $timeEl.dateTime = dateTimeDisplay; // set dateTime for cal reminders & search engine results optimization etc
    $timeEl.setAttribute('style', `--size: ${size}px`); // set size based on input

    // append clock handles w/ varying lengths and widths
    $timeEl.append(
      createHand({ angle: hourAngle, height: 0.5, width: 3}), // hour hand
      createHand({ angle: minutesAngle, height: 0.7, width: 2 }), // minute hand
      createHand({ angle: secondsAngle, height: 0.9, width: 1 }) // seconds hand
    );

    /* clear (teardown) prior clock and replace similar to React render */
    $rootEl.innerHTML = '';
    $rootEl.appendChild($timeEl);
  }
  
// format hh:mm:ss for valid datetime attribute of time tag
  function padTwoDigit(number) { 
    return number >= 10 ? String(number) : `0${number}`; 
  }

  // create clock hands
  function createHand({ angle, height = 1, width = 1 }) {
    const $hand = document.createElement('div');
    $hand.classList.add('clock-hand');
    $hand.setAttribute('aria-hidden', true); // remove hand from accessibility tree
    $hand.style.transform = `rotate(${angle}deg) scaleY(${height}) scaleX(${width})`;
    return $hand;
  }

})();

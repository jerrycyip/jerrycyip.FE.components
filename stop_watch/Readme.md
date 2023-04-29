# Stopwatch

## Description
Build a stopwatch widget which can measure how much time has passed. It shows the current timer and has two buttons underneath: "Start/Stop" and "Reset".

## Requirements
  * Start/Stop Button: Starts/stops the timer depending on whether the timer is running.
  * Reset: Resets the timer to 0 and stops the timer.
  * The timer shows the number of seconds elapsed, down to the millisecond.
    * Clicking on the timer should start/stop the timer. The Start/Stop button's label should update accordingly as well.
    * It'd be a nice optional addition to format the time to display in hh:mm:ss:ms format.

You are free to exercise your creativity to style the appearance of the stopwatch. You can try out [Google's stopwatch widget](https://www.google.com/search?q=stopwatch#cobssid=s) for inspiration and an example.

## Implementation
This question looks simple on first glance but is actually more complex than it seems. Note that setInterval's delay parameter is unreliable. The actual amount of time that elapses between calls to the callback may be longer than the given delay due to [various reasons](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout#reasons_for_delays_longer_than_specified). Because of this behavior, we cannot assume that each time the interval callback is fired, the same duration has passed. We will need to read the current time within the callback code to ensure that we are using the most updated timings.

## State
The tricky part of this question is deciding what goes into the component state and how to manage them. We need a few states:

  * totalDuration: Total time that has passed so far.
  * timerId: Timer ID of the currently running interval timer, or null if there's no currently running timer.
  * lastTickTiming: This is the time that the last interval callback was run. We will keep incrementing the totalDuration by the delta between the current time (Date.now()) and the lastTickTiming. Using this approach, the totalDuration will still be accurate even if the callbacks run at irregular intervals.

Since there are a few buttons in the requirements that has duplicate functionality, we should define these functionality as a few functions that will be triggered by the buttons:

### startTimer
This function kicks off the timer and updates the totalDuration value each time the setInterval callback is run with the delta between the last update time (lastTickTiming) and the current time. We use a interval timing of 1ms since stopwatches are very time sensitive and millisecond-level precision is desired.

### stopInterval
A simple function to stop the interval timer from running (via clearInterval) and clear the current timerId. This is being used by the "Stop" button and "Reset" button.

### resetTimer
We want to reset the component to its initial state in this function. It stops the interval timer by calling stopInterval() and also resets the total duration to 0. It's not important to reset the value of lastTickTiming because it will be set at the start of startTimer(), before the first interval callback is executed. Used by the "Reset" button.

### toggleTimer
A function to toggle between calling stopInterval() and startTimer() depending on whether there's a current timer. Used by the time display and the "Start"/"Stop" button.

## Special Note
Because the time digits are constantly being re-rendered via the renderTime() loop, the digits don't respond to clicks well. As a workaround, we add a persistent DOM element to cover the digits and ensure that all the clicks go through.

## Test Cases
  * Click the "Start" button to start the timer. Observe that:
    * The time increases constantly and shows the correct value.
    * The "Start" button now shows "Stop".
  * Click "Stop" while the timer is running. Observe that:
    * The time stops increasing.
    * The "Stop" button now shows "start".
  * Click the "Start" button after having stopped the timer. Observe that:
    * The time increases from the stopped timing and shows the correct value.
    * The "Start" button now shows "Stop".
  * Click the "Reset" button while:
    * The timer is running. The timer should stop and be reset to 0.
    * The timer is stopped/paused. The timer should be reset to 0.
  * Repeat the above but click on the time instead of the "Start"/"Stop" button.
  * a11y
    * Use Tab to cycle through the buttons.
    *   Be able to use both Spacebar and Enter to interact with the 3 interactive elements.
  
##  Accessibility
People who are unfamiliar with a11y will add an onClick/'click' event to the DOM element rendering the time (usually a <div>) and consider it complete. However, this the timer is not a11y-friendly just by doing so. Some might add tabIndex="0" (to allow focus) and role="button" to the element, which certainly improves the a11y, but is not the best.

For the best a11y, we can and should use a <button> to render the timing, which comes with additional a11y benefits like focus and keyboard support. By using a <button>, you get automatic focus support (be able to use Tab to focus onto the timer) and keyboard support (hit the Spacebar to start/stop the timer). The latter will not be possible without custom code to add key event listeners to non-interactive elements.

## User Experience
user-select: none is added to the timer so that the digits aren't selected if a user double clicks on them. Selecting the digits is usually not desired.
# Analog Clock

## Description
Create a widget that renders the current time within an analog clock display, where the clock hands move and update like a real clock.

Here's an example of an analog clock, but you can exercise your creativity by choosing different colors and styling it differently. It should however still function as a clock.

![analog_clock](./analog_clock_sample.png)

## Implementation
We can separate out the solution into two parts, the update loop and the rendering.

## Update Loop
We need a timer to refresh the page and render the current time every second. To create the timer, we can use setInterval and kick off the update loop when the clock is initialized.

The beforeunload event is fired when the tab/window is about to be closed. As a good practice it is good to clear all active intervals before the tab/window closes because in some old browsers, not doing that could result in memory leaks. In most browsers these days, it's not that important to do so.

Note: This part is exactly the same as the Digital Clock question.

## Rendering
To make the clock more reusable and customizable, we can make the clock size as a parameter. The clock hands can then be a proportion of the clock's size.

To render the clock hands in the right position, we use a combination of "position: absolute" and CSS transforms:

  1. position: absolute with top and left of half the clock size to make the hands start from the center of the clock. However, the hands will be pointing downwards.
  2. Use transform: rotate(180deg) on the clock to make the hands point upwards. This step is optional if we add an 180 degree offset to the rotation angle of the hands.
  3. Use transform-origin: center top to make the hands rotate around the center of the clock.
  4. Use transform: rotate(Xdeg) on the hands to rotate them into the final angle.

## Test Cases
  * See that the second hand updates every second.
  * Observe the clock for a minute to see that the minute hand updates correctly (gradually moved since the observation started).
  * Check that the hour hand's position is different when it's not an exact hour, aka the hour hand's position at 12.00pm and 12.30pm should be different.

## Notes
The update frequency of the timer depends on how accurate we want the clock to be. The maximum we can set is 1000ms, however, the clock's accuracy might be off by 1000ms in the case we load the page nearing the last millisecond of the second. However, using too small of an interval can be quite expensive because of too frequent updates. Hence a middleground we've chosen is 100ms. The clock can only ever be off by 100ms, which is not very noticeable by humans.

The current date/time should be polled in each loop, as opposed to recording the time when the clock was first rendered and incrementing based on the interval duration of the timer because the invocations of the loop can be delayed by processes hogging the main thread and the loop may not run at every fixed interval.

## Accessibility
For a11y reasons, use a <time> element with datetime attribute set to the current time in 24-hour format so that screen readers can read this component. Otherwise the component will be ignored by screen readers, which is bad. Add the aria-hidden attribute to the internals of <time> since they are for presentation purposes and not useful to screen readers.
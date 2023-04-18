# Traffic Light

## Description
Build a traffic light where the lights switch from green to yellow to red after predetermined intervals and loop indefinitely. Each light should be lit for the following duration guidelines or a variation thereof:

  * Red light: 2500ms
  * Yellow light: 1500ms
  * Green light: 3000ms

You are free to exercise your creativity to style the appearance of the traffic light.

## Implementation

## Data Model
Traffic lights are simple state machines where each color is a state and each state is shown for a fixed duration before moving to the next. We can capture the state information (how long to remain in each color for and which color to transition to) using a simple JavaScript object:

  const config = {
    red: {
      backgroundColor: 'red',
      duration: 4000,
      next: 'green',
    },
    yellow: {
      backgroundColor: 'yellow',
      duration: 500,
      next: 'red',
    },
    green: {
      backgroundColor: 'green',
      duration: 3000,
      next: 'yellow',
    },
  };

Within the trafficLight component, we only need a single state variable, which is the current color. We also set a timer via setTimeout to transition to the next color by looking up the config object to know what the next color is and when to do so.

The beforeunload event is fired before the tab/window is closed so we clear any running timers when the tab/window is about to be closed.

## Rendering
The rendering of this component is pretty straightforward and can be achieved with Flexbox. With Flexbox, it's also easy to change the layout of the lights from a vertical one to a horizontal one just by changing the flex-direction property.

## Component API
It's a good practice to make components reusable by allowing customization of:

  * What the states are.
  * Next states.
  * Each state's duration.
  * The initial state.

Traffic light layout (certain countries use certain layouts).
We also define the color of each light within the config object so that the component is both state and color agnostic. It's even possible to create 2-colored and 4-colored traffic lights just by modifying the config object without having to modify the component implementation.

## Test Cases
  * Observe that each light show up for the specified duration.
  * Observe that the lights transition to the next state correctly after the specified duration.

## Accessibility
For a11y reasons, we add an aria-label to the component to indicate the current light and aria-live="polite" to announce the current active light. The contents of the component (the lights) are for visual purposes and aren't important to screen readers, they can be hidden with aria-hidden="true".
# Progress Bar - React Version

## Description
An initial ProgressBar.js skeleton component has been created for you. You are free to decide the props of <ProgressBar />.

## Implementation
Filling the bar proportionately to the progress (a number between 0-100, inclusive) can be accomplished using the style attribute on React elements. Since the value is dynamic, we cannot possibly write classes for it beforehand and we have to use inline styles.

## Test Cases
  * Valid values: 25, 50, 75.
  * Boundary values: 0, 100.
  * Invalid values: -10, 120.
  * For small values, the percentage labels are rendered appropriately.
  * Filled bar does not exceed rounded corners.

## Notes
  * overflow: hidden has to be added to .progress-bar because of the rounded corners, so that the filled progress doesn't stick out of the rounded corners.
  * Progress values outside the range of [0, 100] should be handled well; they should not cause layout issues.
  * For small values, there might not be enough space to display the percentage label. We can either not show anything or truncate the display.
  * We can use CSS transforms (e.g. scale) as opposed to changing the width property, which is better for performance if there's a need for animation.

## Accessibility
role="progressbar" and aria values are added to the component for a11y reasons, so that screen readers can accurately depict the component.
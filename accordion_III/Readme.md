# Accordion III

## Description
This is an advanced version of Accordion II. This component challenge is not available in Vanilla JavaScript as it will require a fair bit of code to add keyboard interactions without a JavaScript framework.

In Accordion II, we built a functional accordion component that has the necessary [WAI-ARIA roles, states, and properties](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/), which is actually pretty accessible. However, we can go one step further and add some optional keyboard interactions.

## Requirements
We'll be following a modified subset of the [necessary keyboard interactions for accordions](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/):

  * When Enter or Space is hit and focus is on the accordion header
    * For a collapsed panel, expands the associated panel.
    * For an expanded panel, collapses the associated panel.
  * Tab: Moves focus to the next focusable element; all focusable elements in the accordion are included in the page Tab sequence.
  * Shift + Tab: Moves focus to the previous focusable element; all focusable elements in the accordion are included in the page Tab sequence.
  * Down Arrow: If focus is on an accordion header, moves focus to the next accordion header. If focus is on the last accordion header, either does nothing or moves focus to the first accordion header.
  * Up Arrow: If focus is on an accordion header, moves focus to the previous accordion header. If focus is on the first accordion header, either does nothing or moves focus to the last accordion header.
  * Home: When focus is on an accordion header, moves focus to the first accordion header.
  * End: When focus is on an accordion header, moves focus to the last accordion header.

## Notes
The focus of this question is on adding keyboard functionality, not the styling. We have provided the solution to the Accordion II question here for you to build on top of. You can reuse the existing styling.

## Implementation
The implementation builds upon Accordion II as a starting point.

## Listening for Keyboard Events
Firstly it's crucial to know the difference between the keypress vs the keydown event. The keypress event is only fired when a key that produces a character value is pressed down. This would exclude the Up, Down, Home, and End keys which are requirements of this question. The keypress event is also deprecated and shouldn't be used. For these reasons, we should be using the keydown event. We'll add the onKeyDown prop to root <div> element.

To know which key is being pressed, we can use event.key or event.code on the event passed to onKeyDown's callback. There are some differences between event.key vs event.code but for the purposes of this question it doesn't make a difference and can be ignored. We'll just use event.code.

## Responding to Keyboard Events
Note that these keyboard events should only be responded to if the focus is currently on one of the accordion headers. We can get the currently focused DOM element on the page with document.activeElement, and check if it has a data-accordion-value attribute, which is added to all the accordion header buttons.

Next we read the event.code property and respond with custom code depending on its value. A switch case is suitable for such a situation:

  * ArrowUp: Focus on the previous header or "wrap around" to the last one if the focus was on the first header. We first find the index of the currently focused header, decrease it by one, and use modulo arithmetic to elegantly handle the "wrap around".
  * ArrowRight: Focus on the next header or "wrap around" to the first one if the focus was on the last. We first find the index of the currently focused header, increase it by one, and use modulo arithmetic to elegantly handle the "wrap around".
  * Home: Focus on the first header.
  * End: Focus on the last header.

A valid keyboard even should focus on a new header button. Since we know the id of each header, we can imperatively call .focus() on it by using document.getElementById() with the desired header element id. This approach is non-idiomatic by usual React standards but is acceptable during interviews.

## Test Cases
  * Expanding/collapsing panels
    * When a header is focused, hitting Enter or Space should toggle the associated panel between the expanded/collapsed state.
  * Switching header focus
    * Tab key should focus on the next focusable element, which in our example is the next header element. It should focus on panel contents if any of them contains focusable elements. This scenario is not testable since we only allow text contents in our accordion.
    * Shift + Tab keys should focus on the previous focusable element, which in our example is the previous header element. It should focus on panel contents if any of them contains focusable elements. This scenario is not testable since we only allow text contents in our accordion.
    * Up key should focus on the previous header element and focus on the last header element if the first header had focus, skipping any focusable elements within the contents.
    * Right key should focus on the next header element and focus on the first header element if the last header had focus, skipping any focusable elements within the contents.
    * Home key should focus the first header element.
    * End key should focus on the last header element. and focus on the last header element if the first header had focus.

## Resources
* [Accordion | ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/)
* [Accordion | Reach UI](https://reach.tech/accordion/)
* [Disclosure - Headless UI](https://headlessui.com/react/disclosure)
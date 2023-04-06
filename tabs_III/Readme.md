# Tabs III

## Description
This is an advanced version of Tabs and is not available in Vanilla JavaScript as it will require a fair bit of code to add keyboard interactions without a JavaScript framework.
In Tabs II, we built a functional Tabs component that has the necessary [WAI-ARIA roles, states, and properties](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/). For a completely accessible Tabs component, we should also add the [necessary keyboard interactions](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/).

## Requirements
We'll be following a modified subset of the [necessary keyboard interactions](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/) for Tabs. Note that the tabs component we're building is activated automatically on focus, so the respective tabpanel contents are shown as soon as the focus changes to a different tab.

* When Tab key is pressed:
  * When focus moves into the tab list, places focus on the active tab element.
  * When the tab list contains the focus, moves focus to the next element in the page tab sequence outside the tablist, which is the tabpanel.

* When focus is on a tab element in the tab list:
  * Left Arrow: moves focus to the previous tab. If focus is on the first tab, moves focus to the last tab.
  * Right Arrow: Moves focus to the next tab. If focus is on the last tab element, moves focus to the first tab.
  * Home: Moves focus to the first tab. Shows tabpanel content of the newly focused tab.
  * End: Moves focus to the last tab. Shows tabpanel content of the newly focused tab.

## Notes
The focus of this question is on adding keyboard functionality, not the styling. We have provided the solution to the Tabs II question here for you to build on top of. You can reuse the existing styling.

## Listening for Keyboard 
Firstly it's crucial to know the difference between the keypress vs the keydown event. The keypress event is only fired when a key that produces a character value is pressed down. This would exclude the Left, Right, Home, and End keys which are requirements of this question. The keypress event is also deprecated and shouldn't be used. For these reasons, we should be using the keydown event. We'll add the onKeyPress prop to <div role="tablist">.

To know which key is being pressed, we can use event.key or event.code on the event passed to onKeyPress's callback. There are some [differences between](https://javascript.info/keyboard-events) event.key vs event.code but for the purposes of this question it doesn't make a difference and can be ignored. We'll just use event.code.

## Responding to Keyboard Events
Next we read the event.code property and respond with custom code depending on its value. A switch case is suitable for such a situation:

* ArrowLeft: Activate the previous tab or "wrap around" to the last one if the focus was on the first. We first find the index of the active tab item, decrease it by one, and use modulo arithmetic to elegantly handle the "wrap around".
* ArrowRight: Activate the next tab or "wrap around" to the first one if the focus was on the last. We first find the index of the active tab item, increase it by one, and use modulo arithmetic to elegantly handle the "wrap around".
* Home: Activate the first tab.
* End: Activate the last tab.

When a new tab is activated, it should come into focus. Since we know the id of each tab element, we can imperatively call .focus() on it by using document.getElementById() with the desired tab element id. This approach is non-idiomatic by usual React standards but is acceptable during interviews.

## Tab-ing Behavior
In Tabs II, all our tabs were focusable and you could jump to each tab via the Tab key. However, that behavior is non-standard according to the WAI-ARIA Tabs specification, which states that only the active tab should be focusable. We can achieve this by making the non-active tabs non-focusable by adding the tabIndex={-1} attribute to them. On a related note, we should also make the <div role="tabpanel"> focusable by adding tabIndex={0}.

## Test Cases
We've intentionally added some focusable elements above and below the Tabs component to make it easier to check the focus order.

Switching tabs
Left key should activate the previous tab element and activate the last tab element if the first tab was active.
Right key should activate the next tab element and activate the first tab element if the last tab was active.
Home key should activate the first tab element.
End key should activate the last tab element.
Focus behavior
Click on the topmost button. After that, hitting Tab should focus on the active tab element, which is not necessarily the first tab.
Click on the bottommost button. After that, hitting Shift + Tab should focus on the tabpanel, not any of the tabs.
When switching between the tabs using the keyboard, the new tab should be focused. Hitting Tab again should shift focus to the tabpanel instead of any other tabs.
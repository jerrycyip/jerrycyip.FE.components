# Star Rating

## Description
Create a star rating widget that allows users to select a rating value.

## Requirements
  * The widget accepts two parameters: the maximum number of stars and the number of currently filled stars.
  * When a star is clicked, it is filled along with all the stars to its left.
  * When the user hovers over the stars, all the stars under the cursor and its left are filled.
    * The stars which need to be filled during hover take priority over existing filled state.
    * If the cursor leaves the widget and no new selection is made, the appropriate stars revert to the filled state before the hovering.
  * Make the star rating widget reusable such that multiple instances can be rendered within the same page.

The star icons, both empty and filled, are provided to you as SVGs.

A StarRating.js skeleton component has been created for you. You are free to decide the props of <StarRating />.

## Implementation
We first construct the DOM to render the number of stars and a highlightStars function which highlights all the stars smaller than the passed in index (0-based).

We also need to variable currentValue to track the latest value which determines the highlighted state unhovered. This is needed because we need to revert to that state when the cursor is not hovering over any stars.

Then we add a few event listeners to the root component of the widget:
  * click: Using event delegation, we only have to add one click event handler per widget. We can determine the index of the currently clicked star using event.target.closest and add/remove the star-icon-filled class from the stars depending on the index of the clicked star.
  * mouseover: Using event delegation, we only have to add one mouseover event handler per widget. We can determine the index of the currently hovered star using event.target.closest and add/remove the star-icon-filled class from the stars depending on the index of the clicked star. This takes priority over the currently filled stars.
  * mouseout: Reset the filled state to before the mouseover event. Event delegation is not needed here because there's no specific star involved.


## Notes
The Star Rating widget can be improved in the following ways:

  * Allow the value to be part of a form submit event data by embedding an <input>.
  * Add keyboard support for better a11y.
  * Add RTL (right-to-left) support.

## Test Cases
  * Click on each star and move the cursor away, see that the highlighted state is correct.
  * Hover over each star, see that every star under the cursor and to its left are highlighted.
      * Remove cursor over widget, see that the highlighted state is back to before the hovering.
  * Render multiple components, ensure that each can maintain its own state and interacting with a widget does not affect other onscreen components.

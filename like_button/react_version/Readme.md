
## Implementation Details
The focus of this question is in the handling of the various states when there's a pending request.

## Data Model
We'll need a few state variables:

  * liked: Tracks whether the button is in the default state or the liked state. Since there are only two states, we can use a boolean type to represent it.
  * isPending: Determines if there's a pending background request.
  * errorMessage: Error message obtained from the back end when the API request fails.

## Making Back End API Requests
Writing code to make back end requests is pretty standard, in general you should use the following flow:

  1. Set the UI to show a loading state.
  2. Clear the error message.
  3. Make the back end request via fetch
  4. Determine if the request has succeeded.
    i. If the response has succeeded, update the UI to indicate success.
    ii. If the response has failed, update the UI to indicate failure by showing an error message.
  5. Remove the loading state.

The above is captured in the likeUnlikeAction function.

## Rendering
The rendering code is pretty straightforward since there isn't much dependency among the state variables when rendering the UI.

## Test Cases
  * "Default" state
    * Hovering the button should show the "Hovered" state.
    * Clicking on the button should show a loading spinner.
      * If the request succeeds, the button should transition into the "Liked" state.
      * If the request fails, the button should go back to the "Default" state and an error message is shown below the button.
  * "Liked" state
      * Hovering the button in this state is undefined behavior. It's fine to not show any difference when hovering.
      * Clicking on the button should show a loading spinner.
        * If the request succeeds, the button should transition into the "Default" state.
        * If the request fails, the button should go back to the "Liked" state and an error message is shown below the button.
        
## Notes
Some users might have the habit of double clicking on UI elements. By disabling the button after the first click, we avoid running into the situation where multiple requests are pending at the same time which is probably unintended and can lead to confusing outcomes.

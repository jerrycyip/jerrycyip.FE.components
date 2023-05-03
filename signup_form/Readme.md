# Signup Form

## Description
Building robust forms is one of core skills that a Front End developer should have. One of the most common forms people encounter everyday is a signup form.

Implement a signup form to allow users to fill in their details and submit the form.

## Requirements
The form should contain the following elements with the following criteria:

  * Username field
      * Minimum of 4 characters.
      * Alphanumeric only.
  * Email field
    * Valid email format. A reasonable validation will suffice, you don't have to strictly follow any specification.
  * Password field
    * Minimum of 6 characters.
  * Confirm password field
    * Must match the password field.
  * Submit button
    * Contains the text "Sign Up".
    * Clicking on the submit button submits the form.

You are free to decide when (during typing/after blur/upon submission) and how (native HTML validation or custom validation) to validate the form. If the validation fails, show the relevant errors near (beside or below) the corresponding <input> fields.

## Submission API
A submitForm function has been implemented for you in index.js which makes an AJAX POST request to a server-side API which validates the fields using the same criteria. You can use it to verify that your form is not allowing invalid input.

## Implementation
Since the browser has native form validation capabilities, we will make use of it so that we can write less JavaScript.

HTML-based validation doesn't allow for customization of the error styling. Hence these days, it's no surprise that many forms opt for JavaScript-based validation to have more control over the validation styling. In interview settings, there are tight time constraints. If there is no requirement for specific validation styling, using HTML-based validation will save you some time and also demonstrate your HTML knowledge to the interviewer which is a positive signal.

This question is a good opportunity to get familiar with HTML-based validation if you aren't already. There's very little JavaScript we need to write if we use HTML-based validation. Only the matching password confirmation has to be done using JavaScript.

The following attributes on <input> are especially helpful for validating form values before submission can occur:

  * required: input value must be non-empty.
  * pattern: input value must match the specified regular expression.
  * minlength: input value must contain the minimum number of characters.

There are more [validation attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Constraint_validation) but the above are the ones relevant to signup forms.

All the fields are required, so we can add this attribute to all the <input>s.

  * Username: To validate a minimum of 4 characters, use minlength="3". To validate the alphanumeric constraint, we use a simple regex of ^[a-zA-Z0-9]+$.
  * Email: By using type="email", the browser will validate that the value matches an email format if it's non-empty.
  * Password/Confirm password: Use minlength="6" for minimum length validation and type="password" to hide the values.

Since we also need to validate that the password matches, we can add a 'submit' event listener to the form, use event.preventDefault() to intercept the browser submit, and validate using JavaScript. If the password validation fails, we show the error message below the password confirmation field.

## Test Cases
  * Username input
    * Empty: ❌ Fail validation
    * Shorter than 4 characters: ❌ Fail validation
    * Contains on-alphanumeric characters: ❌ Fail validation
    * Alphanumeric values 3 characters or more: ✅ Pass validation
  * Email input
    * Empty: ❌ Fail validation
    * Without username: ❌ Fail validation
    * Without domain: ❌ Fail validation
    * Valid email: ✅ Pass validation
  * Password input
    * Empty: ❌ Fail validation
    * Shorter than 6 characters: ❌ Fail validation
    * At least 6 characters: ✅ Pass validation
  * Confirm Password input
    * Empty: ❌ Fail validation
    * Shorter than 6 characters: ❌ Fail validation
    * Does not match password input: ❌ Fail validation
    * Matches password input: ✅ Pass validation
  * Submit button
    * Clicking on it triggers submission of the form if there are no validation errors
  
## Accessibility
  * Link <label>s to <input> so that clicking on the <label> will focus on the corresponding <input>.
    * Use <label for="some-id"> and <input id="some-id"> to define the relation between <label> and <input>.
    * You can nest <input>s inside of <label>s but note that some assistive technologies (e.g. Dragon NaturallySpeaking) do not support it.
  * Apply a styling for <input> focus to clearly tell users which field they're on.
  * Link the error message up with the password confirmation field by using aria-describedby to indicate that the error message is for that <input> field.

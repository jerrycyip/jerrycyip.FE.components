# Todo List

## Requirements
You're given some basic skeleton HTML for a Todo List app. Add the following functionality to the app:

1. Add new tasks on clicking the "Submit" button.
  * The <input> field should be cleared upon successful addition.
2. Remove tasks from the Todo List upon clicking the "Delete" button.

## Notes
  * The focus of this question is on functionality, not the styling. There's no need to write any custom CSS.
  * You may modify the markup (e.g. adding ids, data attributes, replacing some tags, etc), but the result should remain the same visually.
  * You may want to think about ways to improve the user experience of the application and implement them (you get bonus credit for doing that during interviews).

## Implementation
There are a few ways to approach this questions:

  * Add only the necessary DOM event listeners and DOM operations. See solution.
  * Use <template>s and client-side render both initial and new tasks. See solution.

## Improved Approach
In this approach, <template>s are used for rendering both initial and new tasks. You might have realized that you have the task markup duplicated in two places: the initially-rendered tasks and new tasks.

It is a chore to make the markup consistent for both initial and new tasks. Using a <template> element will make it easy to render both the initial task and newly-added tasks.

This solution also contains some UX improvements:

  * Use a <form> to capture submission of new tasks. This will handle both Enter keys and "Submit" button clicks.
  * Prevents empty input values from being added to the list.
    * Useful for preventing accidental additions.
  * Trims the input value before adding to the list.
  * Asks for confirmation before deletion of a task.
    * Destructive actions should always require double confirmation in case the user accidentally pressed the delete button.

## Basic Approach
In this approach, only the necessary DOM event listeners and DOM operations are added. Refer to the inline comments for explanations on what each part of the code does.

## Notes
When rendering user input, there's a risk of inserting potentially malicious content resulting in Cross Site Scripting (XSS). To prevent XSS:

  * Sanitize the user input before rendering.
  * Avoid setting Element.innerHTML, set Node.textContent instead which inserts strings as raw text rather than parsing it as HTML.

## Accessibility
  * All form <input>s should be labelled either via <label>s or aria-label attributes. Since the original markup doesn't contain a <label>, we can add aria-label to the <input>.
  * For screen reader users, they won't be aware that a new task has been added. An aria-live region can be added to inform about the newly-added task. There is unlikely enough time to do this during an interview but you will get bonus points for mentioning it. Read more about [ARIA live regions on MDN](https://www.greatfrontend.com/questions/user-interface/todo-list/react/solution/improved).

## Test Cases
* Add tasks:
  * Add a new task.
  * Add multiple tasks.
  * Add tasks with potentially malicious content like HTML (e.g. <script>, <style> or <link>) and ensure there's no XSS.
  * Check that <input> is cleared after a task is added.
* Delete tasks:
  * Delete an existing task.
  * Delete multiple tasks.
  * Delete newly-added tasks.
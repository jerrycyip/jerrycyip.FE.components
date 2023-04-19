# Todo List - React Version

## Implementation (Improved Version)
Some of the improvements:

  * Encapsulating the ID generator so that it can only be read from but not modified from external sources.
  * Use a <form> to capture submission of new tasks. This will handle both Enter keys and "Submit" button clicks.
  * Prevents empty input values from being added to the list.
  * Trims the input value before adding to the list.
  * Displays an empty state when there are no tasks in the list.
  * Asks for confirmation before deletion of a task.

##  Accessibility
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

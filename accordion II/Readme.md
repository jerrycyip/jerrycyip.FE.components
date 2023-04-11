# Accordion II

## Description
This is an advanced version of Accordion. Per [Accordion Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/):

  An accordion is a vertically stacked set of interactive headings that each contain a title, content snippet, or thumbnail representing a section of content. The headings function as controls that enable users to reveal or hide their associated sections of content. Accordions are commonly used to reduce the need to scroll when presenting multiple sections of content on a single page.

In Accordion, we built a functional accordion component that can expand/collapse each section's contents. However, building good UI components goes beyond functionality and we have to ensure our components have great accessibility as well by adding the right ARIA roles, states, and properties to the DOM elements.

## Requirements
The ARIA Authoring Practices Guide has a long [list of guidelines](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/) for the ARIA roles, states, and properties to add to the various elements of an accordion. We should implement the following (improvised) guidelines for this question:

  * The title of each accordion header is contained in a <button> element.
  * If the accordion panel associated with an accordion header is visible, the header button element has aria-expanded set to true. If the panel is not visible, aria-expanded is set to false.
  * The accordion header button element has aria-controls set to the ID of the element containing the accordion panel content.
  * Each element that serves as a container for panel content has role region and aria-labelledby with a value that refers to the button that controls display of the panel.

The skeleton code uses the solution of Accordion (I) as a starting point.

## Implementation
We'll build on top of Accordion's solution. Other than adding the right ARIA roles and states, which is straightforward, we also need to link the accordion headers with the corresponding accordion contents/panels. Hence we create two functions, getAccordionHeaderId and getAccordionPanelId to do this.

  getAccordionHeaderId generates a unique ID string to use as the value of the id attribute of the header element. This ID will be used as the value of the aria-labelledby attribute of the corresponding accordion panel.
  getAccordionPanelId generates a unique ID string to use as the value of the id attribute of accordion panel. This ID will be used as the value of the aria-controls attribute of the corresponding accordion header.

Since there can be multiple Accordion component instances on the page and we cannot guarantee that the accordion section values will be globally unique, each Accordion instance needs to have a unique identifier. The useId React hook can be used to generate unique ID for each Accordion instance. The final ID string will be a concatenation of the Accordion instance's ID, the item value, and whether it's a header or a panel.

## Test Cases
Inspect the rendered HTML to see that the right attributes were added to the DOM.
You can go a step further by using accessibility testing tools like [axe](https://www.deque.com/axe/) to validate the a11y of the elements.


## Accessibility
By using a <button> for the section titles, we have enabled the basic keyboard interactions necessary to achieve sufficient accessibility for accordion components. However, there are some useful optional keyboard interactions to add, which will be covered in Accordion III.

## Resources
* [Accordion | ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/)
* [Accordion | Reach UI](https://reach.tech/accordion/)
* [Disclosure - Headless UI](https://headlessui.com/react/disclosure)
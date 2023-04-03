# Tabs II
## Description
This is an advanced version of the Tabs component that incorporates accessibility (A11Y) features.

## Requirements
The ARIA Authoring Practices Guide has a long list of guidelines for the ARIA roles, states, and properties to add to the various elements of a tabs component. We should implement the following guidelines for this question:

The element that serves as the container for the set of tabs has role tablist.
Each element that serves as a tab has role tab and is contained within the element with role tablist.
Each element that contains the content panel for a tab has role tabpanel.
Each element with role tab has the property aria-controls referring to its associated tabpanel element.
The active tab element has the state aria-selected set to true and all other tab elements have it set to false.
Each element with role tabpanel has the property aria-labelledby referring to its associated tab element.
It is also important that we use a <button> element to build the tabs as they need to be focusable and interactive.
The skeleton code uses the solution of Tabs, but you are free to use your own solution as a starting point.
  
## Implementation Details
We'll build on top of the Tabs code. Other than adding the right ARIA roles and states, which is straightforward, we also need to link the tab items with the corresponding tabpanels. Hence we create two functions, getTabListItemId and getTabPanelId to do this.

getTabListItemId generates a unique ID string to use as the value of the id attribute of tab items. This ID will be used as the value of the aria-labelledby attribute of the corresponding tabpanel.
getTabPanelId generates a unique ID string to use as the value of the id attribute of tabpanels. This ID will be used as the value of the aria-controls attribute of the corresponding tab item.
Since there can be multiple Tabs component instances on the page and we cannot guarantee that the tab item values will be globally unique, each Tabs instance needs to have a unique identifier. The useId React hook can be used to generate unique ID for each Tabs instance. The final ID string will be a concatenation of the Tabs instance's ID, the item value, and whether it's a tab item or a tabpanel.

## Test Cases
Inspect the rendered HTML to see that the right attributes were added to the DOM.
You can go a step further by using accessibility testing tools like axe to validate the a11y of the elements.
  

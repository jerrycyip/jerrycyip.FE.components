// template + client-side render solution
// IFFE to avoid scope collision (duplicate var names etc) and ensure module pattern
(() => {
    // config vars in all caps
    const TASKS = [
        'Walk the dog',
        'Water the plants',
        'Wash the dishes',
    ];

    // invoke main todo list function
    todoList();

    // main function for creating todo list component
    function todoList(){
        // DOM elems that persist throughout usage of app. Use 'El' suffix & legacy jquery '$' prefix to denote
        const $formEl = document.querySelector('#form');
        const $inputEl = document.querySelector("#input");
        const $todoListEl = document.querySelector("#todo-list")
        // enable screen readers to notify of new tasks added via aria-live region    
        $todoListEl.setAttribute('aria-live', 'polite');
        const $taskTemplate = document.querySelector(
            '#task-template',
        );

        // initial render
        init();
        // attach event listeners
        attachListeners();

        // fn to render initial example tasks using the template & config TASKS var
        function init(){
            TASKS.forEach((taskValue) => {
                addTask(taskValue);
            });
        }

        // fn to add task and button to todo list
        function addTask(value) {
            // Use the template to make it easy to add new tasks.
            const $newTaskElement = $taskTemplate.content.cloneNode(true);
            // use Node.textContent instead of Element.innerHTML to prevent XSS attacks
            $newTaskElement.querySelector('span').textContent = value;
            $todoListEl.appendChild($newTaskElement);
            $inputEl.focus(); // optional: return focus to input element
        }

        // func to add event listeners for adding/removing tasks
        function attachListeners(){
            // listen for submit button
            // use Form (instead of button) to support Enter key as well as clicking submit btn
            $formEl.addEventListener('submit', (event) => {
                event.preventDefault(); // prevent deflt page reload behavior
                const value = $inputEl.value.trim(); // trim before adding to list
                // ignore empty vals
                if (value === '') return;

                addTask(value);
                $inputEl.value = ''; // reset input to allow adding new tasks
            });

            // listener for deletion: Add listener to list instead of indiv tasks by way of event 
            // delegation.  Allows both existing and new delete buttons to respond to clicks.
            // Removes need to add indiv event listeners to each button + removal upon deletion    
            $todoListEl.addEventListener('click', (event) => {
                if(event.target.tagName !== 'BUTTON') return;  // confirm delete button is clicked
                
                // add confirmation before destructive actions
                if (window.confirm('Are you sure you want to delete the task?')){
                    deleteTask(event.target.parentNode); // pass the encompassing list item to capture the entire task entry for deletion (span & delete button) 
                    $inputEl.focus(); // return focus to input element
                }
            });
        }

        // remove a task from the todo list
        function deleteTask($itemEl){
            $itemEl.parentNode.removeChild($itemEl); // the task entry's encompassing list item is removed from the parent unordered list <ul>
        }
    }
})()



/* traditional solution w/ only nec DOM event listeners & DOM operations
// IFFE to avoid scope collision (duplicate var names etc); ensure module pattern
(() => {
    // elems that persist throughout usage of the app 
    const $form = document.querySelector('#form');
    const $inputEl = document.querySelector("#input");
    //const $submitButtonEl = document.querySelector("#submit");
    const $todoListEl = document.querySelector("#todo-list")
    // enable screen readers to notify of new tasks added via aria-live region
    $todoListEl.setAttribute('aria-live', 'polite');

    // use form to support Enter key as well as clicking submit btn
    $form.addEventListener('submit', (event) => {
        event.preventDefault();
        const value = $inputEl.value;
        // Don't do anything for empty value. Good for UX.
        if (value.trim() === '') {
        return;
        }
        
        addTask(value.trim()); // Trim before adding to the list.    
        $inputEl.value = ''; // clear input to allow new additions
    });

    // Add listener to the list instead of to indiv tasks using event delegation
    // Allows both existing and new delete buttons to respond to clicks
    // Removes need to add indiv event listeners to each button nor remove upon deletion
    $todoListEl.addEventListener('click', (event) => {
        if(event.target.tagName === 'BUTTON'){ // confirm delete button is clicked
            deleteTask(event.target.parentNode);
        }
    });

    // fn to add task and button to todo list
    function addTask(taskValue){        
        // create DOM elements for the new task
        const $newTaskElement = document.createElement("li");
        const $span = document.createElement("span");
        $newTaskElement.appendChild($span);
        // use node.textContent instead of Element.innerHTML
        // prevents XSS (Cross Site Scripting). (add space to separate button)
        // (textContent inserts strings as raw text vs parsing it as HTML)
        $span.textContent = `${taskValue} `;
        
        const $btn = document.createElement("button"); // generic name in case want to change fn later
        $btn.textContent = "Delete";
        $newTaskElement.appendChild($btn);

        // Add the new task to the list
        $todoListEl.append($newTaskElement);        
    }

    // remove a task from the todo list
    function deleteTask($itemEl) {
        $itemEl.parentNode.removeChild($itemEl);
    }
})()

    // using submit button instead of form
    // $submitButtonEl.addEventListener("click", (event) => {
    //     event.preventDefault(); // prevent default form refresh
    //     addTask($inputEl.value);
    //     // reset the input so that new tasks can be added easily
    //     $inputEl.value = '';
    //  });
*/
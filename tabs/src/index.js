// Use IFFE to avoid global namespace var scope collisions. IFFEs ensures module
// pattern best practice and encapsulate variables within a local namespace
(() => {
    // invoke tabs with provided stub values for items (e.g. from an API)
    tabs(document.getElementById('tabs'), {
        items: [
            {
                value: 'html',
                label: 'HTML',
                panel: `The HyperText Markup Language or HTML 
                is the standard markup language for documents 
                designed to be displayed in a web browser.`,
            },
            {
                value: 'css',
                label: 'CSS',
                panel: `Cascading Style Sheets is a style sheet 
                language used for describing the presentation of a 
                document written in a markup language such as HTML or XML.`,
            },
            {
                value: 'javascript',
                label: 'Javascript',
                panel: `JavaScript, often abbreviated as JS, is a programming 
                language that is one of the core technologies of the World 
                Wide Web, alongside HTML and CSS.`,
            }
        ]
    });    

    function tabs($rootEl, { defaultValue, items: itemsParam }){
    // '$' prefix convention for params/vars to indicate DOM elems and ensure familiar syntax with legacy jquery APIs
        
        const DOM = {
            $tabBar: document.createElement('div'),
            $tabPanels: document.createElement('div'),
        };

        const items = itemsParam;
        const state = { // holds currently selected tab
            value: defaultValue || items[0].value,
        };

         init();
         update();
         attachEvents();

        // fn for setting up the DOM elems that persist throughout lifecycle 
        // of component (i.e. never destroyed/re-rendered)
        function init(){
            $rootEl.classList.add('tabs'); // styling for overall wrapper
            
            DOM.$tabBar.className = 'tabs-list';  // styling for tab bar
            $rootEl.appendChild(DOM.$tabBar);
            $rootEl.appendChild(DOM.$tabPanels);
        }

        // fn for updating and rendering the tablist and tab panel elems to reflect
        // current selected tab value.  Since tablist and panel content are always changing
        // based on tab selection, easiest to destroy and re-render with updated state
        function update(){
            // Construct tab bar (bar of tab buttons)
            const $tabsFragment = document.createDocumentFragment();
            items.forEach(({label, value: itemValue}) => {
                const $tabEl = document.createElement('button');
                const isTabActive = itemValue === state.value;
                
                $tabEl.textContent = label; // set the label's text content
                $tabEl.type = 'button';
                $tabEl.setAttribute('data-value', itemValue); // custom data attribute to indicate which tab (value)
                $tabEl.classList.add('tabs-list-item');

                if (isTabActive) {
                    $tabEl.classList.add('tabs-list-item--active');
                }
                
                $tabsFragment.appendChild($tabEl);
            });

            DOM.$tabBar.innerHTML = ''; // destroy tabBar
            DOM.$tabBar.appendChild($tabsFragment); // re-render

            // Construct panel content
            const $tabPanelsFragment = document.createDocumentFragment();
            items.forEach( ({ panel, value: itemValue }) => {
                const $tabPanelEl = document.createElement('div');
                const isTabActive = itemValue === state.value;

               $tabPanelEl.textContent = panel;
               $tabPanelEl.hidden = !isTabActive;

               $tabPanelsFragment.appendChild($tabPanelEl);
            });

            DOM.$tabPanels.innerHTML = ''; // destroy panels
            DOM.$tabPanels.appendChild($tabPanelsFragment); // re-render
        }
        
        // fn to attach event listener for tab selection
        function attachEvents(){
            // use Event Delegation for single event listener
            DOM.$tabBar.addEventListener('click', (event) => {
                if (event.target.tagName !== 'BUTTON') {
                    return; // ignore if tab not clicked
                }

                state.value = event.target.getAttribute('data-value'); // update state
                update(); // re-render based on state
            });
        }
    }

})();
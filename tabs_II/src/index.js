(() => {
    // aux fn for generating new tab component id
    // encapsulate ID generation s.t. read only (can't be modified externally)
    const newID = (() => {
      let id = 0;
      return () => id++;
    })();
    
    // aux fn to generate tab id for a11y rqmts
    function getTabListItemId(tabsId, value) {
      return tabsId + '-tab-' + value;
    }
    // aux fn to generate panel id for a11y rqmts
    function getTabPanelId(tabsId, value) {
      return tabsId + '-tabPanel-' + value;
    }

    // invoke tabs with provided stub api values
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

    // main function for constructing tab component
    function tabs($rootEl, { defaultValue, items: itemsParam }){
        
        const DOM = {
            $tabBar: document.createElement('div'),
            $tabPanels: document.createElement('div'),
        };

        const items = itemsParam;
        const state = {
            value: defaultValue || items[0].value,
        };
        const tabsId = `tabs-${newID()}`;

         init();
         update();
         attachEvents();

        // fn for setting up the DOM elems that persist throughout lifecycle 
        // of component (i.e. never destroyed/re-rendered)
        function init(){
            $rootEl.classList.add('tabs'); // styling for overall wrapper
            
            DOM.$tabBar.className = 'tabs-list';  // styling for tab bar
            DOM.$tabBar.role = 'tablist'; // a11y rqmts
            $rootEl.appendChild(DOM.$tabBar);
            $rootEl.appendChild(DOM.$tabPanels);
        }

        // fn for updating and rendering the tablist and tab panel elems to reflect
        // current selected tab value.  Since tablist and panel content are always changing
        // based on tab selection, easiest to destroy and re-render with updated state
        function update(){
            // Construct tab bar (bar of tab buttons)
            const $tabsFragment = document.createDocumentFragment();
            // construct tabs
            items.forEach(({label, value: itemValue}) => {
                const isTabActive = itemValue === state.value;
                const $tabEl = document.createElement('button');

                $tabEl.textContent = label;
                $tabEl.type = 'button';
                $tabEl.role = 'tab'; // a11y rqmts
                $tabEl.setAttribute('data-value', itemValue);
                $tabEl.id = getTabListItemId(tabsId, itemValue); // for a11y aria-labelledby prop on panel
                $tabEl.setAttribute( // a11y rqmts
                  'aria-controls',
                  getTabPanelId(tabsId, itemValue),
                  );
                $tabEl.classList.add('tabs-list-item');
                
                $tabEl.setAttribute('aria-selected', isTabActive); // a11y rqmts
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
                const isTabActive = itemValue === state.value;

                const $tabPanelEl = document.createElement('div');
                $tabPanelEl.role = 'tabpanel'; // a11y rqmts
                $tabPanelEl.id = getTabPanelId(tabsId, itemValue); // for a11y aria-controls prop on tab
                $tabPanelEl.setAttribute( // a11y rqmts
                  'aria-labelledby', 
                  getTabListItemId(tabsId, itemValue),
                  );

               $tabPanelEl.textContent = panel;
               $tabPanelEl.hidden = !isTabActive;

               $tabPanelsFragment.appendChild($tabPanelEl);
            });

            DOM.$tabPanels.innerHTML = ''; // destroy panels
            DOM.$tabPanels.appendChild($tabPanelsFragment); // re-render
        }
        
        function attachEvents(){
            // use Event Delegation for single event listener
            DOM.$tabBar.addEventListener('click', (event) => {
                if (event.target.tagName !== 'BUTTON') {
                    return; // ignore if tab not clicked
                }

                state.value = 
                event.target.getAttribute('data-value'); // update state (i.e. which tab)
                update(); // re-render based on state
            });
        }
    }

})();
// IFFE best practice to prevent global namespace var collision via private vars
// also ensures module pattern (pre ES6 modules)
(() => {
    // aux fn for generating new accordion component id
    // encapsulate ID generation s.t. read only (can't be modified externally)
    const newID = (() => {
        let id = 0;
        return () => id++;
    })();
    // aux fn to generate header id for a11y rqmts
    function getAccordionHeaderId(accordionId, value){
        return accordionId + '-header-' + value;
    }
    // aux fn to generate panel id for a11y rqmts
    function getAccordionPanelId(accordionId, value){
        return accordionId + '-panel-' + value;
    }
    
    // constant vars (serving as stub API or config values)
    const SECTIONS = [
        {
            value: 'html',
            title: 'HTML',        
            content: 'The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser.'
        },
        {
            value: 'css',
            title: 'CSS',
            content: 'Cascading Style Sheets is a style sheet language used for describing the presentation of a document written in a markup language such as HTML or XML.'
        },
        {
            value: 'javascript',
            title: 'JavaScript',
            content: 'JavaScript, often abbreviated as JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS.'
            ,
        },
    ];    

    // invoke accordion function with provided stub api values
    accordion(document.getElementById('accordion'), {sections: SECTIONS});
    // main accordion function
    function accordion($rootEl, { sections }){
        const accordionId = `accordion-${newID()}`;

        init();
        attachEvents();

        function init(){
            $rootEl.classList.add('accordion');
            const $accordionSections = document.createDocumentFragment(); // fragment for indiv accordions
            
            sections.forEach(({value, title, content}) => { // create indiv accordions
                const headerId = getAccordionHeaderId(accordionId, value); // for a11y rqmts
                const panelId = getAccordionPanelId(accordionId, value); // for a11y rqmts

                // create indiv accordion container
                const $accordionSection = document.createElement('div');
                $accordionSection.classList.add('accordion-item');
                
                // create tab header title
                const $accordionTitleBtn = document.createElement('button');
                $accordionTitleBtn.classList.add('accordion-item-title',);
                $accordionTitleBtn.type = 'button';
                $accordionTitleBtn.setAttribute('data-value', value, );
                $accordionTitleBtn.id = headerId; // a11y rqmts
                $accordionTitleBtn.setAttribute('aria-controls', panelId); // a11y rqmts
                $accordionTitleBtn.setAttribute('aria-expanded', false); // a11y rqmts
                
                // create accordion icon
                const $accordionIcon = document.createElement('span');
                $accordionIcon.classList.add('accordion-icon');
                $accordionIcon.setAttribute('aria-hidden', 'true');

                // combine header title and icon
                $accordionTitleBtn.append(title, $accordionIcon);

                // create panel contents
                const $accordionSectionContents = document.createElement('div');
                $accordionSectionContents.classList.add('accordion-item-contents',);

                $accordionSectionContents.hidden = true;
                $accordionSectionContents.textContent = content;
                $accordionSectionContents.role = 'region'; // a11y rqmts
                $accordionSectionContents.id = panelId; // a11y rqmts               
                $accordionSectionContents.setAttribute('aria-labelledby', headerId); // a11y rqmts                

                // combine header and panel content into indiv accordion and append to parent container
                $accordionSection.append($accordionTitleBtn, $accordionSectionContents);
                $accordionSections.append($accordionSection);
            });
            $rootEl.appendChild($accordionSections); // append accordions to root element
        }

        function attachEvents(){
            // use event delegation to allow just single listener
            $rootEl.addEventListener('click', (event) => {
                const target = event.target;
                
                if (
                    target.tagName !== 'BUTTON' ||
                    !target.classList.contains('accordion-item-title')
                ) {
                    return; // check for clicks of title or icon only
                }

                // determine expanded state and update aria-expanded attrib for a11y rqmts
                const isExpanded = target.getAttribute('aria-expanded') === 'true'; 
                target.setAttribute('aria-expanded', !isExpanded); 


                // Find the icon and toggle the direction of icon
                const $icon = target.querySelector('.accordion-icon');
                $icon.classList.toggle('accordion-icon--rotated', !isExpanded);

                // Find the accordion contents and toggle the contents' visibility
                const $accordionContents = target.nextSibling;
                $accordionContents.hidden = isExpanded;
            });
        }
    }
    
})()
// IFFE best practice to prevent global namespace var collision via private vars
// also ensures module pattern (pre ES6 modules)
(() => {

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

    //  main function
    function accordion($rootEl, { sections }){
        init();
        attachEvents();

        // fn to initialize accordion component DOM elems that persist thru comp lifecycle
        function init(){
            // $ prefix convention for params/vars to indicate DOM elems and ensure familiar syntax with legacy jquery APIs
            $rootEl.classList.add('accordion');
            const $accordionSections = document.createDocumentFragment(); // use doc fragment to minimize # of browser reflows to 1
            
            sections.forEach(({value, title, content}) => {
                // create and style accordion section
                const $accordionSection = document.createElement('div');
                $accordionSection.classList.add('accordion-item');
                // create and style accordion section title button w/ styling
                const $accordionTitleBtn = document.createElement('button');
                $accordionTitleBtn.classList.add('accordion-item-title',);
                // Always specify the type attribute for the button. 
                // The default type for Internet Explorer is "button", while in other browsers 
                // (and in the W3C specification) it is "submit".
                $accordionTitleBtn.type = 'button'; 
                $accordionTitleBtn.setAttribute('data-value', value, ); // add custom data value
                // create and style accordion icon for expanding/collapsing
                const $accordionIcon = document.createElement('span');
                $accordionIcon.classList.add('accordion-icon');
                $accordionIcon.setAttribute('aria-hidden', 'true'); // hide icons from a11y tools (screen readers)  
                // attach title and icon to button
                $accordionTitleBtn.append(title, $accordionIcon);
                // create and style contents section for accordion section    
                const $accordionSectionContents = document.createElement('div');
                $accordionSectionContents.classList.add('accordion-item-contents',); 
                // hide accordion section's contents by default
                $accordionSectionContents.hidden = true;
                $accordionSectionContents.textContent = content;
                // append indiv accordion sections to accordion fragment
                $accordionSection.append($accordionTitleBtn, $accordionSectionContents);
                $accordionSections.append($accordionSection);
            });
            // append accordion fragment to accordion root element
            $rootEl.appendChild($accordionSections);
        }

        // fn to attach event listener for expansion/collapse of accordion sections
        function attachEvents(){
            // use event delegation to place listener at root accordion element
            $rootEl.addEventListener('click', (event) => {
                const target = event.target;
                
                if ( // check for clicks of title or icon only, o/wise ignore
                    target.tagName !== 'BUTTON' ||
                    !target.classList.contains('accordion-item-title')
                    ){
                        return; 
                    }

                // Find the icon and toggle the direction of icon
                const $icon = target.querySelector('.accordion-icon');
                $icon.classList.toggle('accordion-icon--rotated');

                // Find the accordion contents and toggle the contents' visibility
                const $accordionContents = target.nextSibling;
                $accordionContents.hidden = !$accordionContents.hidden;
            });
        }   
    }
    
})()

// simple solution

// const labels = document.querySelectorAll('.label');

// labels.forEach(label => {
//   label.addEventListener('click', function(){
//     const icon = this.querySelector('.accordion-icon');
//     const content = this.parentNode.querySelector('.content')
    
//     icon.classList.toggle('accordion-icon--rotated');
//     content.classList.toggle('active');
//   })
// })

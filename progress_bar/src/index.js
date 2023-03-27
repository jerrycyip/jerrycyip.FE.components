// IFFE to avoid scope collision (duplicate var names etc) and ensure module pattern
(() => {
    // initialize progress bar w/ initial progress position set to 50%
    const progressSlider = progressBar(document.querySelector('#progress-slider'), 50);

    // alternative: add event listener to input slider for user changes to progress bar
    // document.querySelector('#slider')
    //     .addEventListener('change', (event) => {
    //         progressSlider.setValue(event.target.value);
    //     });

    // main progress bar function
    function progressBar($rootEl, initValue) {
        // vars and DOM elem(s) that persists thru out usage of app. 
        const min = 0;
        const max = 100;
        // Use 'El' suffix & '$' prefix to denote DOM elems and ensure familiar syntax with legacy jquery APIs
        $rootEl.classList.add('progress'); // add base styling to progress bar
        const $progressBarEl = document.createElement('div'); // creates progress bar

        // initialize progress bar & set initial value
        init();
        setValue(initValue);
        
        // add event listener to input slider for user changes to progress bar
        document.querySelector('#slider')
            .addEventListener('change', (event) => {
                setValue(event.target.value);
            });
         
        return {setValue}; // expose setValue method for potential external calls

        // func to initialize progress bar features that persist across comp lifecycle
        function init(){
            $progressBarEl.className = 'progress-bar';
            // set attributes for accessibility (a11y) https://stackoverflow.com/questions/10403138/what-is-the-purpose-of-the-role-attribute-in-html
            $progressBarEl.setAttribute('role', 'progressBar'); // https://www.w3.org/TR/wai-aria/#directory 
            $progressBarEl.setAttribute('aria-valuemin', min);
            $progressBarEl.setAttribute('aria-valuemax', max);
            $rootEl.appendChild($progressBarEl);
        }

        // func to set value of progress bar (to initial default or user slider input val)
        function setValue(value) { 
            const boundedValue = Math.min( // convert values to be w/in range
                Math.max(value, min), // ensure >= 0
                max); // ensure <= 100
            
            $progressBarEl.style.width = `${boundedValue}%`;
            $progressBarEl.textContent = `${boundedValue}%`;
            $progressBarEl.setAttribute(
                'aria-valuenow',
                boundedValue);
        }
    }


})();
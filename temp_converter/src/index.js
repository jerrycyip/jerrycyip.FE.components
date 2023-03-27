// IFFE to ensure modular pattern and minimize global scope collision of vars
(() => {
    const $celsiusInput = document.getElementById('celsius-input');
    const $fahrenheitInput = document.getElementById('fahrenheit-input');

    // call event listeners w/ appropriate formulas, source and destinations
    activateConverter($celsiusInput, $fahrenheitInput, (value) => (value * 9) / 5 + 32);
    activateConverter($fahrenheitInput, $celsiusInput, (value) => (value - 32) * 5 / 9);


    // main func for initiating temp converter as event listeners
    function activateConverter(source, dest, formula){
        // add event listener to provided source input  
        source.addEventListener('input', (event) => { 
            // convert input string to num
            const numericValue = Number(event.target.value);
            // check for non-nums and non-null/undefined values and blank spaces (trim)
            const isValid = !isNaN(numericValue) && Boolean(event.target.value.trim());
            // apply formula and format if valid else display blank
            dest.value = isValid ? format(formula(numericValue)) : '';  
        });
    }   

    // func to round to 4 dec places as necessary
    function format(num){  
        return /\.\d{5}/.test(num) // check if > 4 decim places
        ? Number(num).toFixed(4)  // round to 4 if necessary
        : num // else return num
    }

})();

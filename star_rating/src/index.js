(() => {
  function starRating(
    $rootElement,
    { max = 5, value = 0 },
  ) {
    // non-changing constant vars
    const STAR_ICON_CLASS = 'star-icon';
    const STAR_ICON_FILLED_CLASS = 'star-icon-filled';
    const STAR_TEMPLATE = `<svg
    xmlns="http://www.w3.org/2000/svg"
    class="${STAR_ICON_CLASS}"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    stroke-width="2">
    <path
    stroke-linecap="round"
    stroke-linejoin="round"
    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>`;
    // track latest selected (clicked) rating value
    let currentValue = value;


    initialize(max); // initialize w/ max star val
    setValue(currentValue); // set init value to default val

    // Expose setValue function so that users can change the value of the widget if needed (optional).    
    return {
      setValue,
    };

    // function to initialize star rating component
    function initialize(maxVal) {
      const html = Array.from(
        { length: maxVal }, // create Array from array-like obj w/ length property = max
        () => STAR_TEMPLATE, // each array elem = star_template
      ).join('');
      // Using .innerHTML is safe here since it's non-user content.
      $rootElement.innerHTML = html;
    
    // event listener for clicking stars
      $rootElement.addEventListener('click', (event) => {
        const $starEl = event.target.closest( // identify closest clicked star via
          `.${STAR_ICON_CLASS}`, // css selector to search for
        );
        if ($starEl == null) {
          return; // handler for nothing found
        }
        // get new star rating based on index of clicked star 
        const value = [...$rootElement.children].indexOf($starEl) + 1; 

        setValue(value); // set new star rating
      });
      
      // event listener for mouse over stars
      $rootElement.addEventListener('mouseover', (event) => {
          const $starEl = event.target.closest( // identify closest mouseover star via
            `.${STAR_ICON_CLASS}`,  // css selector to search for
          );
          if ($starEl == null) {
            return; // handler for nothing found
          }
        // get new star rating based on index of mouseover star 
          const value = [...$rootElement.children].indexOf($starEl) + 1;
          
          highlightStars(value); // set new star rating
        },
      );

      // event listener for mouseout of stars
      $rootElement.addEventListener('mouseout', () => {
        setValue(currentValue); // restore currentValue to last clicked (i.e. currentValue)
      });
    }

    function setValue(value) {
      currentValue = value; // update currentValue based on latest clicked
      highlightStars(currentValue); // highlight stars based on current value
    }

    // highlight stars based on current value (via mouseover or last clicked)
    function highlightStars(index) {
      for ( let i = 0; i < $rootElement.children.length; i++) {
        if (i < index) { // fill in selected stars
          $rootElement.children[i].classList.add(
            STAR_ICON_FILLED_CLASS,
          );
        } else { // clear out unselected stars
          $rootElement.children[i].classList.remove(
            STAR_ICON_FILLED_CLASS,
          );
        }
      }
    }
  }

  let setVal = starRating(document.getElementById('star-rating'), {
    max: 5,
    value: 3,
  });
  starRating(document.getElementById('star-rating-2'), {
    max: 10,
    value: 5,
  });

  // call star rating with diff test vals
const star1 = starRating(document.getElementById('star-rating'), {max: 5, value: 2});
star1.setValue(4); // call exposed func
const star2 = starRating(document.getElementById('star-rating-2'), {max: 8, value: 5});
star2.setValue(3);

  //
})();

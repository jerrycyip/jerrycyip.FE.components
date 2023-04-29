// Use IFFE to avoid global namespace var scope collisions. IFFEs ensures module
// pattern best practice and encapsulate variables within a local namespace
(() => {
  // loading spinner and heart icons
  const spinnerIconHTML = `<svg width="16" height="16" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke="currentColor"><g fill="none" fill-rule="evenodd"> <g transform="translate(1 1)" stroke-width="2"> <circle stroke-opacity=".5" cx="18" cy="18" r="18"/> <path d="M36 18c0-9.94-8.06-18-18-18"> <animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="1s" repeatCount="indefinite"/></path></g></g></svg>`;
  const heartIconHTML = `<svg fill="currentColor" viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg"><g><path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z"></path></g></svg>`;
  
  // instatiate like button via function call
  likeButton(
    document.querySelector('#like-button'),
    document.querySelector('.error-message'),
    );

  // main function to instantiate button and add click event listener
  // '$' prefix convention for params/vars to indicate DOM elems and ensure familiar syntax with legacy jquery APIs
  function likeButton($buttonEl, $errorMessageEl){
    let liked = false; // flag to determine if button is in default/liked state
    let isPending = false; // flag for whether there's a pending background API request
    let errorMessage = null; // error mssg shown if api request fails

    init(); // initialize base styling and event listener
    update(); // update state based on latest flags
    
    function init(){
      $buttonEl.classList.add('like-button'); // base styling
      $buttonEl.addEventListener('click', () => { // click event listener
        likeUnlikeAction(); // click event handler callback
      });
      // okay to use innerHTML since we have full control over contents (trustable)
      // use 2 spans to componentize the like button into the icon and the label
      $buttonEl.innerHTML = `<span class="like-button-icon"></span>
                            <span class="like-button-label"></span>`;
    }

    async function likeUnlikeAction(){
      try {
        isPending = true;
        errorMessage = null; // clear any prior error message
        update(); // update styling & disable button while awaiting api response

      const response = await fetch(
        'https://www.greatfrontend.com/api/questions/like-button',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            action: liked ? 'unlike' : 'like',
          }),
        },
      );

      if (!response.ok) { // error handling
        const res = await response.json();
        errorMessage = res.error || `Unknown error during attempted ${liked ? 'unlike' : 'like'}. Please try again later!`; // in case api is down
        return; // exit in event of error
      }
      // for successful API call: toggle liked flag
       liked = !liked;
      }
      // make updates regardless of failure/success
      finally { 
         isPending = false; 
         update(); 
      }
    }    

    function update(){
      $buttonEl.classList.toggle( // update liked state styling if applic. (i.e. successful API call)
        'like-button--liked',
        liked,
      );

      $buttonEl.classList.toggle( // update default state styling if applic (i.e. successful API call)
        'like-button--default',
        !liked,          
      );

      // update disabled status to avoid double click issues and confusion
      $buttonEl.disabled = isPending; 
      // update icon based on pending status
      $buttonEl.querySelector('.like-button-icon',
        ).innerHTML = isPending 
          ? spinnerIconHTML
          : heartIconHTML;
      
      // update button text           
      $buttonEl.querySelector('.like-button-label', 
      ).innerHTML = liked ? 'Liked' : 'Like'; 

      // set error message based on api error response or null if n/a
      $errorMessageEl.textContent = errorMessage || ''; 
    }

  }

})();

  /**
   * @param {string} username
   * @param {string} email
   * @param {string} password
   * @param {string} passwordConfirm
   */
  // func to submit form after successful field validation
  async function submitForm(
    username,
    email,
    password,
    passwordConfirm,
  ) {
    try {
      const response = await fetch(
        'https://www.greatfrontend.com/api/questions/sign-up',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
            email,
            password,
            password_confirm: passwordConfirm,
          }),
        },
      );

      const { message } = await response.json();
      alert(message);
    } catch (_) {
      alert('Error submitting form!');
    }
  }
// IFFE best practice to prevent global namespace var collision via private vars
// also ensures module pattern (pre ES6 modules)
(() => {
  // $ prefix convention for params/vars to indicate DOM elems and ensure familiar syntax with legacy jquery APIs
  const $form = document.querySelector('div.signup-form-wrapper > form');
  const $passwordConfirmInput = document.getElementById('password-confirm-input');
  const $passwordMismatchError = document.getElementById('password-mismatch-error');

  // add event listener for form submission 
  $form.addEventListener('submit', submitFn);

  // event handler callback func for form submission
  // validates password / confirm password fields match prior to invoking form submission API
  async function submitFn(event){
    event.preventDefault();
      
    // Reset the password confirm field.  
    $passwordConfirmInput.removeAttribute('aria-invalid'); // remove aria invalid attribute (in the event it was previously invalid)
    $passwordMismatchError.classList.add('hidden'); // hide error message (in the event it was previously visible)

    // construct a formData object from form values
    const formData = new FormData($form); 
    const password = formData.get('password');
    const passwordConfirm = formData.get('password_confirm'); // form names require underscores instead of dashes (interpreted as minus)

    // The only field we can't leverage the browser to validate is the pw confirmation, hence use JS to achieve
    if (password !== passwordConfirm) {
    // indicate that the value entered is invalid    
      $passwordConfirmInput.setAttribute( 
          'aria-invalid',
          'true',
        );
      // show error message
      $passwordMismatchError.classList.remove('hidden');
      return; // exit function early w/out submission
    }
    // invoke form submission func
    await submitForm(
      formData.get('username'),
      formData.get('email'),
      formData.get('password'),
      formData.get('password_confirm')
      );
    };

})()
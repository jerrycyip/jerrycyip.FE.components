(() => {
// Can ignore script file, it is only used to intercept the form submission event.
  const $form = document.querySelector('div.contact-form-wrapper > form');
  $form.addEventListener('submit', async (event) => {
     event.preventDefault();

    try {
      const formData = new FormData($form);
      const response = await fetch(
        'https://www.greatfrontend.com/api/questions/contact-form',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message'),
          }),
        },
      );

      const text = await response.text();
      alert(text);
    } catch (_) {
      alert('Error submitting form!');
    }
  });
})();

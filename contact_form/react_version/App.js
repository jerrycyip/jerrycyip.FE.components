import './styles.css';
import submitForm from './submitForm';

export default function App() {
  return (
    <div class="contact-form-wrapper">
      <form
        // Ignore the onSubmit prop, it's used only to
        // intercept the form submit event to check the coding solution.
        onSubmit={submitForm}
        action="https://www.greatfrontend.com/api/questions/contact-form"
        method="post">
        <div>
          <label htmlFor="name-input">Name</label>
          <input id="name-input" name="name" type="text"/>
        </div>
        <div>
          <label htmlFor="email-input">Email</label>
          <input id="email-input" name="email" type="email"/>
        </div>
        <div>
          <label htmlFor="message-input">Message</label>
          <textarea id="message-input" name="message"></textarea>
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

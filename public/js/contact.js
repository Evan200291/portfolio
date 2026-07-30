const form = document.querySelector('#contact-form');
const status = document.querySelector('#form-status');
const submitButton = form?.querySelector('button[type="submit"]');

form?.addEventListener('submit', async (event) => {
  event.preventDefault();
  status.className = 'form-status';
  status.textContent = 'Sending...';
  submitButton.disabled = true;

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Object.fromEntries(new FormData(form)))
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || 'Message could not be sent.');
    status.classList.add('success');
    status.textContent = result.message;
    form.reset();
  } catch (error) {
    status.classList.add('error');
    status.textContent = error.message;
  } finally {
    submitButton.disabled = false;
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#contactForm');
  const feedback = document.querySelector('#formFeedback');
  const backToTop = document.querySelector('#backToTop');
  const year = document.querySelector('#currentYear');

  year.textContent = new Date().getFullYear();

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      feedback.textContent = 'Revise os campos destacados.';
      feedback.className = 'form-feedback text-danger';
      return;
    }

    form.classList.remove('was-validated');
    feedback.textContent = 'Mensagem enviada! Em breve entraremos em contato.';
    feedback.className = 'form-feedback';
    form.reset();
  });

  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('is-visible', window.scrollY > 500);
  }, { passive: true });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

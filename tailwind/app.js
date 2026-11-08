document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.querySelector('#menuButton');
  const mainMenu = document.querySelector('#mainMenu');
  const slides = [...document.querySelectorAll('.carousel-slide')];
  const dots = [...document.querySelectorAll('.carousel-dot')];
  const form = document.querySelector('#contactForm');
  const feedback = document.querySelector('#formFeedback');
  const backToTop = document.querySelector('#backToTop');
  const modal = document.querySelector('#learningModal');
  let currentSlide = 0;

  document.querySelector('#currentYear').textContent = new Date().getFullYear();

  function closeModal() {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }

  document.querySelector('#openModal').addEventListener('click', () => {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  });
  document.querySelector('#closeModal').addEventListener('click', closeModal);
  document.querySelector('#cancelModal').addEventListener('click', closeModal);
  document.querySelector('#confirmModal').addEventListener('click', closeModal);
  modal.addEventListener('click', (event) => { if (event.target === modal) closeModal(); });

  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    mainMenu.classList.toggle('hidden', isOpen);
  });

  function showSlide(nextSlide) {
    currentSlide = (nextSlide + slides.length) % slides.length;
    slides.forEach((slide, index) => slide.classList.toggle('hidden', index !== currentSlide));
    dots.forEach((dot, index) => dot.classList.toggle('active', index === currentSlide));
  }

  document.querySelector('#prevSlide').addEventListener('click', () => showSlide(currentSlide - 1));
  document.querySelector('#nextSlide').addEventListener('click', () => showSlide(currentSlide + 1));
  dots.forEach((dot) => dot.addEventListener('click', () => showSlide(Number(dot.dataset.goTo))));
  window.setInterval(() => showSlide(currentSlide + 1), 5500);

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    form.classList.add('was-validated');
    if (!form.checkValidity()) {
      feedback.textContent = 'Revise os campos destacados.';
      feedback.className = 'text-sm font-semibold text-red-700';
      return;
    }
    feedback.textContent = 'Mensagem enviada! Em breve entraremos em contato.';
    feedback.className = 'text-sm font-semibold text-ink';
    form.reset();
    form.classList.remove('was-validated');
  });

  window.addEventListener('scroll', () => backToTop.classList.toggle('hidden', window.scrollY < 500), { passive: true });
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
});

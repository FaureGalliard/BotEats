// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Form validation and submission
const form = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const nameError = document.getElementById('name-error');
const emailError = document.getElementById('email-error');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let isValid = true;

  // Reset previous error states
  nameInput.classList.remove('error');
  emailInput.classList.remove('error');
  nameError.textContent = '';
  emailError.textContent = '';

  // Validate name
  if (!nameInput.value.trim()) {
    nameError.textContent = 'El nombre es obligatorio.';
    nameInput.classList.add('error');
    isValid = false;
  }

  // Validate email
  if (!emailInput.value.trim()) {
    emailError.textContent = 'El email es obligatorio.';
    emailInput.classList.add('error');
    isValid = false;
  } else if (!emailInput.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    emailError.textContent = 'Por favor, ingrese un email válido.';
    emailInput.classList.add('error');
    isValid = false;
  }

  // If valid, simulate submission and reset form
  if (isValid) {
    alert('¡Mensaje enviado con éxito!');
    form.reset();
  }
});
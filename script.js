document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  const navItems = document.querySelectorAll(".nav-links a");

  // Abrir/cerrar menú
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
  });

  // Cerrar menú al hacer clic en cualquier enlace
  navItems.forEach(link => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
    });
  });
});

// Verificador de formulario mejorado
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const nameField = document.getElementById("name");
  const emailField = document.getElementById("email");
  const businessField = document.getElementById("business");
  const interestField = document.getElementById("interest");
  const messageField = document.getElementById("message");

  // Objeto para almacenar el estado de validación
  const validationState = {
    name: false,
    email: false,
    business: false,
    interest: false
  };

  // Expresiones regulares para validación
  const patterns = {
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    name: /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]{2,50}$/,
    business: /^[a-zA-Z0-9áéíóúüñÁÉÍÓÚÜÑ\s&.-]{2,100}$/
  };

  // Función para crear mensajes de error
  function createErrorMessage(fieldId, message) {
    const existingError = document.getElementById(`${fieldId}-error`);
    if (existingError) {
      existingError.textContent = message;
      return;
    }

    const errorDiv = document.createElement('div');
    errorDiv.id = `${fieldId}-error`;
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    const field = document.getElementById(fieldId);
    field.parentNode.appendChild(errorDiv);
  }

  // Función para eliminar mensajes de error
  function removeErrorMessage(fieldId) {
    const errorDiv = document.getElementById(`${fieldId}-error`);
    if (errorDiv) {
      errorDiv.remove();
    }
  }

  // Función para validar campo individual
  function validateField(field, validationType) {
    const value = field.value.trim();
    const fieldId = field.id;
    let isValid = false;
    let errorMessage = '';

    // Eliminar clases de estado anterior
    field.classList.remove('valid', 'invalid');

    switch (validationType) {
      case 'name':
        if (!value) {
          errorMessage = 'El nombre es obligatorio';
        } else if (value.length < 2) {
          errorMessage = 'El nombre debe tener al menos 2 caracteres';
        } else if (!patterns.name.test(value)) {
          errorMessage = 'El nombre solo puede contener letras y espacios';
        } else {
          isValid = true;
        }
        break;

      case 'email':
        if (!value) {
          errorMessage = 'El correo electrónico es obligatorio';
        } else if (!patterns.email.test(value)) {
          errorMessage = 'Ingresa un correo electrónico válido';
        } else {
          isValid = true;
        }
        break;

      case 'business':
        if (!value) {
          errorMessage = 'El nombre del negocio es obligatorio';
        } else if (value.length < 2) {
          errorMessage = 'El nombre del negocio debe tener al menos 2 caracteres';
        } else if (!patterns.business.test(value)) {
          errorMessage = 'Nombre de negocio no válido';
        } else {
          isValid = true;
        }
        break;

      case 'interest':
        if (!value) {
          errorMessage = 'Selecciona un tipo de interés';
        } else {
          isValid = true;
        }
        break;
    }

    // Actualizar estado visual y mensajes
    if (isValid) {
      field.classList.add('valid');
      removeErrorMessage(fieldId);
      validationState[validationType] = true;
    } else {
      field.classList.add('invalid');
      createErrorMessage(fieldId, errorMessage);
      validationState[validationType] = false;
    }

    return isValid;
  }

  // Función para mostrar mensaje de éxito
  function showSuccessMessage() {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
      <i class="fas fa-check-circle"></i>
      <span>¡Formulario enviado correctamente! Te contactaremos pronto.</span>
    `;
    
    form.insertBefore(successDiv, form.firstChild);
    
    // Eliminar mensaje después de 5 segundos
    setTimeout(() => {
      successDiv.remove();
    }, 5000);
  }

  // Validación en tiempo real
  nameField.addEventListener('blur', () => validateField(nameField, 'name'));
  nameField.addEventListener('input', () => {
    if (nameField.classList.contains('invalid')) {
      validateField(nameField, 'name');
    }
  });

  emailField.addEventListener('blur', () => validateField(emailField, 'email'));
  emailField.addEventListener('input', () => {
    if (emailField.classList.contains('invalid')) {
      validateField(emailField, 'email');
    }
  });

  businessField.addEventListener('blur', () => validateField(businessField, 'business'));
  businessField.addEventListener('input', () => {
    if (businessField.classList.contains('invalid')) {
      validateField(businessField, 'business');
    }
  });

  interestField.addEventListener('change', () => validateField(interestField, 'interest'));

  // Validación al enviar el formulario
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Validar todos los campos
    const nameValid = validateField(nameField, 'name');
    const emailValid = validateField(emailField, 'email');
    const businessValid = validateField(businessField, 'business');
    const interestValid = validateField(interestField, 'interest');

    // Verificar si todos los campos son válidos
    const allValid = nameValid && emailValid && businessValid && interestValid;

    if (allValid) {
      // Simular envío del formulario
      const submitButton = form.querySelector('.submit-button');
      const originalText = submitButton.textContent;
      
      submitButton.textContent = 'Enviando...';
      submitButton.disabled = true;

      // Simular tiempo de envío
      setTimeout(() => {
        showSuccessMessage();
        form.reset();
        
        // Limpiar estados de validación
        Object.keys(validationState).forEach(key => {
          validationState[key] = false;
        });
        
        // Remover clases de validación
        [nameField, emailField, businessField, interestField].forEach(field => {
          field.classList.remove('valid', 'invalid');
        });

        submitButton.textContent = originalText;
        submitButton.disabled = false;
      }, 2000);
    } else {
      // Enfocar el primer campo con error
      const firstInvalidField = form.querySelector('.invalid');
      if (firstInvalidField) {
        firstInvalidField.focus();
      }
    }
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

const fadeElements = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // Para que solo se active una vez
    }
  });
}, {
  threshold: 0.1
});

fadeElements.forEach(el => observer.observe(el));
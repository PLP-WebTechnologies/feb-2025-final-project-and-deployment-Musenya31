// Image Slider Logic for Home Page
document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');
  let currentIndex = 0;
  const totalSlides = slides.length;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % totalSlides;
    showSlide(currentIndex);
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    showSlide(currentIndex);
  }

  if (prevBtn && nextBtn && slides.length > 0) {
    prevBtn.addEventListener('click', showPrev);
    nextBtn.addEventListener('click', showNext);

    // Optional: auto slide every 5 seconds
    setInterval(showNext, 5000);

    // Keyboard accessibility for slider
    const slider = document.getElementById('slider');
    slider.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        showPrev();
      } else if (e.key === 'ArrowRight') {
        showNext();
      }
    });
  }

  // Contact form validation
  const form = document.getElementById('contactForm');
  if (!form) return; // no contact form on this page, skip.

  const nameInput = form.querySelector('#name');
  const emailInput = form.querySelector('#email');
  const messageInput = form.querySelector('#message');

  const nameError = form.querySelector('#nameError');
  const emailError = form.querySelector('#emailError');
  const messageError = form.querySelector('#messageError');
  const formSuccess = form.querySelector('#formSuccess');

  function validateName() {
    if (!nameInput.value.trim()) {
      nameError.textContent = 'Name is required.';
      return false;
    }
    nameError.textContent = '';
    return true;
  }

  function validateEmail() {
    const email = emailInput.value.trim();
    if (!email) {
      emailError.textContent = 'Email is required.';
      return false;
    }
    // Simple email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      emailError.textContent = 'Please enter a valid email address.';
      return false;
    }
    emailError.textContent = '';
    return true;
  }

  function validateMessage() {
    if (!messageInput.value.trim()) {
      messageError.textContent = 'Message is required.';
      return false;
    }
    messageError.textContent = '';
    return true;
  }

  nameInput.addEventListener('input', validateName);
  emailInput.addEventListener('input', validateEmail);
  messageInput.addEventListener('input', validateMessage);

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isMessageValid = validateMessage();

    if (isNameValid && isEmailValid && isMessageValid) {
      formSuccess.textContent = 'Thank you for your message! We will get back to you soon.';
      form.reset();
      // Clear errors on reset
      nameError.textContent = '';
      emailError.textContent = '';
      messageError.textContent = '';
    } else {
      formSuccess.textContent = '';
    }
  });
});

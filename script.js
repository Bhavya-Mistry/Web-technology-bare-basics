// Dark mode toggle button
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

darkModeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  if (body.classList.contains('dark-mode')) {
    darkModeToggle.textContent = '☀️';
  } else {
    darkModeToggle.textContent = '🌙';
  }
});

// Mobile nav toggle
const navToggleBtn = document.querySelector('.nav-toggle');
const navLinks = document.getElementById('nav-links');

navToggleBtn.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggleBtn.setAttribute('aria-expanded', isOpen);
});

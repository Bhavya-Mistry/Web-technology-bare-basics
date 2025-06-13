document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    // Toggle mobile navigation
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active'); // For hamburger animation
        });
    }

    // Smooth scroll for navigation links & close mobile menu on click
    document.querySelectorAll('.nav-links a, .nav-brand').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Check if the link is a standard anchor link
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();

                // Close mobile nav if it's open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    navToggle.classList.remove('active');
                }

                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    // Account for the height of the sticky navbar
                    const offset = document.querySelector('.navbar').offsetHeight;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - offset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});
document.addEventListener('DOMContentLoaded', () => {
    // Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            window.scrollTo({
                top: targetElement.offsetTop - document.querySelector('header').offsetHeight,
                behavior: 'smooth'
            });
        });
    });

    // Mobile Menu Toggle (if you add a mobile menu in the future)
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const navMenu = document.querySelector('nav ul');

    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // Form Validation (Basic)
    const form = document.querySelector('form');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !message) {
                e.preventDefault();
                alert('Please fill out all fields.');
                return;
            }
            
            // Optionally add more validation rules here
            // e.g., regex for email validation

            alert('Thank You!');
        });
    }
});

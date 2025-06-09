document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS (Animate On Scroll) library
    // This allows elements to fade in or animate as they come into the viewport.
    AOS.init({
        duration: 1000, // Animation duration in milliseconds
        easing: 'ease-out-quad', // Easing function for animations
        once: true, // Whether animation should happen only once - true for portfolio sections
        mirror: false, // Whether elements should animate out while scrolling past them
        offset: 100, // Offset (in px) from the original trigger point
    });

    // Smooth scroll navigation for all anchor links within the page
    // This provides a pleasant user experience when navigating between sections.
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent default anchor click behavior (e.g., instant jump)

            const targetId = this.getAttribute('href'); // Get the target section's ID from the href
            const targetElement = document.querySelector(targetId); // Select the target element

            if (targetElement) {
                // Scroll to the target element smoothly
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Optional: Add an active class to navbar links based on scroll position
    // This provides visual feedback to the user about which section they are currently viewing.
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    // Function to set active link
    const setActiveLink = () => {
        let current = '';

        // Determine which section is currently in view
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Check if the current scroll position is within the section
            if (pageYOffset >= sectionTop - sectionHeight / 3) { // Adjusted offset for better activation
                current = section.getAttribute('id');
            }
        });

        // Remove 'active' class from all links and add to the current one
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    };

    // Listen for scroll events to update the active link
    window.addEventListener('scroll', setActiveLink);
    // Call it once on load to set the initial active link (e.g., for the hero section)
    setActiveLink();

    // Handle form submission (example - typically this would send data to a backend)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default form submission

            // In a real application, you would collect form data and send it to a server.
            // For this example, we'll just log it and provide a simple alert.
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            console.log('Form Submitted!', { name, email, message });

            // Display a message to the user instead of an alert()
            // A simple div can be added to the HTML and updated here.
            const formStatusMessage = document.createElement('p');
            formStatusMessage.textContent = 'Thank you for your message! I will get back to you soon.';
            formStatusMessage.style.cssText = `
                color: var(--deep-green);
                background-color: var(--gold);
                padding: 1rem;
                border-radius: var(--border-radius-2xl);
                margin-top: 1rem;
                font-weight: 600;
            `;
            contactForm.append(formStatusMessage); // Add message below the form

            contactForm.reset(); // Clear the form fields
            
            // Remove the message after a few seconds
            setTimeout(() => {
                formStatusMessage.remove();
            }, 5000); 
        });
    }
});

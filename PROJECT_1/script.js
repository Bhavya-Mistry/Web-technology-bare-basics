// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// You can add more JavaScript code here for additional interactivity

// Example: Toggle dark/light mode
const toggleButton = document.querySelector('.toggle-theme');
toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});
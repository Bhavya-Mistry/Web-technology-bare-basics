// Add event listener to button
document.querySelector('button').addEventListener('click', () => {
    // Add animation to sections
    document.querySelectorAll('section').forEach((section) => {
        section.classList.add('animate');
    });
});

// Add animation class to sections
document.querySelectorAll('section').forEach((section) => {
    section.addEventListener('animationend', () => {
        section.classList.remove('animate');
    });
});
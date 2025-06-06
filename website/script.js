// Dark mode toggle button
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

// Check for saved dark mode preference
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    darkModeToggle.textContent = '☀️'; // Sun icon for dark mode
} else {
    darkModeToggle.textContent = '🌙'; // Moon icon for light mode
}

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
        darkModeToggle.textContent = '☀️'; // Change to sun icon
        localStorage.setItem('theme', 'dark'); // Save preference
    } else {
        darkModeToggle.textContent = '🌙'; // Change to moon icon
        localStorage.setItem('theme', 'light'); // Save preference
    }
});

// Mobile nav toggle
const navToggleBtn = document.querySelector('.nav-toggle');
const navLinks = document.getElementById('nav-links');

navToggleBtn.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggleBtn.setAttribute('aria-expanded', isOpen);
    // Add/remove overflow hidden on body to prevent scrolling when nav is open
    document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Close mobile nav when a link is clicked (for smoother UX)
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('open')) {
            navLinks.classList.remove('open');
            navToggleBtn.setAttribute('aria-expanded', false);
            document.body.style.overflow = ''; // Restore scrolling
        }
    });
});

// Optional: Close mobile nav when clicking outside of it
document.addEventListener('click', (event) => {
    const isClickInsideNav = navLinks.contains(event.target) || navToggleBtn.contains(event.target);
    if (!isClickInsideNav && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        navToggleBtn.setAttribute('aria-expanded', false);
        document.body.style.overflow = '';
    }
});


// --- Modal Logic ---
const projectModal = document.getElementById('projectModal');
const closeButton = document.querySelector('.close-button');
// IMPORTANT: Ensure this selector correctly targets your "Learn More" buttons.
// It should be applied to all buttons that open a modal.
const openModalBtns = document.querySelectorAll('.open-modal-btn'); 

// Get modal elements - ensure these IDs exist in your HTML modal structure
const modalProjectTitle = document.getElementById('modalProjectTitle');
const modalLongDescription = document.getElementById('modalLongDescription');
const modalTechnologies = document.getElementById('modalTechnologies');
const modalChallenges = document.getElementById('modalChallenges');
const modalOutcomes = document.getElementById('modalOutcomes');
const modalGithubLink = document.getElementById('modalGithubLink');
// This one is specifically for Streamlit apps, it might be hidden for ML projects
const modalLiveAppLink = document.getElementById('modalLiveAppLink'); 


// Function to open the modal
function openModal(projectData) {
    modalProjectTitle.textContent = projectData.title;
    modalLongDescription.textContent = projectData.longDescription;
    modalTechnologies.textContent = projectData.technologies;
    modalChallenges.textContent = projectData.challenges;
    modalOutcomes.textContent = projectData.outcomes;
    modalGithubLink.href = projectData.githubLink;

    // Handle live app link visibility. It should be hidden for ML projects.
    // The previous code had specific placeholders to check, let's make it robust.
    if (projectData.liveAppLink && 
        projectData.liveAppLink !== 'YOUR_DEPLOYED_FLIGHT_APP_LINK' && 
        projectData.liveAppLink !== 'YOUR_DEPLOYED_CUSTOMER_SEG_APP_LINK' && 
        projectData.liveAppLink !== 'YOUR_DEPLOYED_TEXT_SUM_APP_LINK' &&
        projectData.liveAppLink !== '#' && // Also check for default empty href
        projectData.liveAppLink !== 'null') { // Check for 'null' string
        
        modalLiveAppLink.href = projectData.liveAppLink;
        modalLiveAppLink.style.display = 'inline-flex'; // Show the button if valid link
    } else {
        modalLiveAppLink.style.display = 'none'; // Hide if no valid live app link
    }

    projectModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scroll
}

// Function to close the modal
function closeModal() {
    projectModal.classList.remove('active');
    document.body.style.overflow = ''; // Re-enable background scroll
}

// Event listeners for opening modal
openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default link behavior (e.g., scrolling to top for href="#")
        const projectCard = e.target.closest('.project-card'); // Find the nearest parent with class 'project-card'

        // Check if projectCard is found before accessing its dataset
        if (projectCard) {
            const projectData = {
                title: projectCard.dataset.title || 'N/A', // Provide default if missing
                longDescription: projectCard.dataset.longDescription || 'No detailed description available.',
                technologies: projectCard.dataset.technologies || 'No technologies listed.',
                challenges: projectCard.dataset.challenges || 'No specific challenges mentioned.',
                outcomes: projectCard.dataset.outcomes || 'No outcomes described.',
                githubLink: projectCard.dataset.githubLink || '#',
                liveAppLink: projectCard.dataset.liveAppLink || null // Will be null if not present
            };
            openModal(projectData);
        } else {
            console.error("Could not find parent .project-card for the clicked 'Learn More' button.");
        }
    });
});

// Event listeners for closing modal
closeButton.addEventListener('click', closeModal);

// Close modal when clicking outside of it
window.addEventListener('click', (event) => {
    if (event.target === projectModal) { // Only close if the click is directly on the overlay
        closeModal();
    }
});

// Close modal with ESC key
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && projectModal.classList.contains('active')) {
        closeModal();
    }
});
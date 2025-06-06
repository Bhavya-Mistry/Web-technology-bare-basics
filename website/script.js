// Universal JS for all pages

// 1. Grand opening curtains
window.addEventListener('load', () => {
    const leftCurtain = document.querySelector('.curtain.left');
    const rightCurtain = document.querySelector('.curtain.right');
    const body = document.body;

    // Check if curtains exist before trying to animate them (they only exist on index.html)
    if (leftCurtain && rightCurtain) {
        requestAnimationFrame(() => {
            leftCurtain.classList.add('open');
            rightCurtain.classList.add('open');
        });

        // Remove scroll lock after curtain animation
        setTimeout(() => {
            body.classList.remove('lock-scroll');
        }, 1500); // Should be slightly less than curtain transition duration
    } else {
        // If no curtains, just remove scroll lock immediately
        body.classList.remove('lock-scroll');
    }
});

// 2. Scroll reveal
const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            obs.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 }); // Trigger when 10% of the element is visible

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// 3. Dark mode toggle
document.getElementById('darkModeToggle')?.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    // Optionally save preference to localStorage
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});

// Apply saved theme preference on load
window.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
    }
});

// 4. Navbar toggle for mobile
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.getElementById('nav-links');

if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', !isExpanded);
        navLinks.classList.toggle('open');
    });

    // Close nav when a link is clicked (for single-page navigation)
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('open')) {
                navToggle.setAttribute('aria-expanded', 'false');
                navLinks.classList.remove('open');
            }
        });
    });
}

// 5. Scroll to Top Button
const scrollToTopBtn = document.getElementById('scrollToTopBtn');

if (scrollToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) { // Show button after scrolling down 300px
            scrollToTopBtn.style.display = 'flex'; // Use flex for centering icon
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}


// 6. Project Modal Logic (for ml-projects.html and streamlit-apps.html)
const projectModal = document.getElementById('projectModal');
const closeModalButton = document.querySelector('.close-button');
const modalProjectTitle = document.getElementById('modalProjectTitle');
const modalLongDescription = document.getElementById('modalLongDescription');
const modalTechnologies = document.getElementById('modalTechnologies');
const modalChallenges = document.getElementById('modalChallenges');
const modalOutcomes = document.getElementById('modalOutcomes');
const modalGithubLink = document.getElementById('modalGithubLink');
const modalLiveAppLink = document.getElementById('modalLiveAppLink');

// Sample project data (replace with your actual detailed project data)
const projectsData = {
    'ml-project-1': {
        title: 'Credit Card Fraud Detection',
        description: 'This project focuses on building a robust machine learning model to detect fraudulent credit card transactions. The challenge lies in dealing with highly imbalanced datasets where fraudulent transactions are very rare. The solution involved extensive data preprocessing, feature engineering, and evaluating various classification algorithms (e.g., Isolation Forest, SVM, Logistic Regression, XGBoost) with a focus on metrics like Recall and Precision, rather than just accuracy. Techniques such as SMOTE and NearMiss were explored to handle class imbalance. The final model achieved a high recall rate, minimizing undetected fraud.',
        technologies: 'Python, Pandas, NumPy, Scikit-learn, Imbalanced-learn, Matplotlib, Seaborn',
        challenges: 'Handling extreme class imbalance, optimizing for high recall while maintaining reasonable precision, selecting appropriate evaluation metrics.',
        outcomes: 'Developed a model with a recall of 92% on fraudulent transactions. Gained deep understanding of imbalanced learning techniques and their impact on model performance. The model provides early warning signals for suspicious transactions.',
        github: 'https://github.com/BhavyaMistry/credit-fraud-detection',
        live: '' // No live app for this
    },
    'ml-project-2': {
        title: 'Customer Churn Prediction',
        description: 'This project aimed to predict customer churn in a telecom company to proactively identify at-risk customers. I utilized historical customer data, including demographics, service usage, and billing information. The process involved data cleaning, exploratory data analysis to understand churn drivers, feature selection, and building classification models. Gradient Boosting Machines (XGBoost, LightGBM) and Random Forest were particularly effective. Model interpretability techniques like SHAP were used to explain why certain customers were predicted to churn, providing actionable insights for marketing and retention teams.',
        technologies: 'Python, Pandas, Scikit-learn, XGBoost, LightGBM, SHAP, Matplotlib, Seaborn',
        challenges: 'Identifying relevant features from raw data, dealing with missing values, model interpretability for business decisions.',
        outcomes: 'Achieved a predictive accuracy of 88% and identified top 5 factors contributing to churn. The insights enabled targeted retention campaigns, leading to a projected 10% reduction in churn rate for identified high-risk customer segments.',
        github: 'https://github.com/BhavyaMistry/customer-churn-prediction',
        live: ''
    },
    'ml-project-3': {
        title: 'News Article Classifier (NLP)',
        description: 'Developed an NLP system to automatically categorize news articles into predefined topics (e.g., Sports, Politics, Technology). The project involved extensive text preprocessing, including tokenization, stop-word removal, stemming/lemmatization. Different text vectorization techniques like TF-IDF and Word Embeddings (Word2Vec) were compared. Machine learning models such as Naive Bayes, SVM, and deep learning models (LSTMs) were trained and evaluated for multi-class classification. The deep learning approach with pre-trained word embeddings showed superior performance.',
        technologies: 'Python, NLTK, SpaCy, Scikit-learn, TensorFlow/Keras, Word2Vec',
        challenges: 'Handling noisy text data, selecting optimal text representation, fine-tuning deep learning models for classification.',
        outcomes: 'Achieved an F1-score of 91% for news article classification. The model provides an efficient way to organize and search news content, improving content discoverability.',
        github: 'https://github.com/BhavyaMistry/news-classifier-nlp',
        live: ''
    },
    'ml-project-4': {
        title: 'Image Classification with CNNs',
        description: 'This project involved designing and training Convolutional Neural Networks (CNNs) for various image classification tasks. Datasets included common benchmarks (e.g., CIFAR-10, Fashion MNIST) and a custom dataset for a specific domain (e.g., classifying types of flowers). I explored different CNN architectures (e.g., VGG, ResNet concepts), implemented data augmentation strategies to prevent overfitting, and utilized transfer learning from pre-trained models (ImageNet) to achieve high accuracy with limited data. The project also focused on visualizing activations to understand model decisions.',
        technologies: 'Python, TensorFlow/Keras, OpenCV, NumPy, Matplotlib, Scikit-image',
        challenges: 'Preventing overfitting with limited datasets, hyperparameter tuning for CNNs, understanding model decision-making through visualization.',
        outcomes: 'Achieved state-of-the-art accuracy on target datasets. Demonstrated robust image classification capabilities, applicable to various visual recognition problems like defect detection or medical image analysis.',
        github: 'https://github.com/BhavyaMistry/image-classification-cnn',
        live: ''
    },
    'streamlit-app-1': {
        title: 'Sentiment Analysis App',
        description: 'Developed an interactive web application using Streamlit that performs real-time sentiment analysis. Users can input text, and the app immediately classifies it as positive, negative, or neutral, along with a confidence score. The backend uses a pre-trained NLP model (e.g., from Hugging Face Transformers or a custom trained model) and demonstrates model inference deployment. This app showcases the ability to create user-friendly interfaces for ML models.',
        technologies: 'Python, Streamlit, NLTK, Transformers (Hugging Face)',
        challenges: 'Deploying a heavy NLP model efficiently, ensuring fast inference for real-time feedback, designing an intuitive UI for users.',
        outcomes: 'Successfully deployed a real-time sentiment analysis tool. Provides instant feedback to users and serves as a practical example of MLOps for NLP models, proving ability to move models from training to interactive applications.',
        github: 'https://github.com/BhavyaMistry/streamlit-sentiment-app',
        live: 'https://your-streamlit-sentiment-app-link.streamlit.app' // Replace with your actual live app URL
    },
    'streamlit-app-2': {
        title: 'House Price Predictor',
        description: 'An interactive Streamlit application that allows users to predict house prices based on various input features such as square footage, number of bedrooms, bathrooms, and location. The app takes user inputs via sliders and dropdowns, feeds them into a trained regression model (e.g., Random Forest Regressor), and displays the predicted price instantly. This demonstrates data preprocessing, model loading, and interactive visualization in a web environment.',
        technologies: 'Python, Streamlit, Scikit-learn, Pandas, NumPy, Joblib (for model loading)',
        challenges: 'Creating a seamless user experience for input collection, ensuring correct feature scaling/encoding for prediction, deploying the app reliably.',
        outcomes: 'Built a user-friendly house price prediction tool. Showcases ability to deploy regression models and create data-driven tools that are accessible to non-technical users.',
        github: 'https://github.com/BhavyaMistry/streamlit-house-price-predictor',
        live: 'https://your-streamlit-house-price-app-link.streamlit.app' // Replace with your actual live app URL
    },
    'streamlit-app-3': {
        title: 'Interactive Data Dashboard',
        description: 'Designed and implemented a comprehensive interactive data dashboard using Streamlit. This dashboard allows users to upload their own CSV data or select from pre-loaded datasets, apply various filters, and generate dynamic visualizations (e.g., bar charts, scatter plots, line graphs). It includes features like data summarization, correlation matrices, and customizable plot types, empowering users to perform exploratory data analysis directly through a web interface.',
        technologies: 'Python, Streamlit, Pandas, Plotly, Seaborn, Matplotlib',
        challenges: 'Handling diverse datasets, optimizing rendering for large datasets, ensuring flexibility for user-driven analysis.',
        outcomes: 'Created a versatile tool for quick data exploration and visualization. Demonstrated strong data engineering and visualization skills, enabling users to derive insights without needing to write code.',
        github: 'https://github.com/BhavyaMistry/streamlit-data-dashboard',
        live: 'https://your-streamlit-dashboard-link.streamlit.app' // Replace with your actual live app URL
    }
};

document.querySelectorAll('.view-details-btn').forEach(button => {
    button.addEventListener('click', () => {
        const projectId = button.closest('.project-card').dataset.projectId;
        const project = projectsData[projectId];

        if (project) {
            modalProjectTitle.textContent = project.title;
            modalLongDescription.textContent = project.description;
            modalTechnologies.textContent = project.technologies;
            modalChallenges.textContent = project.challenges;
            modalOutcomes.textContent = project.outcomes;
            modalGithubLink.href = project.github;

            if (project.live) {
                modalLiveAppLink.href = project.live;
                modalLiveAppLink.style.display = 'inline-flex'; // Show live app button
            } else {
                modalLiveAppLink.style.display = 'none'; // Hide if no live app
            }

            projectModal.classList.add('active');
            document.body.classList.add('lock-scroll'); // Lock scroll when modal is open
        }
    });
});

closeModalButton?.addEventListener('click', () => {
    projectModal.classList.remove('active');
    document.body.classList.remove('lock-scroll');
});

window.addEventListener('click', (event) => {
    if (event.target === projectModal) {
        projectModal.classList.remove('active');
        document.body.classList.remove('lock-scroll');
    }
});
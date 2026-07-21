// Aditya Saxena Portfolio - Main Interactive Logic

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initSkillsFilter();
  initProjectModals();
  initContactForm();
  initCopyButtons();
});

/* 1. Navbar Scroll & Active Section Highlighting */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-links');

  // Mobile menu toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.className = navMenu.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
      }
    });

    // Close menu when link clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) icon.className = 'fas fa-bars';
      });
    });
  }

  // Scroll active section tracking
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = sectionId;
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });

    // Shadow on scroll
    if (scrollY > 20) {
      navbar.style.boxShadow = '0 4px 20px -2px rgba(15, 23, 42, 0.08)';
    } else {
      navbar.style.boxShadow = 'none';
    }
  });
}

/* 2. Skills Category Filter */
function initSkillsFilter() {
  const filterBtns = document.querySelectorAll('.skill-tab-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
          card.style.animation = 'fadeIn 0.3s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* 3. Project Detail Modals */
const projectData = {
  ecommerce: {
    title: "Full Stack E-Commerce Platform",
    role: "Full Stack Web Project (2026)",
    tech: ["MongoDB", "Express.js", "React.js", "Node.js", "JWT", "REST API", "CSS3"],
    description: "Architected and engineered a feature-complete e-commerce web application using the MERN stack.",
    highlights: [
      "Built responsive React frontend with product catalog, cart management, and checkout UI.",
      "Implemented secure JWT (JSON Web Token) authentication and password encryption.",
      "Designed RESTful API endpoints for user auth, product CRUD operations, and order processing.",
      "Optimized MongoDB data schema for efficient querying of product catalogs and user orders."
    ],
    github: "https://github.com/Adityasaxena-77",
    demo: "#"
  },
  booksharing: {
    title: "Book Sharing Software - Backend API",
    role: "Backend Microservice (2025)",
    tech: ["Node.js", "Express.js", "MongoDB", "Postman", "HTML5", "CSS3"],
    description: "Developed robust backend microservices and APIs enabling peer-to-peer book sharing and catalog management.",
    highlights: [
      "Engineered secure user authentication and session management using Node.js & Express.",
      "Built clean CRUD APIs allowing users to list, search, borrow, and update book records.",
      "Conducted complete endpoint testing and validation using Postman.",
      "Built an intuitive HTML/CSS dashboard interface to showcase live API interactions."
    ],
    github: "https://github.com/Adityasaxena-77",
    demo: "#"
  }
};

function initProjectModals() {
  const modalBackdrop = document.getElementById('projectModal');
  const modalClose = document.getElementById('modalClose');
  const detailBtns = document.querySelectorAll('.view-project-detail');

  if (!modalBackdrop) return;

  detailBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project');
      const data = projectData[projectId];

      if (data) {
        document.getElementById('modalTitle').textContent = data.title;
        document.getElementById('modalRole').textContent = data.role;
        document.getElementById('modalDesc').textContent = data.description;

        const techContainer = document.getElementById('modalTech');
        techContainer.innerHTML = data.tech.map(t => `<span class="tech-badge">${t}</span>`).join('');

        const highlightsContainer = document.getElementById('modalHighlights');
        highlightsContainer.innerHTML = data.highlights.map(h => `<li>${h}</li>`).join('');

        document.getElementById('modalGithub').setAttribute('href', data.github);
        
        modalBackdrop.classList.add('active');
      }
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', () => {
      modalBackdrop.classList.remove('active');
    });
  }

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) {
      modalBackdrop.classList.remove('active');
    }
  });
}

/* 4. Contact Form Validation */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('contactName');
    const emailInput = document.getElementById('contactEmail');
    const subjectInput = document.getElementById('contactSubject');
    const messageInput = document.getElementById('contactMessage');

    let isValid = true;

    // Clear previous errors
    document.querySelectorAll('.form-error').forEach(el => el.style.display = 'none');

    // Name validation
    if (!nameInput.value.trim()) {
      showError(nameInput, 'Please enter your name');
      isValid = false;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailInput.value.trim())) {
      showError(emailInput, 'Please enter a valid email address');
      isValid = false;
    }

    // Subject validation
    if (!subjectInput.value.trim()) {
      showError(subjectInput, 'Please enter a subject');
      isValid = false;
    }

    // Message validation
    if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
      showError(messageInput, 'Message should be at least 10 characters long');
      isValid = false;
    }

    if (isValid) {
      showToast('Message sent successfully! Aditya will contact you soon.');
      form.reset();
    }
  });
}

function showError(inputElement, message) {
  const errorElement = inputElement.parentElement.querySelector('.form-error');
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.style.display = 'block';
  }
}

/* 5. Copy to Clipboard Utility */
function initCopyButtons() {
  const copyBtns = document.querySelectorAll('.copy-trigger');

  copyBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-copy');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied "${textToCopy}" to clipboard!`);
        }).catch(err => {
          showToast(`Direct copy: ${textToCopy}`);
        });
      }
    });
  });
}

/* Toast Notification Utility */
function showToast(message) {
  let toast = document.getElementById('toastNotification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastNotification';
    toast.className = 'toast-notification';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<i class="fas fa-check-circle" style="color:#10b981;"></i> <span>${message}</span>`;
  toast.classList.add('active');

  setTimeout(() => {
    toast.classList.remove('active');
  }, 4000);
}

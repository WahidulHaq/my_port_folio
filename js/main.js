/*
======================
    Preloader
======================
*/
window.addEventListener('load', function() {
    // Hide preloader
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.display = 'none';
    }
    
    // Initialize AOS animation library
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });
});

/*
======================
    Navbar Scroll
======================
*/
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        navbar.classList.add('navbar-scroll');
    } else {
        navbar.classList.remove('navbar-scroll');
    }
});

/*
======================
    Smooth Scroll
======================
*/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
            
            // Update active nav link
            document.querySelectorAll('.navbar .nav-link').forEach(navLink => {
                navLink.classList.remove('active');
            });
            this.classList.add('active');
        }
    });
});

/*
======================
    Back to Top Button
======================
*/
const backToTopButton = document.querySelector('.back-to-top');

window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
        backToTopButton.classList.add('active');
    } else {
        backToTopButton.classList.remove('active');
    }
});

backToTopButton.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

/*
======================
    Portfolio Filter
======================
*/
const portfolioFilters = document.querySelectorAll('.portfolio-filters .btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

portfolioFilters.forEach(filter => {
    filter.addEventListener('click', function() {
        // Remove active class from all filters
        portfolioFilters.forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Add active class to clicked filter
        this.classList.add('active');
        
        const filterValue = this.getAttribute('data-filter');
        
        // Show/hide portfolio items based on filter
        portfolioItems.forEach(item => {
            if (filterValue === '*' || item.classList.contains(filterValue.substring(1))) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 50);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

/*
======================
    Typed.js for Dynamic Text
======================
*/
if (document.querySelector('.typed-text')) {
    const typed = new Typed('.typed-text', {
        strings: ["Web Developer", "UI/UX Designer", "Freelancer", "Creative Thinker"],
        typeSpeed: 80,
        backSpeed: 40,
        backDelay: 1000,
        loop: true
    });
}

/*
======================
    Form Validation
======================
*/
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simple form validation
        let valid = true;
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const subject = document.getElementById('subject');
        const message = document.getElementById('message');
        
        if (!name.value.trim()) {
            valid = false;
            name.classList.add('is-invalid');
        } else {
            name.classList.remove('is-invalid');
        }
        
        if (!email.value.trim() || !validateEmail(email.value)) {
            valid = false;
            email.classList.add('is-invalid');
        } else {
            email.classList.remove('is-invalid');
        }
        
        if (!subject.value.trim()) {
            valid = false;
            subject.classList.add('is-invalid');
        } else {
            subject.classList.remove('is-invalid');
        }
        
        if (!message.value.trim()) {
            valid = false;
            message.classList.add('is-invalid');
        } else {
            message.classList.remove('is-invalid');
        }
        
        if (valid) {
            // Here you would normally send the form data to your server
            // For demo purposes, just show a success message
            const formElements = contactForm.elements;
            for (let i = 0; i < formElements.length; i++) {
                if (formElements[i].type !== 'submit') {
                    formElements[i].value = '';
                }
            }
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'alert alert-success';
            successMessage.textContent = 'Your message has been sent successfully!';
            contactForm.prepend(successMessage);
            
            // Remove success message after 5 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
        }
    });
}

// Email validation function
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

/*
======================
    Skills Progress Bar
======================
*/
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar .progress-bar');
    skillBars.forEach(bar => {
        const percentage = bar.getAttribute('aria-valuenow') + '%';
        bar.style.width = percentage;
    });
}

// Animate skill bars when they come into view
const skillsSection = document.querySelector('#skills');
if (skillsSection) {
    window.addEventListener('scroll', function() {
        const sectionPosition = skillsSection.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (sectionPosition < screenPosition) {
            animateSkillBars();
        }
    });
}

/*
======================
    Count Up Animation
======================
*/
function startCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps -> 16ms per frame
        
        let count = 0;
        
        const updateCount = () => {
            count += increment;
            
            if (count < target) {
                counter.textContent = Math.floor(count);
                requestAnimationFrame(updateCount);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCount();
    });
}

// Start counters when they come into view
const statsSection = document.querySelector('#stats');
if (statsSection) {
    window.addEventListener('scroll', function() {
        const sectionPosition = statsSection.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (sectionPosition < screenPosition) {
            startCounters();
            // Remove the event listener after counters have started
            window.removeEventListener('scroll', this);
        }
    });
}

/*
======================
    Portfolio Modal
======================
*/
const portfolioLinks = document.querySelectorAll('.portfolio-info .btn');

portfolioLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Here you would normally fetch project details and display them in a modal
        // For demo purposes, just log the action
        console.log('Portfolio item clicked: ' + this.parentElement.querySelector('h4').textContent);
        
        // You could also implement a modal display here using Bootstrap's modal component
    });
});

/*
======================
    Theme Switcher
======================
*/
const themeSwitcher = document.querySelector('.theme-switcher');
if (themeSwitcher) {
    themeSwitcher.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        
        // Save theme preference to localStorage
        const isDarkTheme = document.body.classList.contains('dark-theme');
        localStorage.setItem('darkTheme', isDarkTheme);
    });
    
    // Load theme preference from localStorage
    const savedTheme = localStorage.getItem('darkTheme');
    if (savedTheme === 'true') {
        document.body.classList.add('dark-theme');
    }
}

/*
======================
    Navbar Toggler
======================
*/
const navbarToggler = document.querySelector('.navbar-toggler');
const navbarCollapse = document.querySelector('.navbar-collapse');

if (navbarToggler) {
    document.addEventListener('click', function(e) {
        // Close navbar when clicking outside
        if (navbarCollapse && navbarCollapse.classList.contains('show') && 
            !navbarCollapse.contains(e.target) && 
            !navbarToggler.contains(e.target)) {
            navbarToggler.click();
        }
    });
}

/*
======================
    Parallax Effect
======================
*/
function parallaxEffect() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    parallaxElements.forEach(element => {
        const scrollPosition = window.pageYOffset;
        const elementPosition = element.offsetTop;
        const distance = scrollPosition - elementPosition;
        const speed = element.getAttribute('data-speed') || 0.5;
        
        element.style.transform = `translateY(${distance * speed}px)`;
    });
}

window.addEventListener('scroll', function() {
    parallaxEffect();
}); 
/**
 * Syed Sadaf Almas - Premium Portfolio Script
 * Pure Vanilla JavaScript for high performance, smooth animation reveals,
 * and high-fidelity user interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Navigation Highlighting with IntersectionObserver
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');
    
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeId = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${activeId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // 2. Mobile Navigation Toggle Drawer
    const mobileMenuBtn = document.querySelector('.mobile-menu-toggle');
    const navLinksContainer = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            const isExpanded = navLinksContainer.style.display === 'flex';
            if (isExpanded) {
                navLinksContainer.style.display = 'none';
            } else {
                navLinksContainer.style.display = 'flex';
                navLinksContainer.style.flexDirection = 'column';
                navLinksContainer.style.position = 'absolute';
                navLinksContainer.style.top = '80px';
                navLinksContainer.style.left = '0';
                navLinksContainer.style.width = '100%';
                navLinksContainer.style.backgroundColor = '#FAF7F2';
                navLinksContainer.style.borderBottom = '1px solid rgba(18, 18, 18, 0.08)';
                navLinksContainer.style.padding = '2rem';
                navLinksContainer.style.gap = '1.5rem';
                navLinksContainer.style.zIndex = '99';
            }
        });
    }

    // Close mobile menu when links are clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 900) {
                navLinksContainer.style.display = 'none';
            }
        });
    });

    // 3. Custom Selection Box Corners Interactive Animation
    const selectionBox = document.querySelector('.selection-box');
    const handles = document.querySelectorAll('.selection-box .handle');
    
    if (selectionBox) {
        selectionBox.addEventListener('mouseenter', () => {
            handles.forEach((handle, idx) => {
                // Stagger handle expansion slightly
                setTimeout(() => {
                    handle.style.backgroundColor = '#121212';
                    handle.style.borderColor = '#E2B755';
                    handle.style.transform = 'scale(1.4) rotate(45deg)';
                }, idx * 60);
            });
        });
        
        selectionBox.addEventListener('mouseleave', () => {
            handles.forEach((handle) => {
                handle.style.backgroundColor = '#E2B755';
                handle.style.borderColor = '#121212';
                handle.style.transform = 'scale(1) rotate(0deg)';
            });
        });
    }

    // 4. Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 5. Dynamic Portfolio Project Categorization Filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state of buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const category = btn.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (category === 'all' || cardCategory === category) {
                    card.style.display = 'flex';
                    // Fade in transition
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    // Delay display: none to match transition duration
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // 6. Interactive Contact Form with Validation & Feedback Actions
    const contactForm = document.getElementById('portfolioContactForm');
    const formStatus = document.getElementById('formStatus');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            
            // Simple validation
            if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
                showFormStatus('Please complete all form fields.', 'error');
                return;
            }
            
            if (!validateEmail(emailInput.value)) {
                showFormStatus('Please provide a valid email address.', 'error');
                return;
            }
            
            // Simulate API Send Request
            showFormStatus('Transmitting secure message...', 'loading');
            
            setTimeout(() => {
                showFormStatus('Message received! Thank you, Syed Sadaf Almas will connect with you soon.', 'success');
                contactForm.reset();
                
                // Clear success message after 5 seconds
                setTimeout(() => {
                    formStatus.style.display = 'none';
                    formStatus.className = 'form-status';
                }, 5000);
            }, 1500);
        });
    }
    
    function showFormStatus(msg, type) {
        if (!formStatus) return;
        formStatus.textContent = msg;
        formStatus.className = 'form-status'; // Reset classes
        
        if (type === 'success') {
            formStatus.classList.add('success');
            formStatus.style.color = '#4CAF50';
        } else if (type === 'error') {
            formStatus.classList.add('error');
            formStatus.style.color = '#F44336';
        } else {
            formStatus.style.display = 'block';
            formStatus.style.color = '#E2B755';
        }
    }
    
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    // 7. Micro-interactions: Magnetic Pulsing Effects on Pill Buttons
    const pills = document.querySelectorAll('.btn-pill');
    pills.forEach(pill => {
        pill.addEventListener('mousemove', (e) => {
            const rect = pill.getBoundingClientRect();
            const x = e.clientX - rect.left - (rect.width / 2);
            const y = e.clientY - rect.top - (rect.height / 2);
            // Translate the button slightly towards the cursor (magnetic pull)
            pill.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px) translateY(-2px)`;
        });
        
        pill.addEventListener('mouseleave', () => {
            pill.style.transform = 'translate(0px, 0px)';
        });
    });
});

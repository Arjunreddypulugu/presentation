// Timeclock Application Presentation JavaScript

class TimeclockPresentation {
    constructor() {
        this.init();
    }

    init() {
        this.setupSmoothScrolling();
        this.setupScrollAnimations();
        this.setupCounterAnimations();
        this.setupWorkflowInteractions();
        this.setupNavigationHighlight();
        this.setupScrollToTop();
        
        // Initialize animations when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            this.startAnimations();
        });
    }

    // Smooth scrolling for navigation links
    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    const offset = 80; // Account for fixed navbar
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Scroll-triggered animations
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    
                    // Special handling for different animation types
                    if (entry.target.classList.contains('challenge-card')) {
                        this.animateCards('.challenge-card');
                    } else if (entry.target.classList.contains('solution-card')) {
                        this.animateCards('.solution-card');
                    } else if (entry.target.classList.contains('result-card')) {
                        this.animateCards('.result-card');
                    }
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animateElements = document.querySelectorAll(
            '.challenge-card, .solution-card, .workflow-step, .result-card, .feature-item'
        );
        
        animateElements.forEach(el => {
            el.classList.add('animate-on-scroll');
            observer.observe(el);
        });
    }

    // Animate cards with staggered timing
    animateCards(selector) {
        const cards = document.querySelectorAll(selector);
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
                card.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
            }, index * 150);
        });
    }

    // Animated counters for hero statistics
    setupCounterAnimations() {
        const counters = document.querySelectorAll('.stat-number[data-target]');
        
        const animateCounter = (counter) => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const startTime = performance.now();
            
            const updateCounter = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Easing function for smooth animation
                const easeOut = 1 - Math.pow(1 - progress, 3);
                const current = Math.floor(target * easeOut);
                
                counter.textContent = current;
                
                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            requestAnimationFrame(updateCounter);
        };

        // Observe hero section for counter animation trigger
        const heroObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    counters.forEach(counter => {
                        if (!counter.classList.contains('animated')) {
                            counter.classList.add('animated');
                            animateCounter(counter);
                        }
                    });
                }
            });
        }, { threshold: 0.5 });

        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            heroObserver.observe(heroSection);
        }
    }

    // Interactive workflow steps
    setupWorkflowInteractions() {
        const workflowSteps = document.querySelectorAll('.workflow-step');
        let currentStep = 0;
        
        // Auto-advance workflow steps
        const autoAdvance = () => {
            workflowSteps.forEach(step => step.classList.remove('active'));
            workflowSteps[currentStep].classList.add('active');
            currentStep = (currentStep + 1) % workflowSteps.length;
        };

        // Click interaction for workflow steps
        workflowSteps.forEach((step, index) => {
            step.addEventListener('click', () => {
                workflowSteps.forEach(s => s.classList.remove('active'));
                step.classList.add('active');
                currentStep = index;
            });
        });

        // Start auto-advance when workflow section is visible
        const workflowObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Initial activation
                    setTimeout(() => autoAdvance(), 500);
                    
                    // Set up interval for auto-advance
                    const interval = setInterval(autoAdvance, 3000);
                    
                    // Store interval ID to clear it later
                    entry.target.workflowInterval = interval;
                } else {
                    // Clear interval when not visible
                    if (entry.target.workflowInterval) {
                        clearInterval(entry.target.workflowInterval);
                    }
                }
            });
        }, { threshold: 0.3 });

        const workflowSection = document.querySelector('.workflow-section');
        if (workflowSection) {
            workflowObserver.observe(workflowSection);
        }
    }

    // Navigation highlight based on scroll position
    setupNavigationHighlight() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        const highlightNavigation = () => {
            const scrollPosition = window.scrollY + 100;

            sections.forEach(section => {
                const sectionTop = section.getBoundingClientRect().top + window.pageYOffset;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');

                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        };

        window.addEventListener('scroll', highlightNavigation);
        
        // Initial highlight
        highlightNavigation();
    }

    // Navbar background on scroll
    setupScrollToTop() {
        const navbar = document.querySelector('.navbar');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(27, 54, 93, 0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = 'none';
            }
        });
    }

    // Start initial animations
    startAnimations() {
        // Animate hero content
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.opacity = '0';
            heroContent.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                heroContent.style.transition = 'all 1s cubic-bezier(0.16, 1, 0.3, 1)';
                heroContent.style.opacity = '1';
                heroContent.style.transform = 'translateY(0)';
            }, 300);
        }

        // Animate navigation
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            navbar.style.transform = 'translateY(-100%)';
            setTimeout(() => {
                navbar.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
                navbar.style.transform = 'translateY(0)';
            }, 100);
        }

        // Stagger animation of tech badges
        const techBadges = document.querySelectorAll('.tech-badge');
        techBadges.forEach((badge, index) => {
            badge.style.opacity = '0';
            badge.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                badge.style.transition = 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
                badge.style.opacity = '1';
                badge.style.transform = 'translateY(0)';
            }, 1000 + (index * 100));
        });
    }

    // Utility method for element visibility check
    isElementInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Enhanced hover effects for cards
    setupCardInteractions() {
        const cards = document.querySelectorAll('.challenge-card, .solution-card, .result-card, .feature-item');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                e.target.style.transform = 'translateY(-8px) scale(1.02)';
                e.target.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
            });
            
            card.addEventListener('mouseleave', (e) => {
                e.target.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    // Mobile menu toggle (if needed for mobile)
    setupMobileMenu() {
        // This would be implemented if we had a mobile hamburger menu
        // For now, the navigation is hidden on mobile as per the CSS
    }

    // Parallax effect for sections (subtle)
    setupParallaxEffects() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.hero-section');
            
            parallaxElements.forEach(element => {
                const speed = 0.5;
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }

    // Performance optimization: Throttle scroll events
    throttle(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// Enhanced scroll animations with more sophisticated timing
class ScrollAnimationManager {
    constructor() {
        this.animations = new Map();
        this.setupAnimations();
    }

    setupAnimations() {
        // Define animation sequences for different sections
        this.animations.set('challenge-section', {
            elements: '.challenge-card',
            animation: 'slideUp',
            stagger: 200,
            delay: 0
        });

        this.animations.set('solution-section', {
            elements: '.solution-card',
            animation: 'slideUp',
            stagger: 150,
            delay: 0
        });

        this.animations.set('results-section', {
            elements: '.result-card',
            animation: 'slideUp',
            stagger: 100,
            delay: 0
        });

        // Setup intersection observers for each section
        this.animations.forEach((config, sectionClass) => {
            this.observeSection(sectionClass, config);
        });
    }

    observeSection(sectionClass, config) {
        const section = document.querySelector(`.${sectionClass}`);
        if (!section) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.triggerAnimation(entry.target, config);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
        });

        observer.observe(section);
    }

    triggerAnimation(section, config) {
        const elements = section.querySelectorAll(config.elements);
        
        elements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('animate-in');
                
                // Apply specific animation based on type
                switch (config.animation) {
                    case 'slideUp':
                        this.slideUpAnimation(element);
                        break;
                    case 'fadeIn':
                        this.fadeInAnimation(element);
                        break;
                    default:
                        this.slideUpAnimation(element);
                }
            }, config.delay + (index * config.stagger));
        });
    }

    slideUpAnimation(element) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
        element.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
    }

    fadeInAnimation(element) {
        element.style.opacity = '1';
        element.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
    }
}

// Initialize the application
const timeclockApp = new TimeclockPresentation();
const scrollAnimations = new ScrollAnimationManager();

// Additional utility functions
document.addEventListener('DOMContentLoaded', function() {
    // Add loading state removal
    document.body.classList.add('loaded');
    
    // Initialize card interactions
    timeclockApp.setupCardInteractions();
    
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            const sections = Array.from(document.querySelectorAll('section[id]'));
            const current = sections.find(section => {
                const rect = section.getBoundingClientRect();
                return rect.top <= 100 && rect.bottom >= 100;
            });
            
            if (current) {
                const currentIndex = sections.indexOf(current);
                let nextIndex;
                
                if (e.key === 'ArrowDown' && currentIndex < sections.length - 1) {
                    nextIndex = currentIndex + 1;
                } else if (e.key === 'ArrowUp' && currentIndex > 0) {
                    nextIndex = currentIndex - 1;
                }
                
                if (nextIndex !== undefined) {
                    sections[nextIndex].scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        }
    });
    
    // Add print styles optimization
    window.addEventListener('beforeprint', function() {
        document.body.classList.add('printing');
    });
    
    window.addEventListener('afterprint', function() {
        document.body.classList.remove('printing');
    });
});

// Performance monitoring
const performanceObserver = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
        if (entry.entryType === 'paint' && entry.name === 'first-contentful-paint') {
            console.log('First Contentful Paint:', entry.startTime);
        }
    });
});

if ('PerformanceObserver' in window) {
    performanceObserver.observe({ entryTypes: ['paint'] });
}

// Export for potential testing or external access
window.TimeclockApp = {
    presentation: timeclockApp,
    animations: scrollAnimations
};

document.addEventListener('DOMContentLoaded', () => {
    // Animation for statistic counters
    const counters = document.querySelectorAll('.stat-number');
    const animateCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        const duration = 2000;
        const start = 0;
        let startTime = null;

        const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const current = Math.floor(progress * (target - start) + start);
            counter.textContent = current;

            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                // Check if the element is one of the ones to get a plus
                if (counter.getAttribute('data-target') === '100' || counter.getAttribute('data-target') === '450') {
                    counter.textContent = target + '+';
                } else {
                    counter.textContent = target;
                }
            }
        };

        window.requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    counters.forEach(counter => {
        observer.observe(counter);
    });
});
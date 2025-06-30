// ScrollAnimationManager Class - ES6 Class for managing scroll animations
class ScrollAnimationManager {
    constructor() {
        this.observers = new Map();
        this.isInitialized = false;
        this.performanceMetrics = {
            animationCount: 0,
            scrollEvents: 0,
            startTime: performance.now()
        };
        
        this.init();
    }

    init() {
        if (this.isInitialized) return;
        
        this.setupIntersectionObserver();
        this.setupSmoothScrolling();
        this.setupAnimatedCounters();
        this.setupPerformanceMonitoring();
        this.setupScrollIndicator();
        
        this.isInitialized = true;
        console.log('ScrollAnimationManager initialized successfully');
    }

    // IntersectionObserver API for performance-optimized scroll triggers
    setupIntersectionObserver() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    this.performanceMetrics.animationCount++;
                    
                    // Trigger special animations for specific sections
                    this.handleSectionSpecificAnimations(entry.target);
                }
            });
        }, options);

        // Observe all fade-in elements
        const fadeElements = document.querySelectorAll('.fade-in');
        fadeElements.forEach(element => {
            observer.observe(element);
        });

        this.observers.set('fadeIn', observer);
    }

    // Handle section-specific animations
    handleSectionSpecificAnimations(element) {
        const section = element.closest('section');
        if (!section) return;

        const sectionId = section.id;
        
        switch (sectionId) {
            case 'hero':
                this.startCounterAnimations();
                break;
            case 'implementation':
                this.animateTimeline();
                break;
            case 'tech-stack':
                this.animateTechCards();
                break;
            case 'outcomes':
                this.animateOutcomeMetrics();
                break;
        }
    }

    // Animated counters using requestAnimationFrame
    setupAnimatedCounters() {
        this.counterElements = document.querySelectorAll('.metric-number[data-target]');
    }

    startCounterAnimations() {
        if (this.countersAnimated) return;
        this.countersAnimated = true;

        this.counterElements.forEach(element => {
            const target = parseInt(element.dataset.target);
            const duration = 2000; // 2 seconds
            const startTime = performance.now();
            const startValue = 0;

            const animateCounter = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Easing function for smooth animation
                const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                const currentValue = Math.floor(startValue + (target - startValue) * easeOutQuart);
                
                element.textContent = currentValue.toLocaleString();
                
                if (progress < 1) {
                    requestAnimationFrame(animateCounter);
                }
            };

            requestAnimationFrame(animateCounter);
        });
    }

    // Timeline animation with staggered reveals
    animateTimeline() {
        if (this.timelineAnimated) return;
        this.timelineAnimated = true;

        const timelineItems = document.querySelectorAll('.timeline-item');
        
        timelineItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.transform = 'translateX(0)';
                item.style.opacity = '1';
                
                // Add pulse effect to timeline marker
                const marker = item.querySelector('.timeline-marker');
                if (marker) {
                    marker.style.animation = 'pulse 0.6s ease-out';
                }
            }, index * 200);
        });
    }

    // Tech cards flip animation
    animateTechCards() {
        if (this.techCardsAnimated) return;
        this.techCardsAnimated = true;

        const techCards = document.querySelectorAll('.tech-card');
        
        techCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.transform = 'rotateY(0deg)';
                card.style.opacity = '1';
            }, index * 100);
        });
    }

    // Outcome metrics with bounce effect
    animateOutcomeMetrics() {
        if (this.outcomesAnimated) return;
        this.outcomesAnimated = true;

        const outcomeCards = document.querySelectorAll('.outcome-card');
        
        outcomeCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.animation = 'bounceIn 0.8s ease-out forwards';
            }, index * 150);
        });
    }

    // Smooth scrolling implementation
    setupSmoothScrolling() {
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset - 80;
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    this.performanceMetrics.scrollEvents++;
                }
            });
        });
    }

    // Scroll indicator animation
    setupScrollIndicator() {
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (!scrollIndicator) return;

        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            
            if (scrollY > windowHeight * 0.1) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.transform = 'translateX(-50%) translateY(20px)';
            } else {
                scrollIndicator.style.opacity = '1';
                scrollIndicator.style.transform = 'translateX(-50%) translateY(0)';
            }
        });
    }

    // Performance monitoring with PerformanceObserver API
    setupPerformanceMonitoring() {
        if ('PerformanceObserver' in window) {
            const perfObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    if (entry.entryType === 'measure') {
                        console.log(`Performance measure: ${entry.name} took ${entry.duration}ms`);
                    }
                });
            });

            try {
                perfObserver.observe({ entryTypes: ['measure', 'navigation'] });
            } catch (e) {
                console.log('PerformanceObserver not fully supported:', e);
            }
        }

        // Custom performance tracking
        setInterval(() => {
            const currentTime = performance.now();
            const runtime = currentTime - this.performanceMetrics.startTime;
            
            if (runtime > 5000) { // Log every 5 seconds
                console.log('Performance Metrics:', {
                    runtime: `${(runtime / 1000).toFixed(2)}s`,
                    animationsTriggered: this.performanceMetrics.animationCount,
                    scrollEvents: this.performanceMetrics.scrollEvents
                });
                
                this.performanceMetrics.startTime = currentTime;
                this.performanceMetrics.animationCount = 0;
                this.performanceMetrics.scrollEvents = 0;
            }
        }, 5000);
    }

    // Utility method to add custom animations
    addCustomAnimation(selector, animationClass, delay = 0) {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add(animationClass);
            }, delay + (index * 100));
        });
    }

    // Clean up observers
    destroy() {
        this.observers.forEach(observer => {
            observer.disconnect();
        });
        this.observers.clear();
        this.isInitialized = false;
    }
}

// Enhanced Navigation with Active State Management
class NavigationManager {
    constructor() {
        this.sections = [];
        this.navLinks = [];
        this.currentSection = '';
        this.init();
    }

    init() {
        this.sections = Array.from(document.querySelectorAll('section[id]'));
        this.navLinks = Array.from(document.querySelectorAll('.nav-link[href^="#"]'));
        
        this.setupScrollSpy();
        this.setupNavbarBackground();
    }

    setupScrollSpy() {
        const options = {
            threshold: 0.3,
            rootMargin: '-80px 0px -50% 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.updateActiveNavLink(entry.target.id);
                }
            });
        }, options);

        this.sections.forEach(section => {
            observer.observe(section);
        });
    }

    updateActiveNavLink(sectionId) {
        if (this.currentSection === sectionId) return;
        
        this.currentSection = sectionId;
        
        this.navLinks.forEach(link => {
            const href = link.getAttribute('href').substring(1);
            if (href === sectionId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    setupNavbarBackground() {
        const nav = document.querySelector('.nav');
        let lastScrollY = window.scrollY;

        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            // Add/remove background based on scroll position
            if (currentScrollY > 100) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }

            // Hide/show navbar on scroll direction
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                nav.style.transform = 'translateY(-100%)';
            } else {
                nav.style.transform = 'translateY(0)';
            }
            
            lastScrollY = currentScrollY;
        });
    }
}

// Interactive Elements Manager
class InteractiveManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupHoverEffects();
        this.setupClickEffects();
        this.setupParallaxEffects();
    }

    setupHoverEffects() {
        // Enhanced card hover effects
        const cards = document.querySelectorAll('.tech-card, .outcome-card, .pain-point, .pillar');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                e.target.style.transform = 'translateY(-10px) scale(1.02)';
                e.target.style.boxShadow = '0 20px 40px rgba(230, 126, 34, 0.3)';
            });
            
            card.addEventListener('mouseleave', (e) => {
                e.target.style.transform = 'translateY(0) scale(1)';
                e.target.style.boxShadow = '';
            });
        });
    }

    setupClickEffects() {
        // Ripple effect for interactive elements
        const interactiveElements = document.querySelectorAll('.btn, .nav-link, .tech-card');
        
        interactiveElements.forEach(element => {
            element.addEventListener('click', (e) => {
                const ripple = document.createElement('span');
                const rect = e.target.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(230, 126, 34, 0.3);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s ease-out;
                    pointer-events: none;
                `;
                
                e.target.style.position = 'relative';
                e.target.style.overflow = 'hidden';
                e.target.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }

    setupParallaxEffects() {
        const parallaxElements = document.querySelectorAll('.hero');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const rate = scrolled * -0.5;
                element.style.transform = `translateY(${rate}px)`;
            });
        });
    }
}

// Main Application Class
class DataPipelinePresentation {
    constructor() {
        this.components = {
            scrollManager: null,
            navigationManager: null,
            interactiveManager: null
        };
        
        this.init();
    }

    init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeComponents());
        } else {
            this.initializeComponents();
        }
    }

    initializeComponents() {
        try {
            // Initialize all components
            this.components.scrollManager = new ScrollAnimationManager();
            this.components.navigationManager = new NavigationManager();
            this.components.interactiveManager = new InteractiveManager();
            
            // Add custom CSS animations
            this.addCustomStyles();
            
            // Setup error handling
            this.setupErrorHandling();
            
            console.log('Data Pipeline Presentation initialized successfully');
            
        } catch (error) {
            console.error('Failed to initialize application:', error);
        }
    }

    addCustomStyles() {
        const customStyles = `
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.1); }
                100% { transform: scale(1); }
            }
            
            @keyframes bounceIn {
                0% { transform: scale(0.3); opacity: 0; }
                50% { transform: scale(1.1); opacity: 0.8; }
                70% { transform: scale(0.9); opacity: 0.9; }
                100% { transform: scale(1); opacity: 1; }
            }
            
            @keyframes ripple {
                to { transform: scale(4); opacity: 0; }
            }
            
            .nav.scrolled {
                background: rgba(26, 35, 50, 0.98);
                backdrop-filter: blur(20px);
            }
            
            .nav-link.active {
                color: #e67e22;
            }
            
            .nav-link.active::after {
                width: 100%;
            }
        `;
        
        const styleSheet = document.createElement('style');
        styleSheet.textContent = customStyles;
        document.head.appendChild(styleSheet);
    }

    setupErrorHandling() {
        window.addEventListener('error', (event) => {
            console.error('Application error:', event.error);
        });
        
        window.addEventListener('unhandledrejection', (event) => {
            console.error('Unhandled promise rejection:', event.reason);
        });
    }

    // Public API methods
    triggerAnimation(selector, animationClass) {
        this.components.scrollManager?.addCustomAnimation(selector, animationClass);
    }

    getPerformanceMetrics() {
        return this.components.scrollManager?.performanceMetrics || {};
    }

    destroy() {
        Object.values(this.components).forEach(component => {
            if (component && typeof component.destroy === 'function') {
                component.destroy();
            }
        });
    }
}

// Initialize the application
const app = new DataPipelinePresentation();

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { DataPipelinePresentation, ScrollAnimationManager };
}

// Add to window for debugging
window.DataPipelineApp = app;
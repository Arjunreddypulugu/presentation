/**
 * Thank You Page Application
 * Modern ES6+ JavaScript with advanced Web APIs
 */

class ScrollAnimationManager {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        this.intersectionObserver = null;
        this.performanceObserver = null;
        this.animatedElements = new Set();
        
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.setupPerformanceMonitoring();
        this.setupSmoothScrolling();
        this.bindEvents();
        
        // Initialize page load animations
        requestAnimationFrame(() => {
            this.initializePageAnimations();
        });
    }

    setupIntersectionObserver() {
        if (!('IntersectionObserver' in window)) {
            // Fallback for browsers without IntersectionObserver
            this.fallbackAnimation();
            return;
        }

        this.intersectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => this.handleIntersection(entry));
        }, this.observerOptions);

        // Observe all fade-in sections
        const fadeElements = document.querySelectorAll('.fade-in-section');
        fadeElements.forEach(element => {
            this.intersectionObserver.observe(element);
        });
    }

    handleIntersection = (entry) => {
        const { target, isIntersecting } = entry;
        
        if (isIntersecting && !this.animatedElements.has(target)) {
            this.animateElement(target);
            this.animatedElements.add(target);
        }
    }

    animateElement(element) {
        // Use requestAnimationFrame for smooth animations
        requestAnimationFrame(() => {
            element.classList.add('visible');
            
            // Add staggered animation for child elements if they exist
            const childElements = element.querySelectorAll('.stat-item');
            if (childElements.length) {
                this.staggerChildAnimations(childElements);
            }
        });
    }

    staggerChildAnimations(elements) {
        elements.forEach((element, index) => {
            setTimeout(() => {
                requestAnimationFrame(() => {
                    element.style.opacity = '0';
                    element.style.transform = 'translateY(20px)';
                    element.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
                    
                    setTimeout(() => {
                        element.style.opacity = '1';
                        element.style.transform = 'translateY(0)';
                    }, 50);
                });
            }, index * 150);
        });
    }

    setupPerformanceMonitoring() {
        if (!('PerformanceObserver' in window)) return;

        try {
            this.performanceObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    if (entry.entryType === 'measure') {
                        console.log(`Performance: ${entry.name} took ${entry.duration}ms`);
                    }
                });
            });
            
            this.performanceObserver.observe({ entryTypes: ['measure'] });
        } catch (error) {
            console.log('Performance monitoring not available');
        }
    }

    setupSmoothScrolling() {
        // Enhanced smooth scrolling for any internal links
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href^="#"]');
            if (!link) return;
            
            e.preventDefault();
            const targetId = link.getAttribute('href').slice(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                this.smoothScrollToElement(targetElement);
            }
        });
    }

    smoothScrollToElement(element) {
        const elementRect = element.getBoundingClientRect();
        const absoluteElementTop = elementRect.top + window.pageYOffset;
        const middle = absoluteElementTop - (window.innerHeight / 2);
        
        window.scrollTo({
            top: middle,
            behavior: 'smooth'
        });
    }

    bindEvents() {
        // Optimize scroll performance with throttling
        let ticking = false;
        
        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.updateScrollEffects();
                    ticking = false;
                });
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', this.handleResize.bind(this), { passive: true });
    }

    updateScrollEffects() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // Parallax effect for hero section
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
        
        // Update scroll indicator opacity
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            const opacity = Math.max(0, 1 - (scrolled / window.innerHeight));
            scrollIndicator.style.opacity = opacity;
        }
    }

    handleResize = () => {
        // Debounce resize events
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = setTimeout(() => {
            this.recalculateAnimations();
        }, 250);
    }

    recalculateAnimations() {
        // Reset and recalculate animations on resize
        this.animatedElements.clear();
        
        const fadeElements = document.querySelectorAll('.fade-in-section');
        fadeElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                this.animateElement(element);
            }
        });
    }

    fallbackAnimation() {
        // Fallback for browsers without IntersectionObserver
        const fadeElements = document.querySelectorAll('.fade-in-section');
        fadeElements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('visible');
            }, index * 200);
        });
    }

    initializePageAnimations() {
        // Performance mark for page load
        if ('performance' in window && 'mark' in performance) {
            performance.mark('page-animations-start');
        }
        
        // Initialize any immediate animations
        this.setupImageLoadingEffects();
        this.setupHoverEffects();
        
        if ('performance' in window && 'measure' in performance) {
            performance.measure('page-animations-duration', 'page-animations-start');
        }
    }

    setupImageLoadingEffects() {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            if (img.complete) {
                this.onImageLoad(img);
            } else {
                img.addEventListener('load', () => this.onImageLoad(img));
                img.addEventListener('error', () => this.onImageError(img));
            }
        });
    }

    onImageLoad = (img) => {
        requestAnimationFrame(() => {
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.6s ease-out';
            
            setTimeout(() => {
                img.style.opacity = '1';
            }, 100);
        });
    }

    onImageError = (img) => {
        console.warn(`Failed to load image: ${img.src}`);
        img.style.opacity = '0.5';
    }

    setupHoverEffects() {
        // Enhanced hover effects for interactive elements
        const interactiveElements = document.querySelectorAll('.glass-card, .stat-item, .hero__company-name');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', this.onElementHover);
            element.addEventListener('mouseleave', this.onElementLeave);
        });
    }

    onElementHover = (e) => {
        const { target } = e;
        requestAnimationFrame(() => {
            target.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
        });
    }

    onElementLeave = (e) => {
        const { target } = e;
        requestAnimationFrame(() => {
            target.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
        });
    }

    // Public method to destroy observers (for cleanup)
    destroy() {
        if (this.intersectionObserver) {
            this.intersectionObserver.disconnect();
        }
        
        if (this.performanceObserver) {
            this.performanceObserver.disconnect();
        }
        
        clearTimeout(this.resizeTimeout);
    }
}

class ThankYouPageApp {
    constructor() {
        this.scrollManager = null;
        this.isInitialized = false;
        
        this.init();
    }

    init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeApp());
        } else {
            this.initializeApp();
        }
    }

    initializeApp() {
        try {
            // Initialize scroll animation manager
            this.scrollManager = new ScrollAnimationManager();
            
            // Setup additional page features
            this.setupAccessibilityFeatures();
            this.setupPreferenceDetection();
            
            this.isInitialized = true;
            console.log('Thank You Page Application initialized successfully');
            
        } catch (error) {
            console.error('Failed to initialize application:', error);
            this.fallbackInitialization();
        }
    }

    setupAccessibilityFeatures() {
        // Respect user's motion preferences
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        if (prefersReducedMotion.matches) {
            document.body.classList.add('reduced-motion');
        }
        
        // Listen for changes in motion preference
        prefersReducedMotion.addEventListener('change', (e) => {
            if (e.matches) {
                document.body.classList.add('reduced-motion');
            } else {
                document.body.classList.remove('reduced-motion');
            }
        });
    }

    setupPreferenceDetection() {
        // Detect color scheme preference
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        
        const updateColorScheme = (e) => {
            if (e.matches) {
                document.documentElement.setAttribute('data-color-scheme', 'dark');
            } else {
                document.documentElement.setAttribute('data-color-scheme', 'light');
            }
        };
        
        updateColorScheme(prefersDarkScheme);
        prefersDarkScheme.addEventListener('change', updateColorScheme);
    }

    fallbackInitialization() {
        // Simple fallback initialization
        console.log('Using fallback initialization');
        
        const fadeElements = document.querySelectorAll('.fade-in-section');
        fadeElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 300);
        });
    }

    // Public method for cleanup
    destroy() {
        if (this.scrollManager) {
            this.scrollManager.destroy();
        }
        
        this.isInitialized = false;
    }
}

// Utility functions using modern JavaScript features
const utils = {
    // Throttle function using closure and modern syntax
    throttle: (func, delay) => {
        let timeoutId;
        let lastExecTime = 0;
        
        return (...args) => {
            const currentTime = Date.now();
            
            if (currentTime - lastExecTime > delay) {
                func.apply(this, args);
                lastExecTime = currentTime;
            } else {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    func.apply(this, args);
                    lastExecTime = Date.now();
                }, delay - (currentTime - lastExecTime));
            }
        };
    },

    // Debounce function with modern syntax
    debounce: (func, delay) => {
        let timeoutId;
        
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    },

    // Modern feature detection
    hasSupport: {
        intersectionObserver: 'IntersectionObserver' in window,
        performanceObserver: 'PerformanceObserver' in window,
        requestAnimationFrame: 'requestAnimationFrame' in window,
        smoothScrolling: 'scrollBehavior' in document.documentElement.style
    }
};

// Initialize the application
const app = new ThankYouPageApp();

// Export for potential testing or external access
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ThankYouPageApp, ScrollAnimationManager, utils };
}

// Global error handling
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
});
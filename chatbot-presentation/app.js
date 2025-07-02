// Main Application Class
class ChatbotPresentation {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupSmoothScrolling();
        this.setupCounterAnimations();
        this.setupInteractiveElements();
        this.setupPerformanceMonitoring();
        this.setupProgressiveEnhancements();
    }

    setupScrollAnimations() {
        this.scrollAnimationManager = new ScrollAnimationManager();
    }

    setupSmoothScrolling() {
        this.smoothScrollManager = new SmoothScrollManager();
    }

    setupCounterAnimations() {
        this.counterManager = new CounterAnimationManager();
    }

    setupInteractiveElements() {
        this.interactionManager = new InteractionManager();
    }

    setupPerformanceMonitoring() {
        if ('PerformanceObserver' in window) {
            this.performanceMonitor = new PerformanceMonitor();
        }
    }

    setupProgressiveEnhancements() {
        this.enhancementManager = new ProgressiveEnhancementManager();
    }
}

// Scroll Animation Manager
class ScrollAnimationManager {
    constructor() {
        this.animatedElements = document.querySelectorAll('[data-animate]');
        this.observer = null;
        this.init();
    }

    init() {
        if ('IntersectionObserver' in window) {
            this.setupIntersectionObserver();
        } else {
            // Fallback for browsers without IntersectionObserver
            this.animateAllElements();
        }
    }

    setupIntersectionObserver() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                    this.observer.unobserve(entry.target);
                }
            });
        }, options);

        this.animatedElements.forEach(element => {
            this.observer.observe(element);
        });
    }

    animateElement(element) {
        element.classList.add('animate');
        
        // Add staggered animation for child elements
        const children = element.querySelectorAll('.driver-item, .metric, .timeline-content');
        children.forEach((child, index) => {
            setTimeout(() => {
                child.style.animationDelay = `${index * 0.1}s`;
                child.classList.add('animate');
            }, index * 100);
        });
    }

    animateAllElements() {
        // Fallback animation for older browsers
        this.animatedElements.forEach((element, index) => {
            setTimeout(() => {
                this.animateElement(element);
            }, index * 200);
        });
    }
}

// Smooth Scroll Manager
class SmoothScrollManager {
    constructor() {
        this.navLinks = document.querySelectorAll('.nav-link');
        this.heroActions = document.querySelectorAll('.hero-actions a');
        this.init();
    }

    init() {
        [...this.navLinks, ...this.heroActions].forEach(link => {
            link.addEventListener('click', this.handleSmoothScroll.bind(this));
        });
    }

    handleSmoothScroll(e) {
        const href = e.target.getAttribute('href');
        
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                
                if ('scrollBehavior' in document.documentElement.style) {
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                } else {
                    // Fallback smooth scroll for older browsers
                    this.smoothScrollPolyfill(offsetTop);
                }
            }
        }
    }

    smoothScrollPolyfill(targetY) {
        const startY = window.pageYOffset;
        const distance = targetY - startY;
        const duration = 800;
        let startTime = null;

        const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const ease = this.easeInOutCubic(progress);
            
            window.scrollTo(0, startY + (distance * ease));
            
            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };

        requestAnimationFrame(step);
    }

    easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }
}

// Counter Animation Manager
class CounterAnimationManager {
    constructor() {
        this.counters = document.querySelectorAll('[data-target]');
        this.hasAnimated = new Set();
        this.init();
    }

    init() {
        if ('IntersectionObserver' in window) {
            this.setupCounterObserver();
        }
    }

    setupCounterObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.hasAnimated.has(entry.target)) {
                    this.animateCounter(entry.target);
                    this.hasAnimated.add(entry.target);
                }
            });
        }, { threshold: 0.5 });

        this.counters.forEach(counter => {
            observer.observe(counter);
        });
    }

    animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000;
        const startTime = performance.now();
        
        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const currentValue = Math.floor(target * this.easeOutQuart(progress));
            element.textContent = currentValue;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };
        
        requestAnimationFrame(updateCounter);
    }

    easeOutQuart(t) {
        return 1 - Math.pow(1 - t, 4);
    }
}

// Interaction Manager
class InteractionManager {
    constructor() {
        this.demoButtons = document.querySelectorAll('.demo-btn');
        this.projectCards = document.querySelectorAll('.project-card');
        this.impactCards = document.querySelectorAll('.impact-card');
        this.init();
    }

    init() {
        // this.setupDemoButtons();
        this.setupCardInteractions();
        this.setupNavbarScrollEffect();
        this.addNotificationStyles();
    }

    addNotificationStyles() {
        if (!document.getElementById('notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                .demo-notification {
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: var(--color-card-bg);
                    padding: 2rem;
                    border-radius: var(--radius-lg);
                    border: 1px solid var(--color-border);
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
                    z-index: 10000;
                    max-width: 450px;
                    text-align: center;
                    animation: notificationSlideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
                    backdrop-filter: blur(10px);
                }
                
                .demo-notification::before {
                    content: '';
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.7);
                    z-index: -1;
                    animation: fadeIn 0.3s ease-out;
                }
                
                .notification-content {
                    color: var(--color-text);
                }
                
                .notification-icon {
                    font-size: 3rem;
                    margin-bottom: 1rem;
                    animation: bounce 0.6s ease-out 0.2s;
                }
                
                .notification-content h4 {
                    color: var(--color-primary);
                    margin-bottom: 0.5rem;
                    font-size: var(--font-size-xl);
                }
                
                .notification-content p {
                    color: var(--color-text-secondary);
                    margin-bottom: 1.5rem;
                    line-height: 1.6;
                }
                
                .notification-actions {
                    display: flex;
                    gap: 1rem;
                    justify-content: center;
                }
                
                @keyframes notificationSlideIn {
                    from {
                        opacity: 0;
                        transform: translate(-50%, -60%) scale(0.8);
                    }
                    to {
                        opacity: 1;
                        transform: translate(-50%, -50%) scale(1);
                    }
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                @keyframes bounce {
                    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
                    40% { transform: translateY(-10px); }
                    60% { transform: translateY(-5px); }
                }
                
                .notification-close {
                    position: absolute;
                    top: 1rem;
                    right: 1rem;
                    background: none;
                    border: none;
                    color: var(--color-text-secondary);
                    font-size: 1.5rem;
                    cursor: pointer;
                    padding: 0.5rem;
                    border-radius: 50%;
                    transition: all 0.2s ease;
                }
                
                .notification-close:hover {
                    background: var(--color-secondary);
                    color: var(--color-text);
                }
            `;
            document.head.appendChild(style);
        }
    }

    setupCardInteractions() {
        [...this.projectCards, ...this.impactCards].forEach(card => {
            card.addEventListener('mouseenter', this.handleCardHover.bind(this));
            card.addEventListener('mouseleave', this.handleCardLeave.bind(this));
        });
    }

    handleCardHover(e) {
        const card = e.currentTarget;
        card.style.transform = 'translateY(-12px)';
        
        // Add glow effect
        card.style.boxShadow = 'var(--shadow-card-hover), 0 0 30px rgba(255, 107, 53, 0.1)';
    }

    handleCardLeave(e) {
        const card = e.currentTarget;
        card.style.transform = '';
        card.style.boxShadow = '';
    }

    setupNavbarScrollEffect() {
        let lastScrollY = window.scrollY;
        
        const handleScroll = () => {
            const navbar = document.querySelector('.navbar');
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 100) {
                navbar.style.background = 'rgba(26, 31, 46, 0.98)';
                navbar.style.backdropFilter = 'blur(20px)';
            } else {
                navbar.style.background = 'rgba(26, 31, 46, 0.95)';
                navbar.style.backdropFilter = 'blur(10px)';
            }
            
            // Hide/show navbar based on scroll direction
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScrollY = currentScrollY;
        };
        
        window.addEventListener('scroll', Utils.throttle(handleScroll, 16));
    }
}

// Performance Monitor
class PerformanceMonitor {
    constructor() {
        this.metrics = {
            loadTime: 0,
            renderTime: 0,
            interactionTime: 0
        };
        this.init();
    }

    init() {
        this.measureLoadTime();
        this.measureRenderTime();
        this.setupPerformanceObserver();
    }

    measureLoadTime() {
        window.addEventListener('load', () => {
            const navigation = performance.getEntriesByType('navigation')[0];
            if (navigation) {
                this.metrics.loadTime = navigation.loadEventEnd - navigation.loadEventStart;
                console.log(`Page load time: ${this.metrics.loadTime}ms`);
            }
        });
    }

    measureRenderTime() {
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    if (entry.entryType === 'paint') {
                        console.log(`${entry.name}: ${entry.startTime}ms`);
                    }
                });
            });
            
            try {
                observer.observe({ entryTypes: ['paint'] });
            } catch (e) {
                console.log('Paint timing not supported');
            }
        }
    }

    setupPerformanceObserver() {
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    if (entry.entryType === 'measure') {
                        console.log(`Custom metric ${entry.name}: ${entry.duration}ms`);
                    }
                });
            });
            
            try {
                observer.observe({ entryTypes: ['measure'] });
            } catch (e) {
                console.log('Measure timing not supported');
            }
        }
    }

    markInteractionStart(name) {
        if ('performance' in window && 'mark' in performance) {
            performance.mark(`${name}-start`);
        }
    }

    markInteractionEnd(name) {
        if ('performance' in window && 'mark' in performance && 'measure' in performance) {
            performance.mark(`${name}-end`);
            performance.measure(name, `${name}-start`, `${name}-end`);
        }
    }
}

// Progressive Enhancement Manager
class ProgressiveEnhancementManager {
    constructor() {
        this.features = {
            intersectionObserver: 'IntersectionObserver' in window,
            performanceObserver: 'PerformanceObserver' in window,
            smoothScroll: 'scrollBehavior' in document.documentElement.style,
            cssGrid: CSS.supports('display', 'grid'),
            customProperties: CSS.supports('--custom', 'property')
        };
        this.init();
    }

    init() {
        this.enhanceBasedOnSupport();
        this.addFeatureClasses();
    }

    enhanceBasedOnSupport() {
        // Add reduced motion support
        if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.documentElement.style.setProperty('--duration-fast', '0ms');
            document.documentElement.style.setProperty('--duration-normal', '0ms');
            
            // Disable animations for users who prefer reduced motion
            const style = document.createElement('style');
            style.textContent = `
                *, *::before, *::after {
                    animation-duration: 0.01ms !important;
                    animation-iteration-count: 1 !important;
                    transition-duration: 0.01ms !important;
                }
            `;
            document.head.appendChild(style);
        }

        // Enhance for high contrast mode
        if (window.matchMedia && window.matchMedia('(prefers-contrast: high)').matches) {
            document.documentElement.classList.add('high-contrast');
        }

        // Touch device enhancements
        if ('ontouchstart' in window) {
            document.documentElement.classList.add('touch-device');
            this.enhanceForTouch();
        }
    }

    enhanceForTouch() {
        // Increase touch targets
        const style = document.createElement('style');
        style.textContent = `
            .touch-device .btn {
                min-height: 44px;
                min-width: 44px;
            }
            .touch-device .nav-link {
                padding: 12px 16px;
            }
        `;
        document.head.appendChild(style);
    }

    addFeatureClasses() {
        Object.entries(this.features).forEach(([feature, supported]) => {
            if (supported) {
                document.documentElement.classList.add(`supports-${feature}`);
            } else {
                document.documentElement.classList.add(`no-${feature}`);
            }
        });
    }
}

// Utility Functions
const Utils = {
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    getElementPosition(element) {
        const rect = element.getBoundingClientRect();
        return {
            top: rect.top + window.scrollY,
            left: rect.left + window.scrollX,
            bottom: rect.bottom + window.scrollY,
            right: rect.right + window.scrollX
        };
    }
};

// Initialize application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const app = new ChatbotPresentation();
    
    // Add loading indicator removal
    const loader = document.querySelector('.loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.remove();
            }, 300);
        }, 1000);
    }
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        // Resume animations when page becomes visible
        document.querySelectorAll('[data-animate]').forEach(element => {
            if (element.classList.contains('animate')) {
                element.style.animationPlayState = 'running';
            }
        });
    } else {
        // Pause animations when page is hidden
        document.querySelectorAll('[data-animate]').forEach(element => {
            element.style.animationPlayState = 'paused';
        });
    }
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ChatbotPresentation,
        ScrollAnimationManager,
        SmoothScrollManager,
        CounterAnimationManager,
        InteractionManager,
        PerformanceMonitor,
        ProgressiveEnhancementManager,
        Utils
    };
}
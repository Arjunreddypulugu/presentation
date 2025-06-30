class InventorySystemPresentation {
    constructor() {
        this.scrollAnimationManager = new ScrollAnimationManager();
        this.counterAnimations = new Map();
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupNavigation();
        this.setupCounterAnimations();
        this.setupInteractiveElements();
        this.setupDemoInteractions();
        this.observePerformance();
    }

    setupScrollAnimations() {
        // Add animation classes to elements that should animate on scroll
        const animatedElements = [
            '.feature-card',
            '.problem-card',
            '.solution-feature',
            '.tech-item',
            '.outcome-card',
            '.demo-mockup'
        ];

        animatedElements.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach((element, index) => {
                element.classList.add('animate-on-scroll');
                if (index > 0) {
                    element.classList.add(`animate-delay-${Math.min(index, 4)}`);
                }
            });
        });

        this.scrollAnimationManager.observe();
    }

    setupNavigation() {
        // Smooth scroll for navigation links
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                this.scrollToSection(targetId);
            });
        });

        // Update active nav link on scroll
        this.setupActiveNavTracking();
    }

    setupActiveNavTracking() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    const activeLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
                    if (activeLink) {
                        activeLink.classList.add('active');
                    }
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '-100px 0px -100px 0px'
        });

        sections.forEach(section => observer.observe(section));
    }

    setupCounterAnimations() {
        const counterElements = document.querySelectorAll('[data-target]');
        
        counterElements.forEach(element => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !element.classList.contains('animated')) {
                        this.animateCounter(element);
                        element.classList.add('animated');
                    }
                });
            }, { threshold: 0.5 });

            observer.observe(element);
        });
    }

    animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const startTime = performance.now();
        const startValue = 0;

        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentValue = Math.floor(startValue + (target - startValue) * easeOutQuart);
            
            element.textContent = currentValue;

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };

        requestAnimationFrame(updateCounter);
    }

    setupInteractiveElements() {
        // Add interactive hover effects to cards
        const cards = document.querySelectorAll('.feature-card, .problem-card, .outcome-card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.addHoverEffect(card);
            });

            card.addEventListener('mouseleave', () => {
                this.removeHoverEffect(card);
            });
        });

        // Add click effects to buttons
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.createRippleEffect(e, button);
            });
        });
    }

    setupDemoInteractions() {
        const scanBtn = document.querySelector('.scan-btn');
        const barcodeInput = document.querySelector('.scanner-input .demo-input');
        const autoFilledInputs = document.querySelectorAll('.auto-filled');

        if (scanBtn && barcodeInput) {
            scanBtn.addEventListener('click', () => {
                this.simulateBarcodeScanning(barcodeInput, autoFilledInputs);
            });
        }

        // Simulate typing in barcode input
        if (barcodeInput) {
            barcodeInput.addEventListener('input', (e) => {
                if (e.target.value.length > 10) {
                    this.simulateAutoPopulation(autoFilledInputs);
                }
            });
        }
    }

    simulateBarcodeScanning(input, autoFilledInputs) {
        // Simulate scanning animation
        input.style.borderColor = '#ff6b35';
        input.placeholder = 'Scanning...';
        
        // Add scanning visual effect
        input.style.background = 'linear-gradient(90deg, transparent, rgba(255, 107, 53, 0.2), transparent)';
        input.style.backgroundSize = '200% 100%';
        input.style.animation = 'scanning 1.5s ease-in-out';

        setTimeout(() => {
            const mockBarcode = this.generateMockBarcode();
            input.value = mockBarcode;
            input.placeholder = 'Scan or enter barcode...';
            input.style.borderColor = '#ff6b35';
            input.style.background = 'rgba(255, 107, 53, 0.1)';
            input.style.animation = '';
            
            this.simulateAutoPopulation(autoFilledInputs);
        }, 1500);
    }

    simulateAutoPopulation(autoFilledInputs) {
        autoFilledInputs.forEach((input, index) => {
            setTimeout(() => {
                input.style.transform = 'scale(1.02)';
                input.style.borderColor = '#ff6b35';
                
                if (input.value.includes('SKU')) {
                    input.value = `WH-${new Date().getFullYear()}-INV-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`;
                } else if (input.value.includes('MPN')) {
                    input.value = `MPN-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`;
                }

                setTimeout(() => {
                    input.style.transform = 'scale(1)';
                }, 200);
            }, index * 300);
        });
    }

    generateMockBarcode() {
        const prefixes = ['123456789', '987654321', '456789123'];
        const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
        const suffix = String(Math.floor(Math.random() * 1000)).padStart(3, '0');
        return prefix + suffix;
    }

    addHoverEffect(element) {
        element.style.transform = 'translateY(-8px) scale(1.02)';
        element.style.boxShadow = '0 15px 40px rgba(255, 107, 53, 0.15)';
    }

    removeHoverEffect(element) {
        element.style.transform = 'translateY(0) scale(1)';
        element.style.boxShadow = '';
    }

    createRippleEffect(event, button) {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple 0.6s linear;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
        `;

        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    scrollToSection(sectionId) {
        const targetElement = document.getElementById(sectionId);
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }

    observePerformance() {
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    if (entry.entryType === 'measure') {
                        console.log(`Performance: ${entry.name} took ${entry.duration}ms`);
                    }
                });
            });

            observer.observe({ entryTypes: ['measure'] });
        }
    }
}

class ScrollAnimationManager {
    constructor() {
        this.observer = null;
        this.observedElements = new Set();
    }

    observe() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                    this.observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        const elementsToObserve = document.querySelectorAll('.animate-on-scroll');
        elementsToObserve.forEach(element => {
            this.observer.observe(element);
            this.observedElements.add(element);
        });
    }

    animateElement(element) {
        element.classList.add('animate');
        
        // Add stagger animation for child elements if they exist
        const childElements = element.querySelectorAll('.animate-on-scroll');
        childElements.forEach((child, index) => {
            setTimeout(() => {
                child.classList.add('animate');
            }, index * 100);
        });
    }

    destroy() {
        if (this.observer) {
            this.observedElements.forEach(element => {
                this.observer.unobserve(element);
            });
            this.observer.disconnect();
        }
    }
}

// Utility Functions
const scrollToSection = (sectionId) => {
    const app = window.inventoryApp;
    if (app) {
        app.scrollToSection(sectionId);
    }
};

const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

const throttle = (func, limit) => {
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
};

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes scanning {
        0% {
            background-position: -200% 0;
        }
        100% {
            background-position: 200% 0;
        }
    }
    
    .nav-link.active {
        color: #ff6b35;
    }
    
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// Enhanced scroll behavior for better UX
const enhanceScrollBehavior = () => {
    let ticking = false;
    
    const updateScrollProgress = () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = scrollTop / docHeight;
        
        // Update any scroll-dependent UI elements here
        document.documentElement.style.setProperty('--scroll-progress', scrollPercent);
        
        ticking = false;
    };
    
    const requestTick = () => {
        if (!ticking) {
            requestAnimationFrame(updateScrollProgress);
            ticking = true;
        }
    };
    
    window.addEventListener('scroll', requestTick, { passive: true });
};

// Preload critical resources
const preloadResources = () => {
    const criticalResources = [
        // Add any critical resources here if needed
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource.href;
        link.as = resource.as;
        document.head.appendChild(link);
    });
};

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Mark start of initialization
    performance.mark('app-init-start');
    
    try {
        // Initialize the main application
        window.inventoryApp = new InventorySystemPresentation();
        
        // Enhance scroll behavior
        enhanceScrollBehavior();
        
        // Preload resources
        preloadResources();
        
        // Mark end of initialization
        performance.mark('app-init-end');
        performance.measure('app-initialization', 'app-init-start', 'app-init-end');
        
        console.log('🚀 Inventory System Presentation initialized successfully');
        
    } catch (error) {
        console.error('❌ Failed to initialize application:', error);
        
        // Fallback for essential functionality
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }
});

// Handle page visibility changes for performance optimization
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
        // Pause non-essential animations when page is hidden
        document.body.classList.add('page-hidden');
    } else {
        // Resume animations when page becomes visible
        document.body.classList.remove('page-hidden');
    }
});

// Clean up on page unload
window.addEventListener('beforeunload', () => {
    if (window.inventoryApp && window.inventoryApp.scrollAnimationManager) {
        window.inventoryApp.scrollAnimationManager.destroy();
    }
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        InventorySystemPresentation,
        ScrollAnimationManager,
        scrollToSection,
        debounce,
        throttle
    };
}
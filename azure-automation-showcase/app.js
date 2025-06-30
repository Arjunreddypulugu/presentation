// ES6 Class for managing the presentation
class AzureAutomationPresentation {
    constructor() {
        this.currentPage = 'overview';
        this.animationObserver = null;
        this.countersAnimated = false;
        
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupScrollAnimations();
        this.setupCounterAnimations();
        this.setupSmoothScrolling();
        
        // Add some initial entrance animations
        this.animatePageEntrance();
    }

    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav__link');
        const navigateButtons = document.querySelectorAll('[data-navigate]');
        
        // Handle navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetPage = link.dataset.page;
                this.navigateToPage(targetPage);
            });
        });

        // Handle navigation buttons
        navigateButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const targetPage = button.dataset.navigate;
                this.navigateToPage(targetPage);
            });
        });
    }

    navigateToPage(targetPage) {
        if (targetPage === this.currentPage) return;

        const currentPageEl = document.getElementById(this.currentPage);
        const targetPageEl = document.getElementById(targetPage);
        const navLinks = document.querySelectorAll('.nav__link');

        // Update navigation active state
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.dataset.page === targetPage) {
                link.classList.add('active');
            }
        });

        // Page transition with smooth effect
        this.transitionPages(currentPageEl, targetPageEl);
        this.currentPage = targetPage;

        // Reset animations for new page
        setTimeout(() => {
            this.resetAnimations(targetPageEl);
            this.animatePageEntrance();
        }, 300);
    }

    transitionPages(currentPage, targetPage) {
        // Fade out current page
        currentPage.style.opacity = '0';
        currentPage.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            currentPage.classList.add('hidden');
            targetPage.classList.remove('hidden');
            
            // Fade in target page
            requestAnimationFrame(() => {
                targetPage.style.opacity = '0';
                targetPage.style.transform = 'translateY(20px)';
                
                requestAnimationFrame(() => {
                    targetPage.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
                    targetPage.style.opacity = '1';
                    targetPage.style.transform = 'translateY(0)';
                });
            });
        }, 250);
    }

    setupScrollAnimations() {
        // Create intersection observer for scroll-triggered animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        this.animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.triggerElementAnimation(entry.target);
                }
            });
        }, observerOptions);

        // Observe all animated elements
        this.observeAnimatedElements();
    }

    observeAnimatedElements() {
        const animatedElements = document.querySelectorAll(`
            .animate-fade-up,
            .animate-scale-up,
            .animate-slide-right,
            .animate-slide-left,
            .animate-slide-up,
            .animate-fade-in
        `);

        animatedElements.forEach(el => {
            this.animationObserver.observe(el);
        });
    }

    triggerElementAnimation(element) {
        element.classList.add('animate-in');
        this.animationObserver.unobserve(element);
    }

    setupCounterAnimations() {
        const counterElements = document.querySelectorAll('.metric-card__value[data-target]');
        
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.countersAnimated) {
                    this.animateCounters();
                    this.countersAnimated = true;
                }
            });
        }, { threshold: 0.5 });

        counterElements.forEach(counter => {
            counterObserver.observe(counter.closest('.metric-card'));
        });
    }

    animateCounters() {
        const counters = document.querySelectorAll('.metric-card__value[data-target]');
        
        counters.forEach((counter, index) => {
            const target = parseInt(counter.dataset.target);
            const duration = 2000; // 2 seconds
            const step = target / (duration / 16); // 60fps
            let current = 0;

            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    counter.textContent = target;
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current);
                }
            }, 16);

            // Add some stagger to make it more visually appealing
            setTimeout(() => {
                counter.closest('.metric-card').style.transform = 'scale(1.05)';
                setTimeout(() => {
                    counter.closest('.metric-card').style.transform = 'scale(1)';
                }, 200);
            }, index * 200);
        });
    }

    setupSmoothScrolling() {
        // Enhanced smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    animatePageEntrance() {
        // Add entrance animations to visible elements on current page
        const currentPageEl = document.getElementById(this.currentPage);
        const visibleElements = currentPageEl.querySelectorAll(`
            .animate-fade-up,
            .animate-scale-up,
            .animate-slide-right,
            .animate-slide-left,
            .animate-slide-up,
            .animate-fade-in
        `);

        visibleElements.forEach((el, index) => {
            setTimeout(() => {
                this.triggerElementAnimation(el);
            }, index * 100);
        });
    }

    resetAnimations(pageElement) {
        const animatedElements = pageElement.querySelectorAll('.animate-in');
        animatedElements.forEach(el => {
            el.classList.remove('animate-in');
            this.animationObserver.observe(el);
        });
    }
}

// Scroll Animation Manager Class
class ScrollAnimationManager {
    constructor() {
        this.scrollTicking = false;
        this.init();
    }

    init() {
        this.setupParallaxEffects();
        this.setupScrollIndicators();
    }

    setupParallaxEffects() {
        window.addEventListener('scroll', () => {
            if (!this.scrollTicking) {
                requestAnimationFrame(() => {
                    this.updateParallaxElements();
                    this.scrollTicking = false;
                });
                this.scrollTicking = true;
            }
        });
    }

    updateParallaxElements() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero, .technical-hero');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }

    setupScrollIndicators() {
        // Add subtle scroll progress indicator
        const progressBar = this.createProgressBar();
        
        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            
            progressBar.style.width = scrolled + '%';
        });
    }

    createProgressBar() {
        const progressContainer = document.createElement('div');
        progressContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 3px;
            background: rgba(74, 155, 155, 0.1);
            z-index: 1001;
        `;

        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            height: 100%;
            background: linear-gradient(90deg, #4a9b9b, #5bb4b4);
            width: 0%;
            transition: width 0.3s ease;
        `;

        progressContainer.appendChild(progressBar);
        document.body.appendChild(progressContainer);
        
        return progressBar;
    }
}

// Performance monitoring class
class PerformanceMonitor {
    constructor() {
        this.metrics = {
            pageLoadTime: 0,
            animationFrames: 0,
            scrollEvents: 0
        };
        
        this.init();
    }

    init() {
        this.measurePageLoad();
        this.monitorAnimationPerformance();
    }

    measurePageLoad() {
        window.addEventListener('load', () => {
            const loadTime = performance.now();
            this.metrics.pageLoadTime = loadTime;
            
            // Log performance in development
            if (window.location.hostname === 'localhost') {
                console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
            }
        });
    }

    monitorAnimationPerformance() {
        let frameCount = 0;
        
        const countFrames = () => {
            frameCount++;
            this.metrics.animationFrames = frameCount;
            requestAnimationFrame(countFrames);
        };
        
        requestAnimationFrame(countFrames);
    }
}

// Enhanced interaction effects
class InteractionEffects {
    constructor() {
        this.init();
    }

    init() {
        this.setupCardHoverEffects();
        this.setupButtonEffects();
        this.setupMouseTracker();
    }

    setupCardHoverEffects() {
        const cards = document.querySelectorAll('.metric-card, .impact-card, .flow-step, .comparison__card, .outcome-item');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                this.addHoverGlow(e.target);
            });
            
            card.addEventListener('mouseleave', (e) => {
                this.removeHoverGlow(e.target);
            });
        });
    }

    addHoverGlow(element) {
        element.style.boxShadow = '0 8px 30px rgba(74, 155, 155, 0.3)';
        element.style.transform = 'translateY(-5px) scale(1.02)';
    }

    removeHoverGlow(element) {
        element.style.boxShadow = '';
        element.style.transform = '';
    }

    setupButtonEffects() {
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.createRippleEffect(e);
            });
        });
    }

    createRippleEffect(e) {
        const button = e.currentTarget;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    setupMouseTracker() {
        // Subtle mouse tracking effect for hero sections
        const heroSections = document.querySelectorAll('.hero, .technical-hero');
        
        heroSections.forEach(hero => {
            hero.addEventListener('mousemove', (e) => {
                const rect = hero.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                
                hero.style.background = `
                    radial-gradient(circle at ${x}% ${y}%, 
                    rgba(74, 155, 155, 0.8) 0%, 
                    rgba(91, 180, 180, 0.6) 50%, 
                    rgba(74, 155, 155, 0.8) 100%)
                `;
            });
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize main presentation controller
    const presentation = new AzureAutomationPresentation();
    
    // Initialize scroll animation manager
    const scrollManager = new ScrollAnimationManager();
    
    // Initialize performance monitor
    const performanceMonitor = new PerformanceMonitor();
    
    // Initialize interaction effects
    const interactionEffects = new InteractionEffects();
    
    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
        
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
    
    // Add some interactive console messages for development
    if (window.location.hostname === 'localhost') {
        console.log('🚀 Azure Automation Presentation Loaded');
        console.log('📊 Performance monitoring active');
        console.log('✨ All animations initialized');
    }
});

// Export classes for potential external use
window.AzureAutomationPresentation = {
    AzureAutomationPresentation,
    ScrollAnimationManager,
    PerformanceMonitor,
    InteractionEffects
};
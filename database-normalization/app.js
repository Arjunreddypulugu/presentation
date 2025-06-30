// Database Normalization Presentation - Modern JavaScript Implementation

class DatabasePresentation {
    constructor() {
        this.animationManager = new ScrollAnimationManager();
        this.navbar = document.getElementById('navbar');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.heroStats = document.querySelectorAll('.stat-number');
        this.categoryProgress = document.querySelectorAll('.category-progress');
        this.progressBars = document.querySelectorAll('.progress-fill');
        
        this.init();
    }

    init() {
        // Set correct initial values
        this.setInitialValues();
        this.setupIntersectionObserver();
        this.setupNavigationEvents();
        this.setupScrollEffects();
        this.animateHeroStats();
        this.setupProgressAnimations();
        
        // Initialize progress bars immediately for visible sections
        this.initializeVisibleElements();
        
        // Performance monitoring
        this.monitorPerformance();
    }

    setInitialValues() {
        // Set correct initial hero stats
        const heroStatsData = [
            { element: this.heroStats[0], target: 120 },
            { element: this.heroStats[1], target: 6 },
            { element: this.heroStats[2], target: 2 }
        ];

        heroStatsData.forEach(({ element, target }) => {
            if (element) {
                element.textContent = target;
                element.dataset.target = target;
            }
        });
    }

    initializeVisibleElements() {
        // Initialize category progress bars
        this.categoryProgress.forEach((bar, index) => {
            const width = bar.dataset.width;
            if (width) {
                setTimeout(() => {
                    bar.style.width = `${width}%`;
                }, index * 200);
            }
        });

        // Initialize progress bars in outcomes section
        setTimeout(() => {
            this.progressBars.forEach((bar, index) => {
                const progress = bar.dataset.progress;
                if (progress) {
                    setTimeout(() => {
                        bar.style.width = `${progress}%`;
                    }, index * 300);
                }
            });
        }, 1000);
    }

    setupIntersectionObserver() {
        const sections = document.querySelectorAll('section[id]');
        
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '-50px 0px -50px 0px'
        };

        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.updateActiveNavLink(entry.target.id);
                    this.triggerSectionAnimations(entry.target);
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            sectionObserver.observe(section);
        });

        // Separate observer for enhanced animation elements
        const animationElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
        
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    requestAnimationFrame(() => {
                        // Add enhance class first, then animate
                        entry.target.classList.add('enhance');
                        setTimeout(() => {
                            entry.target.classList.add('animate');
                        }, 50);
                    });
                }
            });
        }, { threshold: 0.1 });

        animationElements.forEach(element => {
            animationObserver.observe(element);
        });
    }

    updateActiveNavLink(sectionId) {
        this.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
                link.classList.add('active');
            }
        });
    }

    triggerSectionAnimations(section) {
        const sectionId = section.id;
        
        switch (sectionId) {
            case 'current-state':
                this.animateCategoryBars();
                break;
            case 'outcomes':
                this.animateProgressBars();
                break;
            case 'hero':
                this.animateHeroStats();
                break;
        }
    }

    setupNavigationEvents() {
        // Smooth scroll for navigation links
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    this.smoothScrollTo(targetSection);
                }
            });
        });

        // Navbar scroll effect
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 100) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
            
            lastScrollY = currentScrollY;
        }, { passive: true });
    }

    setupScrollEffects() {
        // Parallax effect for hero section
        const heroSection = document.querySelector('.hero-section');
        
        window.addEventListener('scroll', this.throttle(() => {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.3;
            
            if (heroSection && scrolled < window.innerHeight) {
                heroSection.style.transform = `translateY(${parallax}px)`;
            }
        }, 16), { passive: true });
    }

    smoothScrollTo(target) {
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition - 120; // Account for navbar height
        const duration = 1000;
        let start = null;

        const animateScroll = (timestamp) => {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            const percentage = Math.min(progress / duration, 1);
            
            // Easing function
            const easing = this.easeInOutCubic(percentage);
            
            window.scrollTo(0, startPosition + distance * easing);
            
            if (progress < duration) {
                requestAnimationFrame(animateScroll);
            }
        };

        requestAnimationFrame(animateScroll);
    }

    easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    }

    animateHeroStats() {
        const statsData = [
            { target: 120, label: 'Database Tables' },
            { target: 6, label: 'Table Categories' },
            { target: 2, label: 'MRF Locations' }
        ];

        this.heroStats.forEach((stat, index) => {
            if (statsData[index]) {
                const { target } = statsData[index];
                const increment = target / 60; // Slower animation
                let current = 0;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    stat.textContent = Math.floor(current);
                }, 33 + (index * 10)); // Stagger the animations
            }
        });
    }

    animateCategoryBars() {
        // Data for category progress bars
        const categoryData = [
            { name: 'Contract Management', count: 32, width: 40 },
            { name: 'Equipment Tracking', count: 15, width: 19 },
            { name: 'Employee Management', count: 12, width: 15 },
            { name: 'Financial Management', count: 10, width: 12 },
            { name: 'Project Management', count: 8, width: 10 },
            { name: 'System Management', count: 3, width: 4 }
        ];

        this.categoryProgress.forEach((bar, index) => {
            if (categoryData[index]) {
                const { width } = categoryData[index];
                bar.dataset.width = width;
                
                setTimeout(() => {
                    requestAnimationFrame(() => {
                        bar.style.width = `${width}%`;
                    });
                }, index * 200);
            }
        });
    }

    animateProgressBars() {
        const benefitsData = [
            { improvement: '85% reduction', progress: 85 },
            { improvement: '40% reduction', progress: 40 },
            { improvement: '60% improvement', progress: 60 },
            { improvement: '70% easier', progress: 70 }
        ];

        this.progressBars.forEach((bar, index) => {
            if (benefitsData[index]) {
                const { progress } = benefitsData[index];
                bar.dataset.progress = progress;
                
                setTimeout(() => {
                    requestAnimationFrame(() => {
                        bar.style.width = `${progress}%`;
                    });
                }, index * 300);
            }
        });
    }

    setupProgressAnimations() {
        // Enhanced animation setup for cards
        const cardElements = document.querySelectorAll('.overview-card, .table-card, .step-card, .benefit-card');
        
        cardElements.forEach((element, index) => {
            element.classList.add('fade-in');
            element.style.transitionDelay = `${index * 100}ms`;
        });

        // Timeline items animation
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach((item, index) => {
            item.classList.add(index % 2 === 0 ? 'slide-in-left' : 'slide-in-right');
            item.style.transitionDelay = `${index * 200}ms`;
        });
    }

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
    }

    monitorPerformance() {
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    if (entry.entryType === 'measure') {
                        console.log(`Performance: ${entry.name} took ${entry.duration}ms`);
                    }
                });
            });
            
            try {
                observer.observe({ entryTypes: ['measure'] });
            } catch (e) {
                console.log('Performance monitoring not fully supported');
            }
        }
    }
}

class ScrollAnimationManager {
    constructor() {
        this.animatedElements = new Set();
        this.scrollCallbacks = new Map();
        this.rafId = null;
        this.isScrolling = false;
        
        this.bindEvents();
    }

    bindEvents() {
        window.addEventListener('scroll', () => {
            if (!this.isScrolling) {
                this.isScrolling = true;
                this.rafId = requestAnimationFrame(() => {
                    this.handleScroll();
                    this.isScrolling = false;
                });
            }
        }, { passive: true });
    }

    handleScroll() {
        const scrollY = window.pageYOffset;
        const windowHeight = window.innerHeight;
        
        // Execute registered scroll callbacks
        this.scrollCallbacks.forEach((callback, element) => {
            const rect = element.getBoundingClientRect();
            const elementTop = rect.top + scrollY;
            const elementHeight = rect.height;
            
            // Check if element is in viewport
            if (rect.top < windowHeight && rect.bottom > 0) {
                const progress = Math.max(0, Math.min(1, 
                    (windowHeight - rect.top) / (windowHeight + elementHeight)
                ));
                
                callback(progress, element);
            }
        });
    }

    registerScrollCallback(element, callback) {
        this.scrollCallbacks.set(element, callback);
    }

    unregisterScrollCallback(element) {
        this.scrollCallbacks.delete(element);
    }

    addRevealAnimation(element, delay = 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.animatedElements.has(element)) {
                    setTimeout(() => {
                        requestAnimationFrame(() => {
                            element.classList.add('animate');
                            this.animatedElements.add(element);
                        });
                    }, delay);
                }
            });
        }, { threshold: 0.1 });

        observer.observe(element);
    }
}

// Enhanced table visualization with hover effects
class TableVisualization {
    constructor() {
        this.tableCards = document.querySelectorAll('.table-card');
        this.init();
    }

    init() {
        this.setupHoverEffects();
        this.setupClickEffects();
    }

    setupHoverEffects() {
        this.tableCards.forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                this.highlightRelatedElements(e.target);
            });

            card.addEventListener('mouseleave', (e) => {
                this.resetHighlight(e.target);
            });
        });
    }

    setupClickEffects() {
        this.tableCards.forEach(card => {
            card.addEventListener('click', (e) => {
                this.showTableDetails(e.currentTarget);
            });
        });
    }

    highlightRelatedElements(card) {
        const severityBadge = card.querySelector('.severity-badge');
        if (severityBadge) {
            const severity = severityBadge.textContent.toLowerCase();
            
            // Add glow effect based on severity
            if (severity.includes('high')) {
                card.style.boxShadow = '0 8px 25px rgba(255, 84, 89, 0.3)';
            } else if (severity.includes('medium')) {
                card.style.boxShadow = '0 8px 25px rgba(255, 193, 7, 0.3)';
            }
        }
    }

    resetHighlight(card) {
        card.style.boxShadow = '';
    }

    showTableDetails(card) {
        const tableNameElement = card.querySelector('h4');
        const issueElements = card.querySelectorAll('.issue-tag');
        
        if (tableNameElement && issueElements.length > 0) {
            const tableName = tableNameElement.textContent;
            const issues = Array.from(issueElements).map(tag => tag.textContent);
            
            console.log(`Table: ${tableName}`, `Issues: ${issues.join(', ')}`);
            
            // Add a temporary highlight effect
            card.style.transform = 'scale(1.02)';
            setTimeout(() => {
                card.style.transform = '';
            }, 200);
        }
    }
}

// Utility functions for enhanced interactivity
const DatabaseUtils = {
    // Format numbers with commas
    formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },

    // Generate random color for visualizations
    generateColor(opacity = 1) {
        const colors = [
            '31, 184, 228',
            '255, 193, 7', 
            '255, 84, 89',
            '50, 184, 198',
            '168, 75, 47'
        ];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        return `rgba(${randomColor}, ${opacity})`;
    },

    // Debounce function for performance
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

    // Throttle function for scroll events
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
    }
};

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Feature detection
    if ('IntersectionObserver' in window && 'requestAnimationFrame' in window) {
        const presentation = new DatabasePresentation();
        const tableViz = new TableVisualization();
        
        // Add performance mark
        if ('performance' in window && 'mark' in performance) {
            performance.mark('app-initialized');
        }
        
        console.log('Database Normalization Presentation initialized successfully');
    } else {
        console.warn('Some features may not be available in this browser');
        // Fallback initialization without modern features
        initializeFallback();
    }
});

// Fallback initialization for older browsers
function initializeFallback() {
    // Basic navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Set correct hero stats
    const stats = document.querySelectorAll('.stat-number');
    const correctValues = [120, 6, 2];
    stats.forEach((stat, index) => {
        if (correctValues[index] !== undefined) {
            stat.textContent = correctValues[index];
        }
    });

    // Show all progress bars
    const progressBars = document.querySelectorAll('.progress-fill, .category-progress');
    const progressValues = [85, 40, 60, 70, 40, 19, 15, 12, 10, 4]; // Combined values
    progressBars.forEach((bar, index) => {
        const width = bar.dataset.width || bar.dataset.progress || progressValues[index];
        if (width) {
            setTimeout(() => {
                bar.style.width = `${width}%`;
            }, index * 200);
        }
    });

    console.log('Fallback initialization completed');
}

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { DatabasePresentation, ScrollAnimationManager, TableVisualization };
}
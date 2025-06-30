// Van Dyk Project Presentation - Modern JavaScript Implementation
// Using ES6+ features and Web APIs

class ProjectPresentation {
    constructor() {
        this.currentPage = 'page1';
        this.currentSlide = 0;
        this.totalSlides = 5;
        this.isAnimating = false;
        
        // Project data
        this.projectData = {
            customers: [
                "WM Mesquite Creek",
                "GFL Environmental Harrisonville",
                "WM Brevard County", 
                "Republic Services North Highland",
                "Waste Connections Plainfield MRF",
                "GFL Environmental Toronto",
                "GFL Environmental Huron",
                "Republic Services Peabody",
                "Waste Connections Mckinney",
                "Colgate Paper Stock"
            ],
            tasks: [
                "Create folders for each machine in G-drive",
                "Move manuals",
                "Move the pictures to the right machine folders",
                "Create Spare Parts list", 
                "Move Drawings",
                "Extract Drawings from manuals",
                "Update AMI for each Machine"
            ],
            carouselItems: [
                {
                    id: 1,
                    title: "Customer Folders",
                    description: "",
                    image: "../assets/folder1.png"
                },
                {
                    id: 2,
                    title: "Different Projects for a Customer", 
                    description: "",
                    image: "../assets/folder2.png"
                },
                {
                    id: 3,
                    title: "Folder Layout for a particular project",
                    description: "",
                    image: "../assets/folder3.png"
                },
                {
                    id: 4,
                    title: "All the Machines under that project for that customer",
                    description: "",
                    image: "../assets/folder5.png"
                },
                {
                    id: 5,
                    title: "Folder layout for a particular machine",
                    description: "",
                    image: "../assets/folder4.png"
                }
            ]
        };

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.populateContent();
        this.initializeAnimations();
        this.initializeCarousel();
        console.log('Van Dyk Project Presentation initialized successfully');
    }

    setupEventListeners() {
        // Navigation
        document.querySelectorAll('[data-page]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetPage = e.target.getAttribute('data-page');
                this.navigateToPage(targetPage);
            });
        });

        // Carousel controls
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        
        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', () => this.previousSlide());
            nextBtn.addEventListener('click', () => this.nextSlide());
        }

        // Tab functionality
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tabName = e.target.getAttribute('data-tab');
                this.switchTab(tabName);
            });
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (this.currentPage === 'page1') {
                if (e.key === 'ArrowLeft') this.previousSlide();
                if (e.key === 'ArrowRight') this.nextSlide();
            }
        });

        // Touch/swipe support for carousel
        this.setupTouchEvents();
    }

    setupTouchEvents() {
        const carouselTrack = document.getElementById('carouselTrack');
        if (!carouselTrack) return;

        let startX = 0;
        let currentX = 0;
        let isDragging = false;

        carouselTrack.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
        });

        carouselTrack.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            currentX = e.touches[0].clientX;
        });

        carouselTrack.addEventListener('touchend', () => {
            if (!isDragging) return;
            isDragging = false;
            
            const diff = startX - currentX;
            const threshold = 50;

            if (Math.abs(diff) > threshold) {
                if (diff > 0) {
                    this.nextSlide();
                } else {
                    this.previousSlide();
                }
            }
        });
    }

    navigateToPage(targetPage) {
        if (this.currentPage === targetPage) return;

        const currentPageEl = document.getElementById(this.currentPage);
        const targetPageEl = document.getElementById(targetPage);

        if (!currentPageEl || !targetPageEl) return;

        // Smooth page transition
        currentPageEl.style.opacity = '0';
        currentPageEl.style.transform = 'translateY(-20px)';

        setTimeout(() => {
            currentPageEl.classList.remove('active');
            targetPageEl.classList.add('active');
            
            // Trigger entrance animation
            requestAnimationFrame(() => {
                targetPageEl.style.opacity = '1';
                targetPageEl.style.transform = 'translateY(0)';
            });

            this.currentPage = targetPage;
            this.updateNavigation();
            this.triggerPageAnimations();
        }, 300);
    }

    updateNavigation() {
        document.querySelectorAll('.nav__link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-page') === this.currentPage) {
                link.classList.add('active');
            }
        });
    }

    initializeCarousel() {
        const track = document.getElementById('carouselTrack');
        const indicators = document.getElementById('carouselIndicators');
        
        if (!track || !indicators) return;

        // Create carousel items
        track.innerHTML = '';
        indicators.innerHTML = '';

        this.projectData.carouselItems.forEach((item, index) => {
            // Create slide
            const slide = document.createElement('div');
            slide.className = 'carousel-item';
            slide.innerHTML = `
                <div class="carousel-content">
                    <div class="carousel-image-container">
                        <img src="${item.image}" alt="${item.title}" class="carousel-image">
                    </div>
                    <div class="carousel-text">
                        <h3 class="carousel-title">${item.title}</h3>
                        <p class="carousel-description">${item.description}</p>
                    </div>
                </div>
            `;
            track.appendChild(slide);

            // Create indicator
            const indicator = document.createElement('div');
            indicator.className = `indicator ${index === 0 ? 'active' : ''}`;
            indicator.addEventListener('click', () => this.goToSlide(index));
            indicators.appendChild(indicator);
        });

        this.updateCarousel();
    }

    nextSlide() {
        if (this.isAnimating) return;
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.updateCarousel();
    }

    previousSlide() {
        if (this.isAnimating) return;
        this.currentSlide = this.currentSlide === 0 ? this.totalSlides - 1 : this.currentSlide - 1;
        this.updateCarousel();
    }

    goToSlide(index) {
        if (this.isAnimating || index === this.currentSlide) return;
        this.currentSlide = index;
        this.updateCarousel();
    }

    updateCarousel() {
        const track = document.getElementById('carouselTrack');
        const indicators = document.querySelectorAll('.indicator');
        
        if (!track) return;

        this.isAnimating = true;
        
        // Update track position
        const translateX = -this.currentSlide * 100;
        track.style.transform = `translateX(${translateX}%)`;

        // Update indicators
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentSlide);
        });

        // Reset animation flag
        setTimeout(() => {
            this.isAnimating = false;
        }, 500);
    }

    populateContent() {
        this.populateCustomers();
        this.populateTasks();
    }

    populateCustomers() {
        const customersGrid = document.getElementById('customersGrid');
        if (!customersGrid) return;

        customersGrid.innerHTML = '';
        
        this.projectData.customers.forEach((customer, index) => {
            const customerEl = document.createElement('div');
            customerEl.className = 'data-item';
            customerEl.style.animationDelay = `${index * 0.1}s`;
            customerEl.innerHTML = `
                <div style="font-weight: 500; color: var(--color-navy);">${customer}</div>
            `;
            customersGrid.appendChild(customerEl);
        });
    }

    populateTasks() {
        const tasksList = document.getElementById('tasksList');
        if (!tasksList) return;

        tasksList.innerHTML = '';
        
        this.projectData.tasks.forEach((task, index) => {
            const taskEl = document.createElement('div');
            taskEl.className = 'task-item';
            taskEl.style.animationDelay = `${index * 0.1}s`;
            taskEl.innerHTML = `
                <div class="task-number">${index + 1}</div>
                <div style="flex: 1; font-weight: 500;">${task}</div>
            `;
            tasksList.appendChild(taskEl);
        });
    }

    switchTab(tabName) {
        // Update tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-tab') === tabName) {
                btn.classList.add('active');
            }
        });

        // Update tab content
        document.querySelectorAll('.tab-pane').forEach(pane => {
            pane.classList.remove('active');
        });

        const targetPane = document.getElementById(tabName);
        if (targetPane) {
            setTimeout(() => {
                targetPane.classList.add('active');
            }, 150);
        }
    }

    initializeAnimations() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                    // Add a subtle bounce effect for better engagement
                    entry.target.addEventListener('animationend', () => {
                        entry.target.style.transform = 'translateY(0)';
                        entry.target.style.opacity = '1';
                    });
                }
            });
        }, observerOptions);

        // Observe animated elements
        document.querySelectorAll('.animate-fade-in, .animate-slide-up').forEach(el => {
            el.style.animationPlayState = 'paused';
            observer.observe(el);
        });
    }

    triggerPageAnimations() {
        // Re-trigger animations when switching pages
        const currentPageEl = document.getElementById(this.currentPage);
        const animatedElements = currentPageEl.querySelectorAll('.animate-fade-in, .animate-slide-up');
        
        animatedElements.forEach((el, index) => {
            el.style.animation = 'none';
            el.offsetHeight; // Trigger reflow
            el.style.animation = null;
            el.style.animationDelay = `${index * 0.1}s`;
        });
    }
}

// Enhanced ScrollAnimationManager for smooth effects
class ScrollAnimationManager {
    constructor() {
        this.elements = [];
        this.init();
    }

    init() {
        this.setupSmoothScrolling();
        this.observeElements();
    }

    setupSmoothScrolling() {
        // Enhanced smooth scrolling for internal links
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

    observeElements() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -100px 0px'
        });

        // Observe cards and sections for entrance animations
        document.querySelectorAll('.card, .flow-step, .detail-card').forEach(el => {
            observer.observe(el);
        });
    }

    animateElement(element) {
        element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        element.style.transform = 'translateY(0)';
        element.style.opacity = '1';
    }
}

// Performance monitoring
class PerformanceMonitor {
    constructor() {
        this.metrics = {};
        this.init();
    }

    init() {
        // Monitor loading performance
        window.addEventListener('load', () => {
            const perfData = performance.getEntriesByType('navigation')[0];
            this.metrics.loadTime = perfData.loadEventEnd - perfData.loadEventStart;
            console.log(`Van Dyk Presentation loaded in ${this.metrics.loadTime}ms`);
        });

        // Monitor user interactions
        this.trackInteractions();
    }

    trackInteractions() {
        let interactionCount = 0;
        
        document.addEventListener('click', () => {
            interactionCount++;
        });

        // Log engagement metrics
        setInterval(() => {
            if (interactionCount > 0) {
                console.log(`User engagement: ${interactionCount} interactions`);
                interactionCount = 0;
            }
        }, 30000); // Every 30 seconds
    }
}

// Auto-carousel functionality
class AutoCarousel {
    constructor(presentation) {
        this.presentation = presentation;
        this.intervalId = null;
        this.isPaused = false;
        this.init();
    }

    init() {
        this.startAutoPlay();
        this.setupPauseOnHover();
    }

    startAutoPlay() {
        this.intervalId = setInterval(() => {
            if (!this.isPaused && this.presentation.currentPage === 'page1') {
                this.presentation.nextSlide();
            }
        }, 4000); // Auto-advance every 4 seconds
    }

    setupPauseOnHover() {
        const carousel = document.querySelector('.carousel-wrapper');
        if (carousel) {
            carousel.addEventListener('mouseenter', () => {
                this.isPaused = true;
            });

            carousel.addEventListener('mouseleave', () => {
                this.isPaused = false;
            });
        }
    }

    stop() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }
}

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing Van Dyk Project Presentation...');
    
    const presentation = new ProjectPresentation();
    const scrollManager = new ScrollAnimationManager();
    const performanceMonitor = new PerformanceMonitor();
    const autoCarousel = new AutoCarousel(presentation);

    // Global error handling
    window.addEventListener('error', (e) => {
        console.error('Application error:', e.error);
    });

    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        autoCarousel.stop();
    });

    console.log('Van Dyk Project Presentation fully initialized! 🚀');
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ProjectPresentation, ScrollAnimationManager, PerformanceMonitor };
}
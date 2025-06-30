/**
 * Van Dyk Recycling Solutions - Predictive Maintenance Presentation
 * Modern Vanilla JavaScript Implementation with Advanced Animations
 */

class PredictiveMaintenanceApp {
  constructor() {
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.initializeAnimations();
    this.initializeNavigation();
    this.initializeCounters();
    this.initializePerformanceMonitoring();
    this.initializeProgressiveEnhancement();
  }

  setupEventListeners() {
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.onDOMReady());
    } else {
      this.onDOMReady();
    }

    // Handle window resize for responsive behavior
    window.addEventListener('resize', this.debounce(() => {
      this.handleResize();
    }, 250));

    // Handle scroll events for navigation highlighting
    window.addEventListener('scroll', this.throttle(() => {
      this.updateActiveNavigation();
    }, 16)); // ~60fps
  }

  onDOMReady() {
    // Initialize all components once DOM is ready
    this.setupSmoothScrolling();
    this.setupMobileNavigation();
    this.setupScrollAnimations();
    this.startCounterAnimations();
    this.initializeTimelineAnimations();
  }

  // Utility functions for performance optimization
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
  }

  throttle(func, limit) {
    let inThrottle;
    return function executedFunction(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  // Progressive Enhancement with Feature Detection
  initializeProgressiveEnhancement() {
    // Check for IntersectionObserver support
    if (!('IntersectionObserver' in window)) {
      // Fallback: Show all elements immediately
      const animatedElements = document.querySelectorAll('.fade-in, .data-category, .timeline-phase');
      animatedElements.forEach(el => {
        el.classList.add('animate-in');
      });
      console.warn('IntersectionObserver not supported. Animations disabled.');
      return;
    }

    // Check for smooth scrolling support
    if (!('scrollBehavior' in document.documentElement.style)) {
      // Implement custom smooth scrolling fallback
      this.implementSmoothScrollFallback();
    }

    // Check for requestAnimationFrame support
    if (!window.requestAnimationFrame) {
      window.requestAnimationFrame = callback => setTimeout(callback, 16);
      window.cancelAnimationFrame = id => clearTimeout(id);
    }
  }

  // Smooth Scrolling Implementation
  setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    const heroCTA = document.querySelector('.hero-cta');

    navLinks.forEach(link => {
      link.addEventListener('click', this.handleSmoothScroll.bind(this));
    });

    // Hero CTA scrolls to business value section
    if (heroCTA) {
      heroCTA.addEventListener('click', (e) => {
        e.preventDefault();
        this.scrollToSection('#business-value');
      });
    }
  }

  handleSmoothScroll(e) {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href');
    this.scrollToSection(targetId);
    
    // Close mobile menu if open
    this.closeMobileMenu();
  }

  scrollToSection(targetId) {
    const targetElement = document.querySelector(targetId);
    if (!targetElement) return;

    const headerHeight = document.querySelector('.nav-header').offsetHeight;
    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

    if ('scrollBehavior' in document.documentElement.style) {
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    } else {
      // Custom smooth scroll implementation
      this.smoothScrollTo(targetPosition);
    }
  }

  smoothScrollTo(targetPosition) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 800;
    let start = null;

    const animation = (currentTime) => {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const run = this.easeInOutCubic(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  }

  easeInOutCubic(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t * t + b;
    t -= 2;
    return c / 2 * (t * t * t + 2) + b;
  }

  implementSmoothScrollFallback() {
    // Custom implementation for browsers without native smooth scrolling
    console.info('Using smooth scroll fallback');
  }

  // Mobile Navigation
  setupMobileNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (!navToggle || !navMenu) return;

    navToggle.addEventListener('click', () => {
      this.toggleMobileMenu();
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        this.closeMobileMenu();
      }
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeMobileMenu();
      }
    });
  }

  toggleMobileMenu() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
  }

  closeMobileMenu() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
  }

  // Navigation Active State Management
  initializeNavigation() {
    this.sections = document.querySelectorAll('section[id]');
    this.navLinks = document.querySelectorAll('.nav-link');
  }

  updateActiveNavigation() {
    if (!this.sections.length) return;

    const scrollPosition = window.pageYOffset + 100;

    this.sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        this.setActiveNavLink(sectionId);
      }
    });
  }

  setActiveNavLink(activeId) {
    this.navLinks.forEach(link => {
      const href = link.getAttribute('href');
      link.classList.toggle('active', href === `#${activeId}`);
    });
  }

  // Scroll-triggered Animations using IntersectionObserver
  setupScrollAnimations() {
    const animationObserver = new IntersectionObserver(
      (entries) => this.handleIntersection(entries),
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    // Observe elements for animation
    const elementsToAnimate = document.querySelectorAll('.fade-in, .data-category, .timeline-phase');
    elementsToAnimate.forEach(el => {
      animationObserver.observe(el);
    });
  }

  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        
        // Special handling for timeline phases
        if (entry.target.classList.contains('timeline-phase')) {
          this.animateTimelinePhase(entry.target);
        }
      }
    });
  }

  animateTimelinePhase(element) {
    // Add a small delay for stagger effect
    const phases = document.querySelectorAll('.timeline-phase');
    const index = Array.from(phases).indexOf(element);
    
    setTimeout(() => {
      element.style.transform = 'translateX(0)';
      element.style.opacity = '1';
    }, index * 200);
  }

  // Timeline Animations
  initializeTimelineAnimations() {
    const timelinePhases = document.querySelectorAll('.timeline-phase');
    
    timelinePhases.forEach((phase, index) => {
      // Set initial state
      phase.style.opacity = '0';
      phase.style.transform = index % 2 === 0 ? 'translateX(-30px)' : 'translateX(30px)';
      phase.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    });
  }

  // Animated Counters
  initializeCounters() {
    this.counters = document.querySelectorAll('.metric-number[data-target]');
  }

  startCounterAnimations() {
    const counterObserver = new IntersectionObserver(
      (entries) => this.handleCounterIntersection(entries),
      { threshold: 0.5 }
    );

    this.counters.forEach(counter => {
      counterObserver.observe(counter);
    });
  }

  handleCounterIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        this.animateCounter(entry.target);
        entry.target.classList.add('counted');
      }
    });
  }

  animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const start = performance.now();

    const updateCounter = (currentTime) => {
      const elapsed = currentTime - start;
      const progress = Math.min(elapsed / duration, 1);
      
      // Use easing function for smooth animation
      const easedProgress = this.easeOutExpo(progress);
      const current = Math.floor(easedProgress * target);
      
      element.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target;
      }
    };

    requestAnimationFrame(updateCounter);
  }

  easeOutExpo(t) {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  }

  // Performance Monitoring
  initializePerformanceMonitoring() {
    if ('PerformanceObserver' in window) {
      const perfObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.entryType === 'paint') {
            console.info(`${entry.name}: ${entry.startTime.toFixed(2)}ms`);
          }
        });
      });

      try {
        perfObserver.observe({ entryTypes: ['paint', 'navigation'] });
      } catch (e) {
        console.warn('Performance monitoring not available');
      }
    }

    // Monitor long tasks
    if ('PerformanceObserver' in window) {
      try {
        const longTaskObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            if (entry.duration > 50) {
              console.warn(`Long task detected: ${entry.duration.toFixed(2)}ms`);
            }
          });
        });
        longTaskObserver.observe({ entryTypes: ['longtask'] });
      } catch (e) {
        // Longtask API not supported
      }
    }
  }

  // Handle window resize
  handleResize() {
    // Recalculate positions for smooth scrolling
    this.updateActiveNavigation();
    
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768) {
      this.closeMobileMenu();
    }
  }

  // Initialize animations based on scroll position
  initializeAnimations() {
    // Add initial classes for CSS transitions
    const animatedElements = document.querySelectorAll('.fade-in');
    animatedElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    });
  }
}

// Enhanced Scroll Animation Manager
class ScrollAnimationManager {
  constructor() {
    this.animations = new Map();
    this.init();
  }

  init() {
    this.setupIntersectionObserver();
    this.registerAnimations();
  }

  setupIntersectionObserver() {
    this.observer = new IntersectionObserver(
      (entries) => this.handleIntersections(entries),
      {
        threshold: [0.1, 0.5, 0.9],
        rootMargin: '0px 0px -10% 0px'
      }
    );
  }

  registerAnimations() {
    // Register different animation types
    this.registerAnimation('fadeInUp', {
      initial: { opacity: 0, transform: 'translateY(30px)' },
      animate: { opacity: 1, transform: 'translateY(0)' }
    });

    this.registerAnimation('slideInLeft', {
      initial: { opacity: 0, transform: 'translateX(-30px)' },
      animate: { opacity: 1, transform: 'translateX(0)' }
    });

    this.registerAnimation('slideInRight', {
      initial: { opacity: 0, transform: 'translateX(30px)' },
      animate: { opacity: 1, transform: 'translateX(0)' }
    });
  }

  registerAnimation(name, keyframes) {
    this.animations.set(name, keyframes);
  }

  handleIntersections(entries) {
    entries.forEach(entry => {
      const animationType = entry.target.dataset.animation || 'fadeInUp';
      
      if (entry.isIntersecting) {
        this.applyAnimation(entry.target, animationType, 'animate');
      }
    });
  }

  applyAnimation(element, type, state) {
    const animation = this.animations.get(type);
    if (!animation || !animation[state]) return;

    const styles = animation[state];
    Object.assign(element.style, styles);
    
    element.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
  }

  observe(element) {
    this.observer.observe(element);
  }
}

// Card Hover Effects Manager
class CardEffectsManager {
  constructor() {
    this.init();
  }

  init() {
    this.setupCardHoverEffects();
    this.setupParallaxEffects();
  }

  setupCardHoverEffects() {
    const cards = document.querySelectorAll('.sensor-card, .action-card, .story-card, .algorithm-card');
    
    cards.forEach(card => {
      card.addEventListener('mouseenter', this.handleCardHover.bind(this));
      card.addEventListener('mouseleave', this.handleCardLeave.bind(this));
      card.addEventListener('mousemove', this.handleCardMouseMove.bind(this));
    });
  }

  handleCardHover(e) {
    const card = e.currentTarget;
    card.style.transition = 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
    card.style.transform = 'translateY(-8px) scale(1.02)';
  }

  handleCardLeave(e) {
    const card = e.currentTarget;
    card.style.transform = 'translateY(0) scale(1)';
  }

  handleCardMouseMove(e) {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    card.style.transform = `translateY(-8px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  }

  setupParallaxEffects() {
    // Simple parallax effect for hero section
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection) return;

    window.addEventListener('scroll', this.throttle(() => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      
      if (scrolled < window.innerHeight) {
        heroSection.style.transform = `translateY(${rate}px)`;
      }
    }, 16));
  }

  throttle(func, limit) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
}

// Initialize the application
const app = new PredictiveMaintenanceApp();
const scrollAnimationManager = new ScrollAnimationManager();
const cardEffectsManager = new CardEffectsManager();

// Export for potential external use
window.VanDykPredictiveMaintenance = {
  app,
  scrollAnimationManager,
  cardEffectsManager
};

// Performance optimization: Preload critical resources
if ('requestIdleCallback' in window) {
  requestIdleCallback(() => {
    // Preload any critical resources during idle time
    console.info('Application initialized and optimized for performance');
  });
}

// Error handling and fallbacks
window.addEventListener('error', (e) => {
  console.error('Application error:', e.error);
  // Implement fallback behavior if needed
});

// Service Worker registration for potential PWA features
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Note: No actual service worker file, just showing the pattern
    console.info('Application ready for PWA enhancement');
  });
}
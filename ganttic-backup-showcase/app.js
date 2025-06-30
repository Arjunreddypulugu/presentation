// Modern JavaScript ES6+ Implementation for Ganttic Data Backup Presentation

class GantticPresentation {
  constructor() {
    this.animationManager = new ScrollAnimationManager();
    this.counterManager = new CounterAnimationManager();
    this.cardManager = new ExpandableCardManager();
    
    this.init();
  }

  init() {
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setupApplication());
    } else {
      this.setupApplication();
    }
  }

  setupApplication() {
    this.animationManager.initialize();
    this.counterManager.initialize();
    this.cardManager.initialize();
    this.setupSmoothScrolling();
    this.setupPerformanceMonitoring();
  }

  setupSmoothScrolling() {
    // Enhanced smooth scrolling for any internal links
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

  setupPerformanceMonitoring() {
    // Optional performance monitoring
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.entryType === 'measure') {
            console.log(`Performance: ${entry.name} took ${entry.duration}ms`);
          }
        });
      });
      
      try {
        observer.observe({ entryTypes: ['measure'] });
      } catch (e) {
        // Fallback for older browsers
        console.log('Performance monitoring not available');
      }
    }
  }
}

class ScrollAnimationManager {
  constructor() {
    this.observer = null;
    this.animatedElements = new Set();
    this.observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
  }

  initialize() {
    if (!('IntersectionObserver' in window)) {
      // Fallback for older browsers - show all elements immediately
      this.fallbackAnimation();
      return;
    }

    this.setupIntersectionObserver();
    this.observeElements();
  }

  setupIntersectionObserver() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => this.handleIntersection(entry));
    }, this.observerOptions);
  }

  handleIntersection(entry) {
    if (entry.isIntersecting && !this.animatedElements.has(entry.target)) {
      const delay = parseInt(entry.target.dataset.delay) || 0;
      
      setTimeout(() => {
        this.animateElement(entry.target);
        this.animatedElements.add(entry.target);
      }, delay);
    }
  }

  animateElement(element) {
    performance.mark('animation-start');
    
    requestAnimationFrame(() => {
      element.classList.add('animate');
      
      // Trigger counter animation if element has counter
      if (element.querySelector('.stat-number')) {
        this.triggerCounterAnimation(element);
      }
      
      performance.mark('animation-end');
      performance.measure('element-animation', 'animation-start', 'animation-end');
    });
  }

  triggerCounterAnimation(element) {
    const counters = element.querySelectorAll('.stat-number');
    counters.forEach(counter => {
      const target = parseInt(counter.dataset.count);
      if (target) {
        this.animateCounter(counter, target);
      }
    });
  }

  animateCounter(element, target) {
    let current = 0;
    const increment = target / 60; // 60 frames for smooth animation
    const duration = 2000; // 2 seconds
    const startTime = performance.now();

    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      current = Math.floor(target * easeOutQuart);
      
      element.textContent = current;
      
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target;
      }
    };

    requestAnimationFrame(updateCounter);
  }

  observeElements() {
    const elementsToObserve = document.querySelectorAll('.fade-in');
    elementsToObserve.forEach(element => {
      this.observer.observe(element);
    });
  }

  fallbackAnimation() {
    // Immediate animation for browsers without IntersectionObserver
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add('animate');
      }, index * 100);
    });
  }

  destroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
    this.animatedElements.clear();
  }
}

class CounterAnimationManager {
  constructor() {
    this.counters = [];
    this.isAnimating = false;
  }

  initialize() {
    this.findCounters();
  }

  findCounters() {
    const counterElements = document.querySelectorAll('.stat-number[data-count]');
    this.counters = Array.from(counterElements).map(element => ({
      element,
      target: parseInt(element.dataset.count),
      current: 0,
      animated: false
    }));
  }

  animateCountersInView() {
    if (this.isAnimating) return;
    
    this.isAnimating = true;
    const visibleCounters = this.counters.filter(counter => 
      !counter.animated && this.isElementInViewport(counter.element)
    );

    visibleCounters.forEach((counter, index) => {
      setTimeout(() => {
        this.animateCounter(counter);
      }, index * 200);
    });

    if (visibleCounters.length === 0) {
      this.isAnimating = false;
    }
  }

  animateCounter(counter) {
    const { element, target } = counter;
    const duration = 2000;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.floor(target * easeOutCubic);
      
      element.textContent = currentValue;
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        element.textContent = target;
        counter.animated = true;
        counter.current = target;
        
        // Check if all visible counters are done
        setTimeout(() => {
          this.isAnimating = false;
        }, 100);
      }
    };

    requestAnimationFrame(animate);
  }

  isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
}

class ExpandableCardManager {
  constructor() {
    this.expandedCards = new Set();
  }

  initialize() {
    this.setupCardListeners();
    this.makeToggleCardGlobal();
  }

  setupCardListeners() {
    const cardHeaders = document.querySelectorAll('.expandable-card .card-header');
    cardHeaders.forEach(header => {
      header.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggleCard(header);
      });
      
      // Add keyboard support
      header.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.toggleCard(header);
        }
      });
      
      // Make focusable for accessibility
      header.setAttribute('tabindex', '0');
      header.setAttribute('role', 'button');
      header.setAttribute('aria-expanded', 'false');
    });
  }

  toggleCard(header) {
    const card = header.parentElement;
    const content = card.querySelector('.card-content');
    const expandIcon = header.querySelector('.expand-icon');
    const cardId = card.id || `card-${Array.from(document.querySelectorAll('.expandable-card')).indexOf(card)}`;

    if (!content || !expandIcon) return;

    const isExpanded = this.expandedCards.has(cardId);

    if (isExpanded) {
      this.collapseCard(content, expandIcon, header, cardId);
    } else {
      this.expandCard(content, expandIcon, header, cardId);
    }
  }

  expandCard(content, expandIcon, header, cardId) {
    // Measure the natural height
    content.style.maxHeight = 'none';
    const naturalHeight = content.scrollHeight;
    content.style.maxHeight = '0';

    // Force reflow
    content.offsetHeight;

    // Animate to natural height
    requestAnimationFrame(() => {
      content.classList.add('expanded');
      content.style.maxHeight = `${naturalHeight}px`;
      expandIcon.style.transform = 'rotate(45deg)';
      header.setAttribute('aria-expanded', 'true');
    });

    this.expandedCards.add(cardId);

    // Set final max-height after animation
    setTimeout(() => {
      if (this.expandedCards.has(cardId)) {
        content.style.maxHeight = '500px';
      }
    }, 250);
  }

  collapseCard(content, expandIcon, header, cardId) {
    // Set current height explicitly
    const currentHeight = content.scrollHeight;
    content.style.maxHeight = `${currentHeight}px`;

    // Force reflow
    content.offsetHeight;

    // Animate to collapsed state
    requestAnimationFrame(() => {
      content.classList.remove('expanded');
      content.style.maxHeight = '0';
      expandIcon.style.transform = 'rotate(0deg)';
      header.setAttribute('aria-expanded', 'false');
    });

    this.expandedCards.delete(cardId);
  }

  makeToggleCardGlobal() {
    // Make toggleCard available globally for inline onclick handlers
    window.toggleCard = (header) => this.toggleCard(header);
  }

  expandAll() {
    const headers = document.querySelectorAll('.expandable-card .card-header');
    headers.forEach(header => {
      const cardId = header.parentElement.id || `card-${Array.from(document.querySelectorAll('.expandable-card')).indexOf(header.parentElement)}`;
      if (!this.expandedCards.has(cardId)) {
        this.toggleCard(header);
      }
    });
  }

  collapseAll() {
    const headers = document.querySelectorAll('.expandable-card .card-header');
    headers.forEach(header => {
      const cardId = header.parentElement.id || `card-${Array.from(document.querySelectorAll('.expandable-card')).indexOf(header.parentElement)}`;
      if (this.expandedCards.has(cardId)) {
        this.toggleCard(header);
      }
    });
  }
}

// Performance utilities
class PerformanceMonitor {
  static measureFunction(name, fn) {
    performance.mark(`${name}-start`);
    const result = fn();
    performance.mark(`${name}-end`);
    performance.measure(name, `${name}-start`, `${name}-end`);
    return result;
  }

  static logPerformanceMetrics() {
    if ('performance' in window && 'getEntriesByType' in performance) {
      const measures = performance.getEntriesByType('measure');
      measures.forEach(measure => {
        console.log(`${measure.name}: ${measure.duration.toFixed(2)}ms`);
      });
    }
  }
}

// Utility functions
const utils = {
  debounce: (func, wait) => {
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

  throttle: (func, limit) => {
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

  isElementInViewport: (element) => {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
};

// Initialize application when DOM is ready
const app = new GantticPresentation();

// Handle window resize for responsive behavior
const handleResize = utils.debounce(() => {
  // Recalculate any viewport-dependent animations
  const expandedCards = document.querySelectorAll('.card-content.expanded');
  expandedCards.forEach(content => {
    const naturalHeight = content.scrollHeight;
    content.style.maxHeight = `${naturalHeight}px`;
  });
}, 250);

window.addEventListener('resize', handleResize);

// Handle reduced motion preferences
const handleReducedMotion = () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (prefersReducedMotion) {
    document.documentElement.style.setProperty('--duration-fast', '0ms');
    document.documentElement.style.setProperty('--duration-normal', '0ms');
    
    // Immediately show all fade-in elements
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
      element.classList.add('animate');
    });
  }
};

// Check for reduced motion preference
if ('matchMedia' in window) {
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  handleReducedMotion();
  mediaQuery.addEventListener('change', handleReducedMotion);
}

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    GantticPresentation,
    ScrollAnimationManager,
    CounterAnimationManager,
    ExpandableCardManager,
    PerformanceMonitor,
    utils
  };
}

// Global error handling for animations
window.addEventListener('error', (e) => {
  console.warn('Animation error caught:', e.error);
  // Graceful degradation - show content immediately
  const fadeElements = document.querySelectorAll('.fade-in:not(.animate)');
  fadeElements.forEach(element => {
    element.classList.add('animate');
  });
});

// Performance logging in development
if (process?.env?.NODE_ENV === 'development' || window.location.hostname === 'localhost') {
  setTimeout(() => {
    PerformanceMonitor.logPerformanceMetrics();
  }, 3000);
}
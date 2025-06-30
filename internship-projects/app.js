class AutomationPresentation {
  constructor() {
    this.currentPage = 'overview';
    this.animationManager = new ScrollAnimationManager();
    this.counterManager = new CounterAnimationManager();
    
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.setupInitialState();
    this.animationManager.init();
    this.counterManager.init();
  }

  setupEventListeners() {
    // Navigation buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const targetPage = e.target.dataset.page;
        this.navigateToPage(targetPage);
      });
    });

    // CTA button
    document.querySelector('.cta-button').addEventListener('click', () => {
      this.navigateToPage('details');
    });

    // Project cards
    document.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('click', () => {
        this.navigateToPage('details');
      });
    });

    // External links
    document.querySelectorAll('a[target="_blank"]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    });
  }

  setupInitialState() {
    // Set initial active nav button
    this.updateActiveNavButton('overview');
    
    // Show overview page initially
    this.showPage('overview');
  }

  navigateToPage(targetPage) {
    if (targetPage === this.currentPage) return;

    const currentPageEl = document.getElementById(`${this.currentPage}-page`);
    const targetPageEl = document.getElementById(`${targetPage}-page`);

    // Smooth transition
    this.transitionPages(currentPageEl, targetPageEl);
    
    this.currentPage = targetPage;
    this.updateActiveNavButton(targetPage);

    // Trigger animations for the new page
    setTimeout(() => {
      this.animationManager.triggerPageAnimations(targetPage);
      if (targetPage === 'details') {
        this.counterManager.animateCounters();
      }
    }, 300);
  }

  transitionPages(currentPage, targetPage) {
    // Fade out current page
    currentPage.style.opacity = '0';
    currentPage.style.transform = 'translateY(-20px)';

    setTimeout(() => {
      currentPage.classList.remove('active');
      targetPage.classList.add('active');
      
      // Fade in target page
      requestAnimationFrame(() => {
        targetPage.style.opacity = '1';
        targetPage.style.transform = 'translateY(0)';
      });
    }, 300);
  }

  showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
      page.classList.remove('active');
    });
    document.getElementById(`${pageId}-page`).classList.add('active');
  }

  updateActiveNavButton(activePageId) {
    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.classList.remove('active');
      if (btn.dataset.page === activePageId) {
        btn.classList.add('active');
      }
    });
  }
}

class ScrollAnimationManager {
  constructor() {
    this.observer = null;
    this.animatedElements = new Set();
  }

  init() {
    this.setupIntersectionObserver();
    this.observeElements();
  }

  setupIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: '0px 0px -100px 0px',
      threshold: 0.1
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.animatedElements.has(entry.target)) {
          this.animateElement(entry.target);
          this.animatedElements.add(entry.target);
        }
      });
    }, options);
  }

  observeElements() {
    // Observe project cards
    document.querySelectorAll('.project-card').forEach(card => {
      card.classList.add('fade-in');
      this.observer.observe(card);
    });

    // Observe detail sections
    document.querySelectorAll('.project-detail').forEach(detail => {
      detail.classList.add('fade-in');
      this.observer.observe(detail);
    });

    // Observe section titles
    document.querySelectorAll('.section-title').forEach(title => {
      title.classList.add('fade-in');
      this.observer.observe(title);
    });
  }

  animateElement(element) {
    element.classList.add('visible');
    
    // Add staggered animation for child elements
    const children = element.querySelectorAll('.challenge-item, .feature-item, .metric-card');
    children.forEach((child, index) => {
      setTimeout(() => {
        child.style.opacity = '0';
        child.style.transform = 'translateY(20px)';
        child.style.transition = 'all 0.4s ease-out';
        
        requestAnimationFrame(() => {
          child.style.opacity = '1';
          child.style.transform = 'translateY(0)';
        });
      }, index * 100);
    });
  }

  triggerPageAnimations(pageId) {
    const page = document.getElementById(`${pageId}-page`);
    const elements = page.querySelectorAll('.fade-in:not(.visible)');
    
    elements.forEach((element, index) => {
      setTimeout(() => {
        this.animateElement(element);
      }, index * 200);
    });
  }
}

class CounterAnimationManager {
  constructor() {
    this.counters = [];
    this.hasAnimated = false;
  }

  init() {
    this.setupCounters();
  }

  setupCounters() {
    // Setup counters for overview page
    document.querySelectorAll('.stat-number').forEach(counter => {
      const targetValue = parseInt(counter.textContent);
      this.counters.push({
        element: counter,
        target: targetValue,
        current: 0
      });
    });

    // Setup counters for details page
    document.querySelectorAll('.metric-value').forEach(counter => {
      const targetValue = parseInt(counter.dataset.value);
      this.counters.push({
        element: counter,
        target: targetValue,
        current: 0
      });
    });
  }

  animateCounters() {
    if (this.hasAnimated) return;
    
    this.counters.forEach((counter, index) => {
      setTimeout(() => {
        this.animateCounter(counter);
      }, index * 200);
    });
    
    this.hasAnimated = true;
  }

  animateCounter(counter) {
    const duration = 2000;
    const startTime = performance.now();
    const startValue = counter.current;
    const endValue = counter.target;

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Use easing function for smooth animation
      const easedProgress = this.easeOutQuart(progress);
      const currentValue = Math.floor(startValue + (endValue - startValue) * easedProgress);
      
      counter.element.textContent = currentValue;
      counter.current = currentValue;

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Handle special cases for final values
        if (counter.element.dataset.value === '100') {
          counter.element.textContent = '100%';
        } else if (counter.target === 24) {
          counter.element.textContent = '24';
        } else if (counter.target === 4) {
          counter.element.textContent = '3-4';
        }
      }
    };

    requestAnimationFrame(animate);
  }

  easeOutQuart(t) {
    return 1 - Math.pow(1 - t, 4);
  }
}

class InteractiveEffects {
  constructor() {
    this.init();
  }

  init() {
    this.setupHoverEffects();
    this.setupClickEffects();
  }

  setupHoverEffects() {
    // Enhanced hover effects for project cards
    document.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('mouseenter', (e) => {
        this.createRippleEffect(e.target, e);
      });

      card.addEventListener('mouseleave', (e) => {
        this.removeRippleEffect(e.target);
      });
    });

    // Button hover effects
    document.querySelectorAll('.btn--primary').forEach(button => {
      button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-2px) scale(1.02)';
      });

      button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0) scale(1)';
      });
    });
  }

  setupClickEffects() {
    // Click feedback for all interactive elements
    document.querySelectorAll('button, .project-card, .nav-btn').forEach(element => {
      element.addEventListener('click', (e) => {
        this.createClickFeedback(e.target, e);
      });
    });
  }

  createRippleEffect(element, event) {
    const rect = element.getBoundingClientRect();
    const ripple = document.createElement('div');
    
    ripple.className = 'ripple-effect';
    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 107, 53, 0.1);
      pointer-events: none;
      transform: scale(0);
      animation: ripple 0.6s ease-out;
      left: ${event.clientX - rect.left}px;
      top: ${event.clientY - rect.top}px;
      width: 100px;
      height: 100px;
      margin-left: -50px;
      margin-top: -50px;
    `;

    element.style.position = 'relative';
    element.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  }

  removeRippleEffect(element) {
    const ripples = element.querySelectorAll('.ripple-effect');
    ripples.forEach(ripple => ripple.remove());
  }

  createClickFeedback(element, event) {
    element.style.transform = 'scale(0.98)';
    
    setTimeout(() => {
      element.style.transform = '';
    }, 150);
  }
}

// Performance monitoring
class PerformanceMonitor {
  constructor() {
    this.metrics = {
      pageLoadTime: 0,
      animationFrameTime: 0,
      interactionLatency: 0
    };
    
    this.init();
  }

  init() {
    this.measurePageLoad();
    this.monitorAnimationPerformance();
  }

  measurePageLoad() {
    window.addEventListener('load', () => {
      this.metrics.pageLoadTime = performance.now();
      console.log(`Page loaded in ${this.metrics.pageLoadTime.toFixed(2)}ms`);
    });
  }

  monitorAnimationPerformance() {
    let frameCount = 0;
    let lastTime = performance.now();

    const measureFrame = (currentTime) => {
      frameCount++;
      
      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        console.log(`Animation FPS: ${fps}`);
        
        frameCount = 0;
        lastTime = currentTime;
      }
      
      requestAnimationFrame(measureFrame);
    };

    requestAnimationFrame(measureFrame);
  }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  // Add CSS for ripple animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
    
    .metric-value {
      transition: all 0.3s ease-out;
    }
    
    .challenge-item, .feature-item {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);

  // Initialize all components
  const app = new AutomationPresentation();
  const effects = new InteractiveEffects();
  const monitor = new PerformanceMonitor();

  // Add smooth scrolling for better UX
  document.documentElement.style.scrollBehavior = 'smooth';

  // Keyboard navigation support
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      const currentPage = app.currentPage;
      const targetPage = currentPage === 'overview' ? 'details' : 'overview';
      app.navigateToPage(targetPage);
    }
  });

  console.log('Automation Solutions Presentation loaded successfully!');
});
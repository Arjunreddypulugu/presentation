// Modern ES6+ JavaScript for MRF Audit Presentation

// Audit data from the internship project
const auditData = {
  "OCC_367_223": {
    "category": "OCC (367-223)",
    "items": {
      "obb1": 16.89,
      "obb2": 15.26, 
      "onp1": 13.62,
      "onp2": 12.43,
      "onp3": 17.49,
      "occ": 268.223,
      "office paper": 23.13,
      "other": 0.51
    }
  },
  "OFFICE_PAPER_325_239": {
    "category": "OFFICE PAPER (325-239)",
    "items": {
      "office paper": 562.497,
      "onp": 13.59,
      "occ": 3.92,
      "obb": 3.72,
      "other": 0.46
    }
  },
  "ONP_442_5_239": {
    "category": "ONP (442.5-239)", 
    "items": {
      "onp": 420.239,
      "obb": 15.75,
      "office paper": 1.89,
      "occ": 4.99
    }
  },
  "RESIDUE_679_497": {
    "category": "RESIDUE (679-497)",
    "items": {
      "residue": 182.0
    }
  }
};

// Main Application Class
class MRFPresentationApp {
  constructor() {
    this.currentPage = 'overview';
    this.animationManager = new ScrollAnimationManager();
    this.tableManager = new AuditTableManager();
    this.chartManager = new ChartManager();
    this.init();
  }

  init() {
    this.setupNavigation();
    this.setupScrollAnimations();
    this.tableManager.init();
    this.chartManager.init();
  }

  setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');

    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetPage = link.dataset.page;
        this.navigateToPage(targetPage, navLinks, pages);
      });
    });
  }

  navigateToPage(targetPage, navLinks, pages) {
    // Update active nav link
    navLinks.forEach(link => link.classList.remove('active'));
    document.querySelector(`[data-page="${targetPage}"]`).classList.add('active');

    // Switch pages with smooth transition
    pages.forEach(page => {
      page.classList.remove('active');
      if ((targetPage === 'overview' && page.id === 'overview-page') ||
          (targetPage === 'audit' && page.id === 'audit-page')) {
        setTimeout(() => {
          page.classList.add('active');
          this.animationManager.observeElements();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 100);
      }
    });

    this.currentPage = targetPage;
  }

  setupScrollAnimations() {
    this.animationManager.init();
  }
}

// Scroll Animation Manager Class
class ScrollAnimationManager {
  constructor() {
    this.observer = null;
    this.options = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
  }

  init() {
    if ('IntersectionObserver' in window) {
      this.observer = new IntersectionObserver(
        this.handleIntersection.bind(this),
        this.options
      );
      this.observeElements();
    }
  }

  observeElements() {
    const animatedElements = document.querySelectorAll('[data-animate]');
    animatedElements.forEach(element => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(30px)';
      this.observer?.observe(element);
    });
  }

  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const animationType = element.dataset.animate;
        
        requestAnimationFrame(() => {
          element.style.transition = 'all 0.6s ease';
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
          
          switch (animationType) {
            case 'slide-up':
              element.classList.add('animate-slide-up');
              break;
            case 'fade-in':
              element.classList.add('animate-fade-in');
              break;
            case 'scale-in':
              element.classList.add('animate-scale-in');
              break;
          }
        });
        
        this.observer?.unobserve(element);
      }
    });
  }
}

// Audit Table Manager Class
class AuditTableManager {
  constructor() {
    this.currentFilter = 'all';
    this.tableData = this.processAuditData();
  }

  init() {
    this.renderTable();
    this.setupFilters();
  }

  processAuditData() {
    const processed = [];
    
    Object.entries(auditData).forEach(([key, categoryData]) => {
      const categoryName = categoryData.category;
      const categoryKey = key.replace('_', '').toLowerCase();
      
      Object.entries(categoryData.items).forEach(([itemName, weight]) => {
        const totalWeight = Object.values(categoryData.items).reduce((sum, w) => sum + w, 0);
        const percentage = totalWeight > 0 ? ((weight / totalWeight) * 100).toFixed(1) : '0.0';
        
        processed.push({
          category: categoryName,
          categoryKey: categoryKey,
          material: itemName,
          weight: weight.toFixed(2),
          percentage: percentage
        });
      });
    });
    
    return processed;
  }

  renderTable(filterCategory = 'all') {
    const tableBody = document.getElementById('tableBody');
    if (!tableBody) return;

    const filteredData = filterCategory === 'all' 
      ? this.tableData 
      : this.tableData.filter(item => {
          switch (filterCategory) {
            case 'OCC': return item.categoryKey.includes('occ');
            case 'OFFICE_PAPER': return item.categoryKey.includes('officepaper');
            case 'ONP': return item.categoryKey.includes('onp');
            case 'RESIDUE': return item.categoryKey.includes('residue');
            default: return true;
          }
        });

    tableBody.innerHTML = filteredData.map(item => `
      <tr class="category-${item.categoryKey}" data-category="${item.categoryKey}">
        <td><strong>${item.category}</strong></td>
        <td>${item.material}</td>
        <td>${item.weight} kg</td>
        <td>${item.percentage}%</td>
      </tr>
    `).join('');

    // Add hover animations
    const rows = tableBody.querySelectorAll('tr');
    rows.forEach(row => {
      row.addEventListener('mouseenter', () => {
        row.style.transform = 'scale(1.02)';
        row.style.transition = 'transform 0.2s ease';
      });
      
      row.addEventListener('mouseleave', () => {
        row.style.transform = 'scale(1)';
      });
    });
  }

  setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Filter table
        const category = button.dataset.category;
        this.currentFilter = category;
        this.renderTable(category);
        
        // Animate filter change
        const table = document.querySelector('.data-table');
        if (table) {
          table.style.opacity = '0.5';
          setTimeout(() => {
            table.style.opacity = '1';
          }, 200);
        }
      });
    });
  }
}

// Chart Manager Class
class ChartManager {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.chartData = this.processChartData();
  }

  init() {
    this.canvas = document.getElementById('dataChart');
    if (this.canvas) {
      this.ctx = this.canvas.getContext('2d');
      this.setupCanvas();
      this.renderChart();
    }
  }

  setupCanvas() {
    const container = this.canvas.parentElement;
    const containerWidth = container.offsetWidth - 40; // padding
    this.canvas.width = containerWidth;
    this.canvas.height = 400;
    this.canvas.style.width = containerWidth + 'px';
    this.canvas.style.height = '400px';
  }

  processChartData() {
    const categories = [];
    const weights = [];
    const colors = ['#2C5282', '#38A169', '#ED8936', '#4A5568'];
    
    Object.entries(auditData).forEach(([key, categoryData], index) => {
      const totalWeight = Object.values(categoryData.items).reduce((sum, weight) => sum + weight, 0);
      categories.push(categoryData.category.split(' ')[0]);
      weights.push(totalWeight);
    });
    
    return { categories, weights, colors };
  }

  renderChart() {
    if (!this.ctx) return;

    const { categories, weights, colors } = this.chartData;
    const maxWeight = Math.max(...weights);
    const canvasWidth = this.canvas.width;
    const canvasHeight = this.canvas.height;
    const chartHeight = canvasHeight - 100;
    const chartWidth = canvasWidth - 100;
    const barWidth = chartWidth / categories.length - 20;
    
    // Clear canvas
    this.ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    
    // Set font
    this.ctx.font = '14px var(--font-family-base)';
    this.ctx.textAlign = 'center';
    
    // Draw bars
    categories.forEach((category, index) => {
      const barHeight = (weights[index] / maxWeight) * chartHeight;
      const x = 50 + index * (barWidth + 20);
      const y = canvasHeight - 50 - barHeight;
      
      // Draw bar with gradient
      const gradient = this.ctx.createLinearGradient(0, y, 0, y + barHeight);
      gradient.addColorStop(0, colors[index]);
      gradient.addColorStop(1, colors[index] + '80');
      
      this.ctx.fillStyle = gradient;
      this.ctx.fillRect(x, y, barWidth, barHeight);
      
      // Draw border
      this.ctx.strokeStyle = colors[index];
      this.ctx.lineWidth = 2;
      this.ctx.strokeRect(x, y, barWidth, barHeight);
      
      // Draw category label
      this.ctx.fillStyle = '#2D3748';
      this.ctx.fillText(category, x + barWidth / 2, canvasHeight - 25);
      
      // Draw weight label
      this.ctx.fillStyle = '#4A5568';
      this.ctx.font = '12px var(--font-family-base)';
      this.ctx.fillText(`${weights[index].toFixed(1)} kg`, x + barWidth / 2, y - 10);
      this.ctx.font = '14px var(--font-family-base)';
    });
    
    // Draw title
    this.ctx.fillStyle = '#2C5282';
    this.ctx.font = 'bold 16px var(--font-family-base)';
    this.ctx.fillText('Material Weights by Category', canvasWidth / 2, 30);
  }
}

// Utility Functions
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

// Enhanced scroll performance
const optimizeScrollPerformance = () => {
  let ticking = false;
  
  const updateScrollPosition = () => {
    const scrolled = window.pageYOffset;
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
      if (scrolled > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
      } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
      }
    }
    
    ticking = false;
  };
  
  const requestTick = () => {
    if (!ticking) {
      requestAnimationFrame(updateScrollPosition);
      ticking = true;
    }
  };
  
  window.addEventListener('scroll', requestTick, { passive: true });
};

// Performance monitoring
const monitorPerformance = () => {
  if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.entryType === 'measure') {
          console.log(`Performance: ${entry.name} took ${entry.duration.toFixed(2)}ms`);
        }
      });
    });
    
    observer.observe({ entryTypes: ['measure'] });
  }
};

// Responsive chart handling
const handleResize = debounce(() => {
  const app = window.mrfApp;
  if (app && app.chartManager) {
    app.chartManager.setupCanvas();
    app.chartManager.renderChart();
  }
}, 250);

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  // Performance monitoring
  performance.mark('app-start');
  
  // Initialize main application
  window.mrfApp = new MRFPresentationApp();
  
  // Setup performance optimizations
  optimizeScrollPerformance();
  monitorPerformance();
  
  // Handle window resize
  window.addEventListener('resize', handleResize, { passive: true });
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // Add loading state management
  const handleLoad = () => {
    document.body.classList.add('loaded');
    performance.mark('app-loaded');
    performance.measure('app-load-time', 'app-start', 'app-loaded');
  };
  
  if (document.readyState === 'loading') {
    window.addEventListener('load', handleLoad);
  } else {
    handleLoad();
  }
  
  // Feature detection and progressive enhancement
  const features = {
    intersectionObserver: 'IntersectionObserver' in window,
    performanceObserver: 'PerformanceObserver' in window,
    smoothScroll: 'scrollBehavior' in document.documentElement.style
  };
  
  console.log('Browser features:', features);
  
  // Add keyboard navigation support
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      // Reset any active states
      document.querySelectorAll('.filter-btn.active').forEach(btn => {
        if (btn.dataset.category !== 'all') {
          document.querySelector('[data-category="all"]').click();
        }
      });
    }
  });
});
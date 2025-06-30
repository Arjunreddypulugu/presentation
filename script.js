// Presentation data structure
const presentations = {
    finished: {
        title: "Finished Projects",
        slides: [
            {
                title: "G drive organization and AMI updation",
                content: `
                  <div class="project-soft-slide">
                    <div class="project-soft-cards-row">
                      <div class="soft-card animated-fadein-delay1">
                        <div class="soft-card-title">What</div>
                        <div class="soft-card-content">To organise folders for each customer in the G-drive and to update AMI with their respective machine data.</div>
                      </div>
                      <div class="soft-card animated-fadein-delay2">
                        <div class="soft-card-title">Why</div>
                        <div class="soft-card-content">We update the AMI to establish a single source of truth—a consolidated history of all machines sold to every customer. The organized G-drive structure empowers our service technicians to quickly navigate to the right folders and files, streamlining troubleshooting and support.</div>
                      </div>
                    </div>
                    <div class="project-soft-actions animated-fadein-delay3">
                      <button class="pill-btn-soft" id="open-customers-modal">Customers</button>
                      <button class="pill-btn-soft" id="open-tasks-modal">Tasks</button>
                    </div>
                    <div class="project-soft-carousel animated-fadein-delay4">
                      <div class="carousel-flow-indicator" id="carousel-flow-indicator"></div>
                      <div class="carousel-main-row">
                        <button class="carousel-arrow-soft" id="carousel-prev">&#8592;</button>
                        <img id="carousel-img-soft" class="carousel-img-soft" src="assets/folder1.png" alt="Folder">
                        <button class="carousel-arrow-soft" id="carousel-next">&#8594;</button>
                      </div>
                      <div class="carousel-steps-soft" id="carousel-steps"></div>
                    </div>
                    <div class="project-soft-outcome animated-fadein-delay5">
                      <div class="soft-outcome-card">Outcome: <span class="outcome-placeholder">(To be added)</span></div>
                    </div>
                    <div class="soft-modal" id="customers-modal">
                      <div class="soft-modal-content">
                        <div class="modal-header">Customers <span class="modal-close" id="close-customers-modal">&times;</span></div>
                        <ul class="modal-list">
                          <li>WM Mesquite Creek</li>
                          <li>GFL Environmental Toronto</li>
                          <li>GFL Environmental Harrisonville</li>
                          <li>GFL Environmental Huron</li>
                          <li>WM Brevard County</li>
                          <li>Republic Services Peabody</li>
                          <li>Republic Services North Highland</li>
                          <li>Waste Connections Mckinney</li>
                          <li>Waste Connections Plainfield MRF</li>
                          <li>Colgate Paper Stock</li>
                        </ul>
                      </div>
                    </div>
                    <div class="soft-modal" id="tasks-modal">
                      <div class="soft-modal-content">
                        <div class="modal-header">Tasks for each Customer <span class="modal-close" id="close-tasks-modal">&times;</span></div>
                        <ul class="modal-list">
                          <li>Create folders for each machine in G-drive</li>
                          <li>Move Drawings</li>
                          <li>Move manuals</li>
                          <li>Extract Drawings from manuals</li>
                          <li>Move the pictures (Name plates and Motor tags) to the right machine folders</li>
                          <li>Update AMI for each Machine</li>
                          <li>Create Spare Parts list</li>
                        </ul>
                      </div>
                    </div>
                    <div class="soft-modal-bg" id="modal-blur-bg"></div>
                  </div>
                `
            },
            {
                title: "Automated Ganttic Data Back-up and Integration system",
                content: `
                  <div class="ganttic-scroll-slide" style="background:#fff;max-width:1100px;margin:2rem auto 0 auto;padding:2.5rem 1.5rem 2.5rem 1.5rem;border-radius:24px;box-shadow:0 8px 32px rgba(37,99,235,0.07);">
                    <!-- Top Section: Subtitle, 3 Cards -->
                    <div style="text-align:center;color:#64748b;font-size:1.15rem;margin-bottom:2.2rem;">Business Request from <b style='color:#f59e42;font-weight:600;'>Daksh (Project Manager)</b></div>
                    <div style="display:flex;gap:2rem;justify-content:center;flex-wrap:wrap;margin-bottom:2.5rem;">
                      <div style="background:#f4f8fb;border-radius:16px;box-shadow:0 2px 8px rgba(37,99,235,0.07);padding:1.2rem 1.5rem;min-width:220px;max-width:320px;flex:1 1 220px;display:flex;flex-direction:column;align-items:center;min-height:160px;border:2px solid #e0e7ef;">
                        <div style="font-size:2.1rem;margin-bottom:0.5rem;color:#f59e42;">⚠️</div>
                        <div style="color:#f59e42;font-weight:700;font-size:1.1rem;margin-bottom:0.5rem;">Reliability Crisis</div>
                        <div style="color:#334155;font-size:1rem;text-align:center;">Microsoft Power Automate solution was unreliable due to frequent updates and pagination limits</div>
                        <div style="margin-top:1rem;color:#fff;background:#f59e42;border-radius:8px;padding:0.2rem 0.8rem;font-size:0.98rem;font-weight:600;opacity:0.95;">70% Success Rate</div>
                      </div>
                      <div style="background:#f4f8fb;border-radius:16px;box-shadow:0 2px 8px rgba(37,99,235,0.07);padding:1.2rem 1.5rem;min-width:220px;max-width:320px;flex:1 1 220px;display:flex;flex-direction:column;align-items:center;min-height:160px;border:2px solid #e0e7ef;">
                        <div style="font-size:2.1rem;margin-bottom:0.5rem;color:#f59e42;">🔒</div>
                        <div style="color:#f59e42;font-weight:700;font-size:1.1rem;margin-bottom:0.5rem;">Risk Management</div>
                        <div style="color:#334155;font-size:1rem;text-align:center;">Critical resource and task planning data that drives operations needed protection</div>
                        <div style="margin-top:1rem;color:#fff;background:#f59e42;border-radius:8px;padding:0.2rem 0.8rem;font-size:0.98rem;font-weight:600;opacity:0.95;">Mission Critical Data</div>
                      </div>
                      <div style="background:#f4f8fb;border-radius:16px;box-shadow:0 2px 8px rgba(37,99,235,0.07);padding:1.2rem 1.5rem;min-width:220px;max-width:320px;flex:1 1 220px;display:flex;flex-direction:column;align-items:center;min-height:160px;border:2px solid #e0e7ef;">
                        <div style="font-size:2.1rem;margin-bottom:0.5rem;color:#f59e42;">📊</div>
                        <div style="color:#f59e42;font-weight:700;font-size:1.1rem;margin-bottom:0.5rem;">Visualization Problems</div>
                        <div style="color:#334155;font-size:1rem;text-align:center;">Ganttic's built-in visualization capabilities were cluttered and inadequate</div>
                        <div style="margin-top:1rem;color:#fff;background:#f59e42;border-radius:8px;padding:0.2rem 0.8rem;font-size:0.98rem;font-weight:600;opacity:0.95;">Manual Intervention Required</div>
                      </div>
                    </div>

                    <!-- Solution Section -->
                    <h2 style="color:#38bdf8;font-size:1.5rem;font-weight:800;margin-top:2.5rem;margin-bottom:0.5rem;text-align:center;">The Solution</h2>
                    <div style="text-align:center;color:#64748b;font-size:1.08rem;margin-bottom:1.5rem;">Azure Functions Approach: Developed and deployed automated Python scripts on Azure Functions to create a reliable, scalable backup system.</div>
                    <img src="assets/gantticArchitecture.png" alt="System Architecture" style="width:100%;max-width:520px;display:block;margin:2rem auto 2.5rem auto;border-radius:14px;box-shadow:0 2px 12px rgba(37,99,235,0.10);background:#f4f8fb;">

                    <!-- Stats Section -->
                    <h2 style="color:#64748b;font-size:1.5rem;font-weight:800;margin-top:2.5rem;margin-bottom:0.5rem;text-align:center;">Technical Implementation</h2>
                    <div style="display:flex;gap:2rem;justify-content:center;flex-wrap:wrap;margin-bottom:2.5rem;">
                      <div style="background:#eaf1fb;border-radius:16px;box-shadow:0 2px 8px rgba(37,99,235,0.07);padding:1.5rem 2rem;min-width:180px;max-width:260px;flex:1 1 180px;display:flex;flex-direction:column;align-items:center;min-height:120px;border:2px solid #bae6fd;">
                        <div style="font-size:2.2rem;color:#22c55e;font-weight:800;">1500</div>
                        <div style="color:#334155;font-size:1.08rem;font-weight:600;">Historical Data Rows</div>
                        <div style="color:#64748b;font-size:0.98rem;">Past 3 months</div>
                      </div>
                      <div style="background:#eaf1fb;border-radius:16px;box-shadow:0 2px 8px rgba(37,99,235,0.07);padding:1.5rem 2rem;min-width:180px;max-width:260px;flex:1 1 180px;display:flex;flex-direction:column;align-items:center;min-height:120px;border:2px solid #bae6fd;">
                        <div style="font-size:2.2rem;color:#22c55e;font-weight:800;">800</div>
                        <div style="color:#334155;font-size:1.08rem;font-weight:600;">Future Planning Rows</div>
                        <div style="color:#64748b;font-size:0.98rem;">Next 3 months</div>
                      </div>
                      <div style="background:#eaf1fb;border-radius:16px;box-shadow:0 2px 8px rgba(37,99,235,0.07);padding:1.5rem 2rem;min-width:180px;max-width:260px;flex:1 1 180px;display:flex;flex-direction:column;align-items:center;min-height:120px;border:2px solid #bae6fd;">
                        <div style="font-size:2.2rem;color:#22c55e;font-weight:800;">100</div>
                        <div style="color:#334155;font-size:1.08rem;font-weight:600;">Success Rate %</div>
                        <div style="color:#64748b;font-size:0.98rem;">Zero failures</div>
                      </div>
                    </div>

                    <!-- Results Section -->
                    <h2 style="background: linear-gradient(90deg, #38bdf8 40%, #22d3ee 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent;font-size:1.5rem;font-weight:800;margin-top:2.5rem;margin-bottom:0.5rem;text-align:center;">Results & Outcome</h2>
                    <div style="display:flex;gap:2rem;justify-content:center;flex-wrap:wrap;margin-bottom:2.5rem;">
                      <div style="background:#f4f8fb;border-radius:16px;box-shadow:0 2px 8px rgba(37,99,235,0.07);padding:1.2rem 1.5rem;min-width:180px;max-width:260px;flex:1 1 180px;display:flex;flex-direction:column;align-items:center;min-height:140px;border:2px solid #e0e7ef;">
                        <div style="font-size:2.1rem;margin-bottom:0.5rem;">🔐</div>
                        <div style="color:#38bdf8;font-weight:700;font-size:1.1rem;margin-bottom:0.5rem;">Enhanced Data Security</div>
                        <div style="color:#334155;font-size:1rem;text-align:center;">Created reliable backup system for mission-critical scheduling data with 100% uptime.</div>
                      </div>
                      <div style="background:#f4f8fb;border-radius:16px;box-shadow:0 2px 8px rgba(37,99,235,0.07);padding:1.2rem 1.5rem;min-width:180px;max-width:260px;flex:1 1 180px;display:flex;flex-direction:column;align-items:center;min-height:140px;border:2px solid #e0e7ef;">
                        <div style="font-size:2.1rem;margin-bottom:0.5rem;">⚡</div>
                        <div style="color:#38bdf8;font-weight:700;font-size:1.1rem;margin-bottom:0.5rem;">Process Improvement</div>
                        <div style="color:#334155;font-size:1rem;text-align:center;">Replaced unreliable Power Automate solution with stable, automated system.</div>
                      </div>
                      <div style="background:#f4f8fb;border-radius:16px;box-shadow:0 2px 8px rgba(37,99,235,0.07);padding:1.2rem 1.5rem;min-width:180px;max-width:260px;flex:1 1 180px;display:flex;flex-direction:column;align-items:center;min-height:140px;border:2px solid #e0e7ef;">
                        <div style="font-size:2.1rem;margin-bottom:0.5rem;">🚀</div>
                        <div style="color:#38bdf8;font-weight:700;font-size:1.1rem;margin-bottom:0.5rem;">Foundation for Growth</div>
                        <div style="color:#334155;font-size:1rem;text-align:center;">Established data infrastructure for upcoming visualization dashboards.</div>
                      </div>
                      <div style="background:#f4f8fb;border-radius:16px;box-shadow:0 2px 8px rgba(37,99,235,0.07);padding:1.2rem 1.5rem;min-width:180px;max-width:260px;flex:1 1 180px;display:flex;flex-direction:column;align-items:center;min-height:140px;border:2px solid #e0e7ef;">
                        <div style="font-size:2.1rem;margin-bottom:0.5rem;">👥</div>
                        <div style="color:#38bdf8;font-weight:700;font-size:1.1rem;margin-bottom:0.5rem;">Stakeholder Satisfaction</div>
                        <div style="color:#334155;font-size:1rem;text-align:center;">Streamlined data management process and saved team time with positive feedback.</div>
                      </div>
                    </div>
                    <div style="margin:2rem 0 2.5rem 0;background:#eaf1fb;border-radius:14px;padding:1.5rem 2rem;color:#38bdf8;font-size:1.1rem;font-style:italic;box-shadow:0 2px 8px rgba(37,99,235,0.07);text-align:center;max-width:700px;margin-left:auto;margin-right:auto;">
                      "The new automated backup system has transformed our data management process. We now have complete confidence in our data protection and the time savings are significant."<br><span style="font-size:1rem;font-style:normal;color:#64748b;">— Daksh, Project Manager</span>
                    </div>

                    <!-- Comparison Section -->
                    <img src="assets/gantticVSpower.png" alt="Ganttic vs Power Automate" style="width:100%;max-width:600px;display:block;margin:2.5rem auto 0 auto;border-radius:18px;box-shadow:0 4px 24px rgba(37,99,235,0.10);background:#f4f8fb;">
                  </div>
                `
            },
            {
                title: "Web-based Timeclock Application",
                content: `
                  <div id="timeclock-slide-root">
                    <!-- Navigation -->
                    <nav class="navbar">
                        <div class="nav-container">
                            <div class="nav-logo">Timeclock App</div>
                            <ul class="nav-menu">
                                <li><a href="#hero" class="nav-link">Overview</a></li>
                                <li><a href="#challenge" class="nav-link">Challenge</a></li>
                                <li><a href="#solution" class="nav-link">Solution</a></li>
                                <li><a href="#workflow" class="nav-link">How It Works</a></li>
                                <li><a href="#results" class="nav-link">Results</a></li>
                                <li><a href="#technical" class="nav-link">Technical</a></li>
                            </ul>
                        </div>
                    </nav>

                    <!-- Hero Section -->
                    <section id="hero" class="hero-section">
                        <div class="container">
                            <div class="hero-content">
                                <h1 class="hero-title">Web-based Timeclock Application</h1>
                                <p class="hero-subtitle">Dual verification system with photo capture and GPS validation for subcontractor workforce management</p>
                                <div class="hero-stats">
                                    <div class="stat-item">
                                        <div class="stat-number" data-target="100">0</div>
                                        <div class="stat-label">Subcontractors</div>
                                    </div>
                                    <div class="stat-item">
                                        <div class="stat-number" data-target="450">0</div>
                                        <div class="stat-label">Projects</div>
                                    </div>
                                    <div class="stat-item">
                                        <div class="stat-number" data-target="333">0</div>
                                        <div class="stat-label">Hours Saved Weekly</div>
                                    </div>
                                </div>
                                <div class="hero-tech">
                                    <div class="tech-badge">JavaScript</div>
                                    <div class="tech-badge">TypeScript</div>
                                    <div class="tech-badge">SQL Server</div>
                                    <div class="tech-badge">Azure</div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <!-- Challenge Section -->
                    <section id="challenge" class="challenge-section">
                        <div class="container">
                            <h2 class="section-title">The Challenge</h2>
                            <div class="challenges-grid">
                                <div class="challenge-card">
                                    <div class="challenge-icon">🛡️</div>
                                    <h3>Trust & Accountability</h3>
                                    <p>Eliminated concerns about timesheet accuracy and proxy clocking</p>
                                </div>
                                <div class="challenge-card">
                                    <div class="challenge-icon">⚡</div>
                                    <h3>Process Efficiency</h3>
                                    <p>Removed manual timesheet collection and transmission bottleneck</p>
                                </div>
                                <div class="challenge-card">
                                    <div class="challenge-icon">📈</div>
                                    <h3>Scalability Challenge</h3>
                                    <p>Floating workforce couldn't access internal Power Apps or receive individual credentials</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <!-- Solution Section -->
                    <section id="solution" class="solution-section">
                        <div class="container">
                            <h2 class="section-title">The Solution</h2>
                            <div class="solution-grid">
                                <div class="solution-card">
                                    <div class="solution-icon">🔗</div>
                                    <h3>Unique Base64 Links</h3>
                                    <p>Generated unique Base64-encoded links for each Project-Subcontractor combination</p>
                                </div>
                                <div class="solution-card">
                                    <div class="solution-icon">📸</div>
                                    <h3>Photo Verification</h3>
                                    <p>Real-time photo capture uploaded to Azure with psychological deterrent effect</p>
                                </div>
                                <div class="solution-card">
                                    <div class="solution-icon">📍</div>
                                    <h3>GPS Location Validation</h3>
                                    <p>0.4km radius verification against existing customer location database</p>
                                </div>
                                <div class="solution-card">
                                    <div class="solution-icon">🗄️</div>
                                    <h3>Database Integration</h3>
                                    <p>Pre-populated immutable Project ID and Subcontractor ID for tracking</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <!-- How It Works Section -->
                    <section id="workflow" class="workflow-section">
                        <div class="container">
                            <h2 class="section-title">How It Works</h2>
                            <div class="workflow-container">
                                <div class="workflow-step" data-step="1">
                                    <div class="step-number">1</div>
                                    <div class="step-content">
                                        <h3>Link Generation</h3>
                                        <p>System generates unique Base64-encoded link for each subcontractor-project combination</p>
                                    </div>
                                </div>
                                <div class="workflow-arrow">→</div>
                                <div class="workflow-step" data-step="2">
                                    <div class="step-number">2</div>
                                    <div class="step-content">
                                        <h3>Access & Photo</h3>
                                        <p>Subcontractor accesses link and captures verification photo</p>
                                    </div>
                                </div>
                                <div class="workflow-arrow">→</div>
                                <div class="workflow-step" data-step="3">
                                    <div class="step-number">3</div>
                                    <div class="step-content">
                                        <h3>GPS Validation</h3>
                                        <p>Real-time location verification within 0.4km radius of project site</p>
                                    </div>
                                </div>
                                <div class="workflow-arrow">→</div>
                                <div class="workflow-step" data-step="4">
                                    <div class="step-number">4</div>
                                    <div class="step-content">
                                        <h3>Data Storage</h3>
                                        <p>Verified timesheet data stored with immutable project and contractor IDs</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <!-- Results Section -->
                    <section id="results" class="results-section">
                        <div class="container">
                            <h2 class="section-title">Results & Impact</h2>
                            <div class="results-grid">
                                <div class="result-card">
                                    <div class="result-metric">100%</div>
                                    <div class="result-label">Trust Restoration</div>
                                    <div class="result-description">Photo and location verification addressed primary pain point</div>
                                </div>
                                <div class="result-card">
                                    <div class="result-metric">333</div>
                                    <div class="result-unit">hrs/week</div>
                                    <div class="result-label">Time Savings</div>
                                    <div class="result-description">Freed up from manual timesheet collection across 200+ projects</div>
                                </div>
                                <div class="result-card">
                                    <div class="result-metric">95%+</div>
                                    <div class="result-label">Accuracy Enhancement</div>
                                    <div class="result-description">Eliminated human error in timesheet transcription</div>
                                </div>
                                <div class="result-card">
                                    <div class="result-metric">100+</div>
                                    <div class="result-unit">reps</div>
                                    <div class="result-label">Operational Efficiency</div>
                                    <div class="result-description">No longer need to manually collect and transmit timesheets</div>
                                </div>
                            </div>
                            <!-- Metrics Chart -->
                            <div class="chart-container">
                                <h3>Key Performance Metrics</h3>
                                <img src="timeclock-presentation/timeclock_metrics.png" alt="Timeclock Application Impact Metrics" class="metrics-chart">
                            </div>
                        </div>
                    </section>

                    <!-- Technical Highlights Section -->
                    <section id="technical" class="technical-section">
                        <div class="container">
                            <h2 class="section-title">Technical Highlights</h2>
                            <div class="technical-content">
                                <div class="technical-features">
                                    <div class="feature-item">
                                        <h3>Development Approach</h3>
                                        <p>Collaborative solution developed through brainstorming sessions with the team</p>
                                    </div>
                                    <div class="feature-item">
                                        <h3>Innovative Solutions</h3>
                                        <p>Unique Base64 link system providing secure, scalable access without individual credentials</p>
                                    </div>
                                    <div class="feature-item">
                                        <h3>Scalability Achievement</h3>
                                        <p>System handles floating workforce across hundreds of concurrent projects</p>
                                    </div>
                                </div>
                                <!-- Development Timeline -->
                                <div class="timeline-container">
                                    <h3>Development Timeline</h3>
                                    <img src="timeclock-presentation/gantt_timeline.png" alt="Development Timeline" class="timeline-chart">
                                </div>
                            </div>
                        </div>
                    </section>

                    <!-- Footer -->
                    <footer class="footer">
                        <div class="container">
                            <p>&copy; 2024 Timeclock Application Project. Built with JavaScript, TypeScript, SQL Server, and Azure.</p>
                        </div>
                    </footer>
                  </div>
                `
            }
        ]
    },
    progress: {
        title: "Projects in Progress",
        slides: [
            {
                title: "Current Project 1",
                content: "Description of ongoing project 1"
            },
            {
                title: "Current Project 2",
                content: "Description of ongoing project 2"
            }
        ]
    },
    future: {
        title: "Future Projects",
        slides: [
            {
                title: "Upcoming Project 1",
                content: "Description of planned project 1"
            },
            {
                title: "Upcoming Project 2",
                content: "Description of planned project 2"
            }
        ]
    }
};

class Presentation {
    constructor() {
        this.currentSection = null;
        this.currentSlideIndex = 0;
        this.currentSlides = [];
        this.mainSlideIndex = 0;
        
        this.initializeNavigation();
        this.initializeAnimations();
        this.initializeScrollEffects();
        this.initializeEventListeners();
    }

    initializeNavigation() {
        // Smooth scrolling for navigation links
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

        // Navigation highlighting
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (window.pageYOffset >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').slice(1) === current) {
                    link.classList.add('active');
                }
            });
        });
    }

    initializeAnimations() {
        // Fade-in animation for elements
        const fadeElements = document.querySelectorAll('.fade-in');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1
        });

        fadeElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            observer.observe(element);
        });

        // Counter animation for statistics
        const stats = document.querySelectorAll('.stat-number');
        stats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const step = target / (duration / 16); // 60fps
            let current = 0;

            const updateCounter = () => {
                current += step;
                if (current < target) {
                    stat.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.textContent = target;
                }
            };

            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    updateCounter();
                    observer.unobserve(stat);
                }
            });

            observer.observe(stat);
        });
    }

    initializeScrollEffects() {
        // Parallax effect for hero section
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                heroSection.style.backgroundPositionY = `${scrolled * 0.5}px`;
            });
        }

        // Sticky navigation
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            window.addEventListener('scroll', () => {
                if (window.pageYOffset > 100) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            });
        }
    }

    initializeEventListeners() {
        // Navigation event listeners
        document.querySelectorAll('.nav-card').forEach(card => {
            card.addEventListener('click', (e) => {
                e.preventDefault();
                const section = card.getAttribute('data-section');
                this.showSection(section);
            });
        });

        // Slide navigation
        document.getElementById('prev-slide')?.addEventListener('click', () => this.prevSlide());
        document.getElementById('next-slide')?.addEventListener('click', () => this.nextSlide());
        document.getElementById('back-to-menu')?.addEventListener('click', () => this.showSection('landing'));
        document.querySelector('.back-to-landing')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.showSection('landing');
        });

        // Main presentation navigation
        document.getElementById('main-prev-slide')?.addEventListener('click', () => this.prevMainSlide());
        document.getElementById('main-next-slide')?.addEventListener('click', () => this.nextMainSlide());
        document.getElementById('main-back-to-menu')?.addEventListener('click', () => {
            document.getElementById('main-presentation').classList.remove('active');
            document.getElementById('landing').classList.add('active');
        });

        // Fullscreen buttons
        document.getElementById('fullscreen')?.addEventListener('click', this.toggleFullscreen);
        document.getElementById('main-fullscreen')?.addEventListener('click', this.toggleFullscreen);
        document.getElementById('landing-fullscreen')?.addEventListener('click', this.toggleFullscreen);

        // Start presentation
        document.getElementById('start-presentation')?.addEventListener('click', () => this.showMainPresentation());

        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeyboardNavigation(e));

        // URL hash handling
        window.addEventListener('hashchange', () => {
            const hash = window.location.hash.slice(1);
            if (hash && presentations[hash]) {
                this.showSection(hash);
            }
        });

        // Popover logic for Customers and Tasks with blur overlay
        const customersBtn = document.getElementById('customers-btn');
        const customersList = document.getElementById('customers-list');
        const tasksBtn = document.getElementById('tasks-btn');
        const tasksList = document.getElementById('tasks-list');
        const customersPopover = document.getElementById('customers-popover');
        const tasksPopover = document.getElementById('tasks-popover');
        const blurBg = document.getElementById('popover-blur-bg');

        function openPopover(popover, list) {
            popover.classList.add('popover-open');
            list.style.display = 'block';
            blurBg.style.display = 'block';
        }
        function closePopover(popover, list) {
            popover.classList.remove('popover-open');
            list.style.display = 'none';
            blurBg.style.display = 'none';
        }
        if (customersBtn && customersList && customersPopover && blurBg) {
            customersBtn.addEventListener('mouseenter', () => openPopover(customersPopover, customersList));
            customersBtn.addEventListener('focus', () => openPopover(customersPopover, customersList));
            customersBtn.addEventListener('mouseleave', () => closePopover(customersPopover, customersList));
            customersBtn.addEventListener('blur', () => closePopover(customersPopover, customersList));
            customersList.addEventListener('mouseenter', () => openPopover(customersPopover, customersList));
            customersList.addEventListener('mouseleave', () => closePopover(customersPopover, customersList));
        }
        if (tasksBtn && tasksList && tasksPopover && blurBg) {
            tasksBtn.addEventListener('mouseenter', () => openPopover(tasksPopover, tasksList));
            tasksBtn.addEventListener('focus', () => openPopover(tasksPopover, tasksList));
            tasksBtn.addEventListener('mouseleave', () => closePopover(tasksPopover, tasksList));
            tasksBtn.addEventListener('blur', () => closePopover(tasksPopover, tasksList));
            tasksList.addEventListener('mouseenter', () => openPopover(tasksPopover, tasksList));
            tasksList.addEventListener('mouseleave', () => closePopover(tasksPopover, tasksList));
        }
        if (blurBg) {
            blurBg.addEventListener('click', () => {
                closePopover(customersPopover, customersList);
                closePopover(tasksPopover, tasksList);
            });
        }
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closePopover(customersPopover, customersList);
                closePopover(tasksPopover, tasksList);
            }
        });
    }

    toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    }

    handleKeyboardNavigation(e) {
        if (document.getElementById('presentation').classList.contains('active')) {
            switch (e.key) {
                case 'ArrowRight':
                    this.nextSlide();
                    break;
                case 'ArrowLeft':
                    this.prevSlide();
                    break;
                case 'Escape':
                    this.showSection('landing');
                    break;
            }
        } else if (document.getElementById('main-presentation').classList.contains('active')) {
            switch (e.key) {
                case 'ArrowRight':
                    this.nextMainSlide();
                    break;
                case 'ArrowLeft':
                    this.prevMainSlide();
                    break;
                case 'Escape':
                    document.getElementById('main-presentation').classList.remove('active');
                    document.getElementById('landing').classList.add('active');
                    break;
            }
        }
    }

    showSection(sectionId) {
        document.getElementById('landing').classList.remove('active');
        document.getElementById('presentation').classList.remove('active');
        document.getElementById('thank-you').classList.remove('active');

    if (sectionId === 'landing') {
            document.getElementById('landing').classList.add('active');
    } else if (sectionId === 'thank-you') {
            document.getElementById('thank-you').classList.add('active');
    } else {
            document.getElementById('presentation').classList.add('active');
            this.loadPresentation(sectionId);
    }
}

    loadPresentation(sectionId) {
        this.currentSection = sectionId;
        this.currentSlideIndex = 0;
        this.currentSlides = presentations[sectionId].slides;
        this.renderSlides();
        this.updateSlideCounter();
}

    renderSlides() {
        const slideContainer = document.querySelector('.slide-container');
        if (!slideContainer) return;

    slideContainer.innerHTML = '';
        this.currentSlides.forEach((slide, index) => {
        const slideElement = document.createElement('div');
            slideElement.className = `slide ${index === this.currentSlideIndex ? 'active' : ''}`;
        slideElement.innerHTML = `
            <h1 class="slide-title">${slide.title}</h1>
            <div class="slide-content">${slide.content}</div>
        `;
        slideContainer.appendChild(slideElement);
    });

        // Initialize slide-specific functionality
    setTimeout(() => {
            if (document.querySelector('.project-soft-slide')) {
                this.setupProjectSoftSlide();
            } else if (document.querySelector('.project-modern-slide')) {
                this.setupProjectModernSlide();
            } else if (document.querySelector('.project-slide-v2')) {
                this.setupProjectSlideV2();
        }
    }, 0);
}

    updateSlideCounter() {
        const slideCounter = document.querySelector('.slide-counter');
        if (slideCounter) {
            slideCounter.textContent = `${this.currentSlideIndex + 1} of ${this.currentSlides.length}`;
}
    }

    goToSlide(index) {
        if (index >= 0 && index < this.currentSlides.length) {
            this.currentSlideIndex = index;
            this.renderSlides();
            this.updateSlideCounter();
    }
}

    nextSlide() {
        if (this.currentSlideIndex < this.currentSlides.length - 1) {
            this.goToSlide(this.currentSlideIndex + 1);
    } else {
            this.showSection('thank-you');
    }
}

    prevSlide() {
        if (this.currentSlideIndex > 0) {
            this.goToSlide(this.currentSlideIndex - 1);
    }
}

    showMainPresentation() {
        document.getElementById('landing').classList.remove('active');
        document.getElementById('main-presentation').classList.add('active');
        this.mainSlideIndex = 0;
        this.renderMainSlide();
        this.updateMainSlideCounter();
}

    renderMainSlide() {
        const mainSlideContainer = document.querySelector('#main-presentation .slide-container');
        if (!mainSlideContainer) return;

  mainSlideContainer.innerHTML = '';
  const slide = document.createElement('div');
  slide.className = 'slide active';
        slide.innerHTML = mainSlides[this.mainSlideIndex].content;
  mainSlideContainer.appendChild(slide);

        if (mainSlides[this.mainSlideIndex].type === 'section-select') {
    mainSlideContainer.querySelectorAll('.main-section-card').forEach(card => {
      card.addEventListener('click', (e) => {
        e.preventDefault();
        const section = card.getAttribute('data-section');
                    this.showSection(section);
      });
    });
  }
}

    updateMainSlideCounter() {
        const mainSlideCounter = document.getElementById('main-slide-counter');
        if (mainSlideCounter) {
            mainSlideCounter.textContent = `${this.mainSlideIndex + 1} of ${mainSlides.length}`;
        }
}

    goToMainSlide(index) {
  if (index >= 0 && index < mainSlides.length) {
            this.mainSlideIndex = index;
            this.renderMainSlide();
            this.updateMainSlideCounter();
  }
}

    nextMainSlide() {
        if (this.mainSlideIndex < mainSlides.length - 1) {
            this.goToMainSlide(this.mainSlideIndex + 1);
  }
}

    prevMainSlide() {
        if (this.mainSlideIndex > 0) {
            this.goToMainSlide(this.mainSlideIndex - 1);
    }
  }

// --- Project Slide Interactivity ---
    setupProjectSlideV2() {
  // Info cards expand/collapse
  document.querySelectorAll('.info-card').forEach(card => {
    const header = card.querySelector('.info-card-header');
    header.addEventListener('click', () => {
      card.classList.toggle('info-card-collapsed');
    });
    // Start collapsed
    card.classList.add('info-card-collapsed');
  });

  // Carousel logic
  const images = Array.from(document.querySelectorAll('.carousel-img'));
  let current = 0;
  function showImage(idx) {
    images.forEach((img, i) => {
      img.classList.toggle('active', i === idx);
    });
  }
  showImage(current);
  document.getElementById('carousel-prev').onclick = () => {
    current = (current - 1 + images.length) % images.length;
    showImage(current);
  };
  document.getElementById('carousel-next').onclick = () => {
    current = (current + 1) % images.length;
    showImage(current);
  };
}

// --- Project Modern Slide Interactivity ---
    setupProjectModernSlide() {
  // Modal logic
  const customersModal = document.getElementById('customers-modal');
  const tasksModal = document.getElementById('tasks-modal');
  document.getElementById('open-customers-modal').onclick = () => customersModal.classList.add('active');
  document.getElementById('open-tasks-modal').onclick = () => tasksModal.classList.add('active');
  document.getElementById('close-customers-modal').onclick = () => customersModal.classList.remove('active');
  document.getElementById('close-tasks-modal').onclick = () => tasksModal.classList.remove('active');
  window.addEventListener('keydown', function escClose(e) {
    if ((customersModal.classList.contains('active') || tasksModal.classList.contains('active')) && e.key === 'Escape') {
      customersModal.classList.remove('active');
      tasksModal.classList.remove('active');
    }
  });

  // Carousel logic
  const images = Array.from(document.querySelectorAll('.carousel-img-modern'));
  let current = 0;
  const steps = document.getElementById('carousel-steps');
  function updateCarousel(idx) {
    images.forEach((img, i) => img.classList.toggle('active', i === idx));
    if (steps) {
      steps.innerHTML = images.map((_, i) => `<span class="carousel-step-dot${i === idx ? ' active' : ''}"></span>`).join('');
    }
  }
  updateCarousel(current);
  document.getElementById('carousel-prev').onclick = () => {
    current = (current - 1 + images.length) % images.length;
    updateCarousel(current);
  };
  document.getElementById('carousel-next').onclick = () => {
    current = (current + 1) % images.length;
    updateCarousel(current);
  };
  if (steps) {
    steps.onclick = (e) => {
      if (e.target.classList.contains('carousel-step-dot')) {
        const idx = Array.from(steps.children).indexOf(e.target);
        if (idx >= 0) {
          current = idx;
          updateCarousel(current);
        }
      }
    };
  }
}

// --- Project Soft Slide Interactivity ---
    setupProjectSoftSlide() {
  // Modal logic with blur/dim
  const customersModal = document.getElementById('customers-modal');
  const tasksModal = document.getElementById('tasks-modal');
  const blurBg = document.getElementById('modal-blur-bg');
  function openModal(modal) {
    modal.classList.add('active');
    blurBg.classList.add('active');
  }
  function closeModal(modal) {
    modal.classList.remove('active');
    blurBg.classList.remove('active');
  }
  document.getElementById('open-customers-modal').onclick = () => openModal(customersModal);
  document.getElementById('open-tasks-modal').onclick = () => openModal(tasksModal);
  document.getElementById('close-customers-modal').onclick = () => closeModal(customersModal);
  document.getElementById('close-tasks-modal').onclick = () => closeModal(tasksModal);
  blurBg.onclick = () => { closeModal(customersModal); closeModal(tasksModal); };
  window.addEventListener('keydown', function escClose(e) {
    if ((customersModal.classList.contains('active') || tasksModal.classList.contains('active')) && e.key === 'Escape') {
      closeModal(customersModal); closeModal(tasksModal);
    }
  });

  // Carousel logic (bulletproof single-image approach)
  const imageList = [
    'assets/folder1.png',
    'assets/folder2.png',
    'assets/folder3.png',
    'assets/folder4.png',
    'assets/folder5.png'
  ];
  let current = 0;
  const imgEl = document.getElementById('carousel-img-soft');
  // DEBUG: Force the image to show the logo
  imgEl.style.display = 'block';
  imgEl.style.opacity = '1';
  imgEl.src = 'assets/logo.png';
  imgEl.alt = 'Logo Test';
  const steps = document.getElementById('carousel-steps');
  const flow = document.getElementById('carousel-flow-indicator');
  // Add a placeholder div for fallback
  let placeholder = document.getElementById('carousel-img-placeholder');
  if (!placeholder) {
    placeholder = document.createElement('div');
    placeholder.id = 'carousel-img-placeholder';
    placeholder.style.display = 'none';
    placeholder.style.width = '100%';
    placeholder.style.height = '100%';
    placeholder.style.alignItems = 'center';
    placeholder.style.justifyContent = 'center';
    placeholder.style.textAlign = 'center';
    placeholder.style.color = '#b91c1c';
    placeholder.style.fontWeight = 'bold';
    placeholder.style.fontSize = '1.2rem';
    placeholder.innerText = 'Image not found';
    imgEl.parentNode.appendChild(placeholder);
  }
  function showPlaceholder(show) {
    imgEl.style.display = show ? 'none' : 'block';
    placeholder.style.display = show ? 'flex' : 'none';
  }
  imgEl.onerror = function() {
    showPlaceholder(true);
  };
  imgEl.onload = function() {
    showPlaceholder(false);
  };
  function updateCarousel(idx) {
    imgEl.src = imageList[idx];
    imgEl.alt = `Folder ${idx+1}`;
    if (steps) {
      steps.innerHTML = imageList.map((_, i) => `<span class=\"carousel-step-dot${i === idx ? ' active' : ''}\"></span>`).join('');
    }
    if (flow) {
      flow.innerHTML = imageList.map((_, i) =>
        `<span class=\"carousel-flow-dot${i === idx ? ' active' : ''}\">${i+1}</span>${i < imageList.length-1 ? '<span class=\"carousel-flow-arrow\">&#8594;</span>' : ''}`
      ).join('');
    }
  }
  updateCarousel(current);
  document.getElementById('carousel-prev').onclick = () => {
    current = (current - 1 + imageList.length) % imageList.length;
    updateCarousel(current);
  };
  document.getElementById('carousel-next').onclick = () => {
    current = (current + 1) % imageList.length;
    updateCarousel(current);
  };
  if (steps) {
    steps.onclick = (e) => {
      if (e.target.classList.contains('carousel-step-dot')) {
        const idx = Array.from(steps.children).indexOf(e.target);
        if (idx >= 0) {
          current = idx;
          updateCarousel(current);
        }
      }
    };
  }
  if (flow) {
    flow.onclick = (e) => {
      if (e.target.classList.contains('carousel-flow-dot')) {
        const idx = Array.from(flow.querySelectorAll('.carousel-flow-dot')).indexOf(e.target);
        if (idx >= 0) {
          current = idx;
          updateCarousel(current);
        }
      }
    };
  }
  // Remove the test button if it exists
  const testBtn = document.getElementById('test-image-btn');
  if (testBtn) testBtn.remove();
}

// --- Ganttic Showcase Multi-Section Carousel ---
    setupGantticShowcaseSlide() {
  const cards = [
    // 1. Hero/Summary
    {
      content: `
        <h2>Automated Ganttic Data Back-up and Integration System</h2>
        <p style='font-size:1.15rem; color:#1e293b; margin-bottom:1.5rem;'>Transforming unreliable data backup processes into a robust, automated system that protects mission-critical scheduling data.</p>
        <div class='showcase-stats'>
          <div class='showcase-stat'><div class='showcase-stat-number'>2,300+</div><div class='stat-label'>Daily Rows Backed Up</div></div>
          <div class='showcase-stat'><div class='showcase-stat-number'>100%</div><div class='stat-label'>Success Rate</div></div>
          <div class='showcase-stat'><div class='showcase-stat-number'>0%</div><div class='stat-label'>Manual Intervention</div></div>
        </div>
      `
    },
    // 2. Challenge
    {
      content: `
        <h3>The Challenge</h3>
        <div class='showcase-issues'>
          <div class='showcase-issue-card'>
            <div class='showcase-issue-icon'>⚠️</div>
            <h4>Reliability Crisis</h4>
            <p>Power Automate was unreliable due to updates and pagination limits</p>
            <div class='issue-stat'>70% Success Rate</div>
          </div>
          <div class='showcase-issue-card'>
            <div class='showcase-issue-icon'>🔒</div>
            <h4>Risk Management</h4>
            <p>Critical resource and task planning data needed protection</p>
            <div class='issue-stat'>Mission Critical Data</div>
          </div>
          <div class='showcase-issue-card'>
            <div class='showcase-issue-icon'>📊</div>
            <h4>Visualization Problems</h4>
            <p>Ganttic's built-in visuals were cluttered and inadequate</p>
            <div class='issue-stat'>Manual Intervention Required</div>
          </div>
        </div>
      `
    },
    // 3. Solution (with architecture image)
    {
      content: `
        <h3>The Solution</h3>
        <p style='font-size:1.08rem; color:#1e293b;'>Automated Python scripts on Azure Functions create a reliable, scalable backup system. Data is structured for both historical analysis and future planning.</p>
        <img src='assets/gantticArchitecture.png' alt='System Architecture' class='showcase-img'>
        <div class='showcase-solution-cards'>
          <div class='showcase-solution-card'>
            <div class='showcase-solution-icon'>🔄</div>
            <h4>Script 1: Data Extraction</h4>
            <p>Automated daily extraction from Ganttic API</p>
          </div>
          <div class='showcase-solution-card'>
            <div class='showcase-solution-icon'>🗄️</div>
            <h4>Script 2: Data Processing</h4>
            <p>SQL integration and table management</p>
          </div>
        </div>
        <div class='showcase-tech-tags'>
          <span class='showcase-tech-tag'>Azure Functions</span>
          <span class='showcase-tech-tag'>Python</span>
          <span class='showcase-tech-tag'>SQL Database</span>
          <span class='showcase-tech-tag'>REST API</span>
          <span class='showcase-tech-tag'>Daily Automation</span>
        </div>
      `
    },
    // 4. Comparison (with gantticVSpower.png)
    {
      content: `
        <h3>System Comparison</h3>
        <p style='font-size:1.08rem; color:#1e293b;'>How our new system stacks up against the old Power Automate solution.</p>
        <img src='assets/gantticVSpower.png' alt='Ganttic vs Power Automate' class='showcase-comparison-img'>
      `
    },
    // 5. Results/Outcome
    {
      content: `
        <h3>Results & Outcome</h3>
        <ul class='showcase-outcome-list'>
          <li><b>Data Fortress:</b> Our schedules and resources are now safe, no matter what.</li>
          <li><b>Time Saver:</b> No more manual backups or fixing broken automations—just results.</li>
          <li><b>Ready for the Future:</b> The foundation is set for next-gen dashboards and analytics.</li>
          <li><b>Team Approved:</b> Stakeholders love the new process—less stress, more insight.</li>
          <li><b>Disaster-Proof:</b> If Ganttic ever goes down, we're covered—no lost plans, no lost sleep.</li>
        </ul>
      `
    }
  ];
  let current = 0;
  const cardEl = document.getElementById('ganttic-showcase-card');
  const prevBtn = document.querySelector('.ganttic-showcase-prev');
  const nextBtn = document.querySelector('.ganttic-showcase-next');
  const steps = document.getElementById('ganttic-showcase-steps');
  function renderCard(idx, animate=true) {
    if (animate) {
      cardEl.classList.remove('gantticShowcaseFadeIn');
      void cardEl.offsetWidth;
      cardEl.classList.add('gantticShowcaseFadeIn');
    }
    cardEl.innerHTML = cards[idx].content;
    if (steps) {
      steps.innerHTML = cards.map((_, i) => `<span class='ganttic-showcase-step-dot${i === idx ? ' active' : ''}'></span>`).join('');
    }
  }
  renderCard(current, false);
  prevBtn.onclick = () => {
    current = (current - 1 + cards.length) % cards.length;
    renderCard(current);
  };
  nextBtn.onclick = () => {
    current = (current + 1) % cards.length;
    renderCard(current);
  };
  if (steps) {
    steps.onclick = (e) => {
      if (e.target.classList.contains('ganttic-showcase-step-dot')) {
        const idx = Array.from(steps.children).indexOf(e.target);
        if (idx >= 0) {
          current = idx;
          renderCard(current);
        }
      }
    };
  }
    }
}

// Initialize the presentation when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Presentation();
    animateHeroDates();
    // Home button scrolls to hero section
    document.querySelector('.nav-home').addEventListener('click', (e) => {
        e.preventDefault();
        goToSection(0);
        animateHeroDates();
    });

    // Make the first project overview box clickable
    const finishedBox = document.querySelector('.project-overview-box:first-child');
    if (finishedBox) {
        finishedBox.addEventListener('click', () => {
            document.getElementById('gdrive-ami-project').scrollIntoView({ behavior: 'auto' });
        });
    }

    const ongoingProjectsBox = document.getElementById('ongoing-projects-box');
    if (ongoingProjectsBox) {
        ongoingProjectsBox.addEventListener('click', () => {
            const sections = getSections();
            const chatbotProjectSection = document.getElementById('chatbot-project');
            const sectionIndex = Array.from(sections).indexOf(chatbotProjectSection);

            if (sectionIndex > -1) {
                goToSection(sectionIndex);
            }
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        const sections = getSections();
        const currentIndex = getCurrentSectionIndex();

        if (e.key === 'ArrowRight') {
            if (currentIndex < sections.length - 1) {
                goToSection(currentIndex + 1);
            }
        } else if (e.key === 'ArrowLeft') {
            if (currentIndex > 0) {
                goToSection(currentIndex - 1);
            }
        }
    });
});

// Section navigation logic
function getSections() {
    return Array.from(document.querySelectorAll('section'));
}

function getCurrentSectionIndex() {
    const sections = getSections();
    const scrollY = window.scrollY;
    let idx = 0;
    for (let i = 0; i < sections.length; i++) {
        if (sections[i].getBoundingClientRect().top + window.scrollY >= scrollY - 10) {
            idx = i;
            break;
        }
    }
    return idx;
}

function goToSection(idx) {
    const sections = getSections();
    if (idx < 0) idx = 0;
    if (idx >= sections.length) idx = sections.length - 1;
    const top = sections[idx].offsetTop;
    window.scrollTo({ top, behavior: 'auto' });
    // Animate dates if hero
    if (idx === 0) animateHeroDates();
}

document.querySelector('.arrow-left').addEventListener('click', () => {
    const idx = getCurrentSectionIndex();
    goToSection(idx - 1);
});
document.querySelector('.arrow-right').addEventListener('click', () => {
    const idx = getCurrentSectionIndex();
    goToSection(idx + 1);
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        const idx = getCurrentSectionIndex();
        goToSection(idx - 1);
    } else if (e.key === 'ArrowRight') {
        const idx = getCurrentSectionIndex();
        goToSection(idx + 1);
    }
});

function animateHeroDates() {
    const dateTarget = 'Jan 6 - July 3';
    const dateEl = document.getElementById('hero-dates-rolling');
    if (dateEl) {
        let current = '';
        let i = 0;
        function typeDate() {
            if (i < dateTarget.length) {
                current += dateTarget[i];
                dateEl.textContent = current;
                i++;
                setTimeout(typeDate, 70);
            } else {
                dateEl.textContent = dateTarget;
            }
        }
        typeDate();
    }
}

// Finished Project 1: Carousel logic
const carouselImages = [
    'assets/folder1.png',
    'assets/folder2.png',
    'assets/folder3.png',
    'assets/folder4.png',
    'assets/folder5.png'
];
let carouselIndex = 0;
const carouselImg = document.getElementById('carousel-img');
const prevBtn = document.getElementById('carousel-prev');
const nextBtn = document.getElementById('carousel-next');
if (carouselImg && prevBtn && nextBtn) {
    function updateCarousel() {
        carouselImg.src = carouselImages[carouselIndex];
        carouselImg.alt = `Folder ${carouselIndex + 1}`;
    }
    prevBtn.addEventListener('click', () => {
        carouselIndex = (carouselIndex - 1 + carouselImages.length) % carouselImages.length;
        updateCarousel();
    });
    nextBtn.addEventListener('click', () => {
        carouselIndex = (carouselIndex + 1) % carouselImages.length;
        updateCarousel();
    });
    updateCarousel();
}
// Popover logic for Customers and Tasks
const customersBtn = document.getElementById('customers-btn');
const customersList = document.getElementById('customers-list');
const tasksBtn = document.getElementById('tasks-btn');
const tasksList = document.getElementById('tasks-list');
if (customersBtn && customersList) {
    customersBtn.addEventListener('mouseenter', () => customersList.style.display = 'block');
    customersBtn.addEventListener('mouseleave', () => customersList.style.display = 'none');
    customersBtn.addEventListener('focus', () => customersList.style.display = 'block');
    customersBtn.addEventListener('blur', () => customersList.style.display = 'none');
    customersList.addEventListener('mouseenter', () => customersList.style.display = 'block');
    customersList.addEventListener('mouseleave', () => customersList.style.display = 'none');
}
if (tasksBtn && tasksList) {
    tasksBtn.addEventListener('mouseenter', () => tasksList.style.display = 'block');
    tasksBtn.addEventListener('mouseleave', () => tasksList.style.display = 'none');
    tasksBtn.addEventListener('focus', () => tasksList.style.display = 'block');
    tasksBtn.addEventListener('blur', () => tasksList.style.display = 'none');
    tasksList.addEventListener('mouseenter', () => tasksList.style.display = 'block');
    tasksList.addEventListener('mouseleave', () => tasksList.style.display = 'none');
}

document.getElementById('ongoing-projects-box').addEventListener('click', () => {
    const sections = getSections();
    const chatbotProjectSection = document.getElementById('chatbot-project');
    const sectionIndex = Array.from(sections).indexOf(chatbotProjectSection);

    if (sectionIndex > -1) {
        goToSection(sectionIndex);
    }
});

function updateCarousel() {
    const carousel = document.querySelector('.carousel-container');
    if (!carousel) return;
    const offset = -currentCarouselIndex * 100;
    carousel.style.transform = `translateX(${offset}%)`;
} 
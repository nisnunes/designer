// Modern JavaScript for Nisley Nunes Landing Page
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Portfolio tabs functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
    
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.problem-card, .solution-card, .portfolio-item, .testimonial-card, .timeline-item'
    );
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    let ticking = false;
    
    function updateNavbar() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
        
        // Hide/show navbar on scroll
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
    
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        });
    }
    
    // Counter animation for stats
    const stats = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => {
        statsObserver.observe(stat);
    });
    
    function animateCounter(element) {
        const text = element.textContent;
        const hasPercent = text.includes('%');
        const hasR$ = text.includes('R$');
        const number = parseInt(text.replace(/[^\d]/g, ''));
        
        if (isNaN(number)) return;
        
        let current = 0;
        const increment = number / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= number) {
                current = number;
                clearInterval(timer);
            }
            
            let displayValue = Math.floor(current);
            if (hasR$) {
                displayValue = `R$ ${displayValue}`;
            } else if (hasPercent) {
                displayValue = `${displayValue}%`;
            }
            
            element.textContent = displayValue;
        }, 30);
    }
    
    // Form validation and submission (if needed)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add form submission logic here
            console.log('Form submitted');
        });
    });
    
    // Lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
    
    // Testimonials carousel (auto-rotate)
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    let currentTestimonial = 0;
    
    function rotateTestimonials() {
        testimonialCards.forEach((card, index) => {
            card.style.opacity = index === currentTestimonial ? '1' : '0.7';
            card.style.transform = index === currentTestimonial ? 'scale(1.02)' : 'scale(1)';
        });
        
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
    }
    
    if (testimonialCards.length > 0) {
        setInterval(rotateTestimonials, 5000);
    }
    
    // Button hover effects
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-linkedin');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // WhatsApp button pulse animation
    const whatsappButton = document.querySelector('.whatsapp-float a');
    if (whatsappButton) {
        setInterval(() => {
            whatsappButton.style.animation = 'none';
            setTimeout(() => {
                whatsappButton.style.animation = 'pulse 2s infinite';
            }, 10);
        }, 10000);
    }
    
    // Track user interactions for analytics
    function trackEvent(eventName, eventData = {}) {
        // Google Analytics 4
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, {
                event_category: 'engagement',
                event_label: eventData.label || '',
                value: eventData.value || 0,
                ...eventData
            });
        }
        
        // Facebook Pixel
        if (typeof fbq !== 'undefined') {
            fbq('track', eventName, eventData);
        }
        
        // Console log for debugging
        console.log('Event tracked:', eventName, eventData);
    }
    
    // Track CTA clicks
    document.addEventListener('click', function(e) {
        const target = e.target.closest('a, button');
        if (!target) return;
        
        if (target.classList.contains('btn-primary')) {
            trackEvent('CTA_Click', {
                button_text: target.textContent.trim(),
                button_location: getElementLocation(target)
            });
        }
        
        if (target.closest('.whatsapp-float')) {
            trackEvent('WhatsApp_Click', {
                page_location: window.location.href
            });
        }
        
        if (target.classList.contains('btn-linkedin')) {
            trackEvent('LinkedIn_Click', {
                page_location: window.location.href
            });
        }
        
        if (target.closest('.social-link')) {
            trackEvent('Social_Click', {
                platform: target.className.split(' ').find(cls => cls !== 'social-link'),
                page_location: window.location.href
            });
        }
    });
    
    // Track scroll depth
    let maxScrollDepth = 0;
    window.addEventListener('scroll', function() {
        const scrollDepth = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
        if (scrollDepth > maxScrollDepth) {
            maxScrollDepth = scrollDepth;
            
            // Track at 25%, 50%, 75%, and 100%
            if ([25, 50, 75, 100].includes(scrollDepth)) {
                trackEvent('Scroll_Depth', {
                    depth: scrollDepth,
                    page_location: window.location.href
                });
            }
        }
    });
    
    // Track time on page
    let startTime = Date.now();
    window.addEventListener('beforeunload', function() {
        const timeOnPage = Math.round((Date.now() - startTime) / 1000);
        trackEvent('Time_On_Page', {
            duration: timeOnPage,
            page_location: window.location.href
        });
    });
    
    // Helper function to get element location
    function getElementLocation(element) {
        const rect = element.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (rect.top + scrollTop < window.innerHeight) {
            return 'above_fold';
        } else if (rect.top + scrollTop < window.innerHeight * 2) {
            return 'below_fold';
        } else {
            return 'deep_scroll';
        }
    }
    
    // Performance monitoring
    if ('performance' in window) {
        window.addEventListener('load', function() {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                trackEvent('Page_Performance', {
                    load_time: Math.round(perfData.loadEventEnd - perfData.fetchStart),
                    dom_ready: Math.round(perfData.domContentLoadedEventEnd - perfData.fetchStart),
                    page_location: window.location.href
                });
            }, 0);
        });
    }
    
    // Error tracking
    window.addEventListener('error', function(e) {
        trackEvent('JavaScript_Error', {
            error_message: e.message,
            error_file: e.filename,
            error_line: e.lineno,
            page_location: window.location.href
        });
    });
    
    console.log('Nisley Nunes Landing Page loaded successfully! 🚀');
});


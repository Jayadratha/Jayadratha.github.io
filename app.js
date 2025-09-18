// Minimal JavaScript for Academic Website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize navigation
    initializeNavigation();
    
    // Initialize theme
    initializeTheme();
});

// Simple navigation without analytics
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('.content-section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            
            // Update active nav link
            navLinks.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            
            // Show target section
            contentSections.forEach(section => {
                section.classList.remove('active');
            });
            
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
            }
        });
    });
}

// Simple theme switcher
function initializeTheme() {
    const themeSwitcher = document.getElementById('theme-switcher');
    const userPreference = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    let currentTheme = userPreference || (prefersDark ? 'dark' : 'light');
    
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);

    if (themeSwitcher) {
        themeSwitcher.addEventListener('click', toggleTheme);
    }
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// Track external links for analytics (without blocking)
if (typeof gtag !== 'undefined') {
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a[href^="http"]');
        if (link && !link.href.includes(window.location.hostname)) {
            try {
                gtag('event', 'click', {
                    event_category: 'external_link',
                    event_label: link.href
                });
            } catch (error) {
                // Ignore analytics errors
            }
        }
    });
}

// Performance monitoring without blocking
window.addEventListener('load', function() {
    if (typeof gtag !== 'undefined') {
        try {
            const loadTime = performance.now();
            gtag('event', 'page_load_time', {
                event_category: 'performance',
                value: Math.round(loadTime)
            });
        } catch (error) {
            // Ignore analytics errors
        }
    }
});
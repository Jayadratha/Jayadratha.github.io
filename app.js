// Academic Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    initializeNavigation();
    
    // Admin panel functionality
    initializeAdminPanel();
    
    // Visitor tracking
    initializeVisitorTracking();
    
    // Initialize Google Analytics (mock implementation)
    initializeAnalytics();

    // Initialize theme detection
    initializeTheme();
});

// Navigation System
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
            
            // Track page view
            trackPageView(targetId);
        });
    });
}

// Admin Panel System
function initializeAdminPanel() {
    const adminPanel = document.getElementById('admin-panel');
    const closeAdminBtn = document.getElementById('close-admin');
    
    // Check for admin URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('admin') === 'true') {
        showAdminPanel();
    }
    
    // Close admin panel
    closeAdminBtn.addEventListener('click', function() {
        hideAdminPanel();
    });
    
    // Update admin stats
    updateAdminStats();
    
    // Update stats every 30 seconds
    setInterval(updateAdminStats, 30000);
}

function showAdminPanel() {
    const adminPanel = document.getElementById('admin-panel');
    adminPanel.classList.add('active');
    updateAdminStats();
    populateVisitorList();
}

function hideAdminPanel() {
    const adminPanel = document.getElementById('admin-panel');
    adminPanel.classList.remove('active');
}

function updateAdminStats() {
    // Mock analytics data - in real implementation, this would come from Google Analytics API
    const stats = getAnalyticsData();
    
    document.getElementById('visitor-count').textContent = stats.totalVisitors;
    document.getElementById('today-visitors').textContent = stats.todayVisitors;
    document.getElementById('online-visitors').textContent = stats.onlineVisitors;
}

function populateVisitorList() {
    const visitorList = document.getElementById('visitor-list');
    const recentVisitors = getRecentVisitors();
    
    visitorList.innerHTML = '';
    
    recentVisitors.forEach(visitor => {
        const visitorItem = document.createElement('div');
        visitorItem.className = 'visitor-item';
        visitorItem.innerHTML = `
            <div class="visitor-location">${visitor.location}</div>
            <div class="visitor-time">${visitor.time}</div>
        `;
        visitorList.appendChild(visitorItem);
    });
}

// Visitor Tracking System
function initializeVisitorTracking() {
    // Record visitor session
    recordVisitorSession();
    
    // Track page load
    trackPageView('about');
    
    // Track time on site
    trackTimeOnSite();
}

function recordVisitorSession() {
    const visitorData = {
        timestamp: new Date().toISOString(),
        location: getVisitorLocation(),
        userAgent: navigator.userAgent,
        referrer: document.referrer,
        sessionId: generateSessionId()
    };
    
    // Store in localStorage for demonstration
    const sessions = JSON.parse(localStorage.getItem('visitorSessions') || '[]');
    sessions.push(visitorData);
    
    // Keep only last 100 sessions
    if (sessions.length > 100) {
        sessions.splice(0, sessions.length - 100);
    }
    
    localStorage.setItem('visitorSessions', JSON.stringify(sessions));
}

function trackPageView(pageName) {
    const pageView = {
        page: pageName,
        timestamp: new Date().toISOString(),
        sessionId: getSessionId()
    };
    
    const pageViews = JSON.parse(localStorage.getItem('pageViews') || '[]');
    pageViews.push(pageView);
    
    // Keep only last 500 page views
    if (pageViews.length > 500) {
        pageViews.splice(0, pageViews.length - 500);
    }
    
    localStorage.setItem('pageViews', JSON.stringify(pageViews));
}

function trackTimeOnSite() {
    const startTime = Date.now();
    
    window.addEventListener('beforeunload', function() {
        const timeSpent = Date.now() - startTime;
        const timeData = {
            duration: timeSpent,
            timestamp: new Date().toISOString(),
            sessionId: getSessionId()
        };
        
        const timeSessions = JSON.parse(localStorage.getItem('timeSessions') || '[]');
        timeSessions.push(timeData);
        
        if (timeSessions.length > 100) {
            timeSessions.splice(0, timeSessions.length - 100);
        }
        
        localStorage.setItem('timeSessions', JSON.stringify(timeSessions));
    });
}

// Analytics Data Functions
function getAnalyticsData() {
    const sessions = JSON.parse(localStorage.getItem('visitorSessions') || '[]');
    const pageViews = JSON.parse(localStorage.getItem('pageViews') || '[]');
    
    const today = new Date().toDateString();
    const todaySessions = sessions.filter(session => 
        new Date(session.timestamp).toDateString() === today
    );
    
    // Mock online visitors (random number between 1-10)
    const onlineVisitors = Math.floor(Math.random() * 10) + 1;
    
    return {
        totalVisitors: sessions.length + 1200, // Add base number for demo
        todayVisitors: todaySessions.length + Math.floor(Math.random() * 50),
        onlineVisitors: onlineVisitors,
        pageViews: pageViews.length + 3500 // Add base number for demo
    };
}

function getRecentVisitors() {
    const sessions = JSON.parse(localStorage.getItem('visitorSessions') || '[]');
    const mockVisitors = generateMockVisitors();
    
    // Combine real and mock data
    const allVisitors = [...sessions, ...mockVisitors];
    
    // Sort by timestamp and get recent 10
    return allVisitors
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        .slice(0, 10)
        .map(visitor => ({
            location: visitor.location,
            time: formatTime(visitor.timestamp)
        }));
}

function generateMockVisitors() {
    const locations = [
        'New York, US', 'London, UK', 'Tokyo, JP', 'Berlin, DE', 'Sydney, AU',
        'Toronto, CA', 'Mumbai, IN', 'São Paulo, BR', 'Paris, FR', 'Seoul, KR',
        'Singapore, SG', 'Amsterdam, NL', 'Stockholm, SE', 'Zurich, CH', 'Dublin, IE'
    ];
    
    const visitors = [];
    const now = new Date();
    
    for (let i = 0; i < 15; i++) {
        const timestamp = new Date(now.getTime() - Math.random() * 24 * 60 * 60 * 1000);
        visitors.push({
            location: locations[Math.floor(Math.random() * locations.length)],
            timestamp: timestamp.toISOString()
        });
    }
    
    return visitors;
}

function getVisitorLocation() {
    // Mock location detection - in real implementation, use IP geolocation
    const locations = [
        'New York, US', 'London, UK', 'Tokyo, JP', 'Berlin, DE', 'Sydney, AU',
        'Toronto, CA', 'Mumbai, IN', 'São Paulo, BR', 'Paris, FR', 'Seoul, KR'
    ];
    
    return locations[Math.floor(Math.random() * locations.length)];
}

function generateSessionId() {
    return 'session_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
}

function getSessionId() {
    let sessionId = sessionStorage.getItem('sessionId');
    if (!sessionId) {
        sessionId = generateSessionId();
        sessionStorage.setItem('sessionId', sessionId);
    }
    return sessionId;
}

function formatTime(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMinutes = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffMinutes < 1) {
        return 'Just now';
    } else if (diffMinutes < 60) {
        return `${diffMinutes}m ago`;
    } else if (diffHours < 24) {
        return `${diffHours}h ago`;
    } else if (diffDays < 7) {
        return `${diffDays}d ago`;
    } else {
        return date.toLocaleDateString();
    }
}

// Google Analytics Integration (Mock)
function initializeAnalytics() {
    // Mock Google Analytics - in real implementation, include GA4 code
    console.log('Analytics initialized');
    
    // Track initial page load
    gtag('config', 'GA_MEASUREMENT_ID', {
        page_title: 'Jayadratha Gayen - AI Researcher',
        page_location: window.location.href
    });
}

// Mock gtag function for demonstration
function gtag() {
    // Mock implementation - in real site, this would be Google Analytics
    console.log('Analytics event:', arguments);
}

// Utility Functions
function debounce(func, wait) {
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

// Smooth scrolling for anchor links
function smoothScrollTo(element) {
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Handle external links
document.addEventListener('click', function(e) {
    const link = e.target.closest('a[href^="http"]');
    if (link && !link.href.includes(window.location.hostname)) {
        // Track external link clicks
        gtag('event', 'click', {
            event_category: 'external_link',
            event_label: link.href
        });
    }
});

// Handle CV download tracking
document.addEventListener('click', function(e) {
    if (e.target.closest('.cv-btn')) {
        gtag('event', 'download', {
            event_category: 'cv',
            event_label: 'cv_download'
        });
    }
});

// Handle paper link tracking
document.addEventListener('click', function(e) {
    if (e.target.closest('.paper-link')) {
        const linkText = e.target.textContent.trim();
        gtag('event', 'click', {
            event_category: 'paper_link',
            event_label: linkText
        });
    }
});

// Handle project link tracking
document.addEventListener('click', function(e) {
    if (e.target.closest('.project-link')) {
        const projectTitle = e.target.closest('.project-card').querySelector('h4').textContent;
        gtag('event', 'click', {
            event_category: 'project_link',
            event_label: projectTitle
        });
    }
});

// Handle social media link tracking
document.addEventListener('click', function(e) {
    if (e.target.closest('.social-link')) {
        const platform = e.target.closest('.social-link').querySelector('span').textContent;
        gtag('event', 'click', {
            event_category: 'social_link',
            event_label: platform
        });
    }
});

// Performance monitoring
window.addEventListener('load', function() {
    // Track page load time
    const loadTime = performance.now();
    gtag('event', 'page_load_time', {
        event_category: 'performance',
        value: Math.round(loadTime)
    });
    
    // Update last visit time
    localStorage.setItem('lastVisit', new Date().toISOString());
});

// Error tracking
window.addEventListener('error', function(e) {
    gtag('event', 'exception', {
        description: e.error.toString(),
        fatal: false
    });
});

// Visibility API for tracking user engagement
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        gtag('event', 'page_hidden', {
            event_category: 'engagement'
        });
    } else {
        gtag('event', 'page_visible', {
            event_category: 'engagement'
        });
    }
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Admin panel toggle with Ctrl+Shift+A
    if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        e.preventDefault();
        const adminPanel = document.getElementById('admin-panel');
        if (adminPanel.classList.contains('active')) {
            hideAdminPanel();
        } else {
            showAdminPanel();
        }
    }
    
    // Escape key to close admin panel
    if (e.key === 'Escape') {
        const adminPanel = document.getElementById('admin-panel');
        if (adminPanel.classList.contains('active')) {
            hideAdminPanel();
        }
    }
});

// Initialize theme detection
// function initializeTheme() {
//     const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
//     document.documentElement.setAttribute('data-color-scheme', prefersDark ? 'dark' : 'light');
    
//     // Listen for theme changes
//     window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
//         document.documentElement.setAttribute('data-color-scheme', e.matches ? 'dark' : 'light');
//     });
// }
function initializeTheme() {
    const themeSwitcher = document.getElementById('theme-switcher');
    const userPreference = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    let currentTheme = userPreference || (prefersDark ? 'dark' : 'light');
    
    document.documentElement.setAttribute('data-color-scheme', currentTheme);
    localStorage.setItem('theme', currentTheme);

    themeSwitcher.addEventListener('click', toggleTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-color-scheme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-color-scheme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// Initialize theme on load
initializeTheme();

// Export functions for potential external use
window.academicWebsite = {
    showAdminPanel,
    hideAdminPanel,
    trackPageView,
    getAnalyticsData
};
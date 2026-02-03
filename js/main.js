// ========================================
// Configuration
// ========================================

const CONFIG = {
    // Replace with your actual FiveM server IP:PORT
    serverIP: '83.168.105.17:40120',
    
    // CFX.re server code (if using cfx.re/join/yourcode)
    cfxServerCode: 'dmakaq',
    
    // Update interval for player count (in milliseconds)
    updateInterval: 30000, // 30 seconds
    
    // Discord invite link
    discordInvite: 'https://discord.gg/regnumrp',
    
    // MANUAL MODE: If API doesn't work, set this to true and manually update counts below
    manualMode: false,
    manualPlayerCount: 45,
    manualMaxPlayers: 128,
};

// ========================================
// Player Count Fetching
// ========================================

async function fetchPlayerCount() {
    // Check if manual mode is enabled
    if (CONFIG.manualMode) {
        console.log('📝 Manual mode enabled');
        updatePlayerDisplay(CONFIG.manualPlayerCount, CONFIG.manualMaxPlayers);
        updateServerStatus(true);
        return;
    }
    
    console.log('🔄 Fetching player count...');
    
    try {
        // Try multiple API endpoint variations
        const endpoints = [
            // Method 1: CFX code only (most common)
            `https://servers-frontend.fivem.net/api/servers/single/${CONFIG.cfxServerCode}`,
            // Method 2: Full CFX path
            `https://servers-frontend.fivem.net/api/servers/single/cfx.re/join/${CONFIG.cfxServerCode}`,
            // Method 3: Direct IP:PORT
            `https://servers-frontend.fivem.net/api/servers/single/${CONFIG.serverIP}`
        ];
        
        let data = null;
        let successfulEndpoint = null;
        
        // Try each endpoint until one works
        for (const endpoint of endpoints) {
            try {
                console.log(`Trying: ${endpoint}`);
                const response = await fetch(endpoint);
                
                if (response.ok) {
                    data = await response.json();
                    successfulEndpoint = endpoint;
                    console.log('✅ Server data received from:', endpoint);
                    break;
                }
            } catch (err) {
                console.log(`Failed to fetch from ${endpoint}:`, err.message);
                continue;
            }
        }
        
        if (!data) {
            throw new Error('Server not found in any FiveM API endpoint');
        }
        
        console.log('Server data:', data);
        
        // Parse player data - handle different API response structures
        let playerCount = 0;
        let maxPlayers = 128;
        
        // FiveM API typically returns data in 'Data' object
        if (data.Data) {
            // Try to get player count from various possible fields
            playerCount = parseInt(data.Data.clients) || 
                         parseInt(data.Data.players) || 
                         parseInt(data.Data.playerCount) || 0;
            
            // Try to get max players from various possible fields
            maxPlayers = parseInt(data.Data.sv_maxclients) || 
                        parseInt(data.Data.svMaxclients) || 
                        parseInt(data.Data.maxPlayers) || 128;
        } 
        // Alternative structure (less common)
        else if (data.players !== undefined || data.clients !== undefined) {
            playerCount = parseInt(data.players) || parseInt(data.clients) || 0;
            maxPlayers = parseInt(data.maxPlayers) || parseInt(data.sv_maxclients) || 128;
        }
        
        console.log(`👥 Players: ${playerCount}/${maxPlayers}`);
        
        // Update the display with the fetched data
        updatePlayerDisplay(playerCount, maxPlayers);
        updateServerStatus(true);
        
    } catch (error) {
        console.error('❌ Error fetching player count:', error);
        console.log('⚠️ Possible reasons:');
        console.log('   1. Server not publicly listed on FiveM');
        console.log('   2. Server is offline');
        console.log('   3. CORS policy blocking the request');
        console.log('   4. Incorrect IP or CFX code');
        console.log('');
        console.log('🔧 Solutions:');
        console.log('   - Verify server is listed at: https://servers.fivem.net/');
        console.log('   - Current IP in config: ' + CONFIG.serverIP);
        console.log('   - Current CFX code: ' + CONFIG.cfxServerCode);
        console.log('   - Enable manual mode by setting CONFIG.manualMode = true');
        console.log('');
        console.log('💡 Quick Fix: Enable manual mode in the CONFIG section at the top of main.js');
        console.log('   Set manualMode: true and update manualPlayerCount to your desired value');
        
        // Show loading state instead of showing as offline immediately
        updatePlayerDisplay('---', '128');
        updateServerStatus(false);
        
        showDebugInfo();
    }
}

function showDebugInfo() {
    console.log('');
    console.log('📝 Debug Information:');
    console.log('=====================================');
    console.log('Server IP:', CONFIG.serverIP);
    console.log('CFX Code:', CONFIG.cfxServerCode);
    console.log('');
    console.log('Test URLs (paste in browser to test):');
    console.log(`1. https://servers-frontend.fivem.net/api/servers/single/${CONFIG.cfxServerCode}`);
    console.log(`2. https://servers-frontend.fivem.net/api/servers/single/${CONFIG.serverIP}`);
    console.log('');
    console.log('If none of these work, your server might not be publicly listed.');
    console.log('Enable manual mode to display static player counts.');
    console.log('=====================================');
}

function updatePlayerDisplay(current, max) {
    // Update all player count elements
    const playerCountElements = document.querySelectorAll('#playerCount');
    const playerCount2Element = document.getElementById('playerCount2');
    const maxPlayersElement = document.getElementById('maxPlayers');
    
    playerCountElements.forEach(element => {
        if (element) {
            element.textContent = current;
        }
    });
    
    if (playerCount2Element) {
        playerCount2Element.textContent = `${current} / ${max}`;
    }
    
    if (maxPlayersElement) {
        maxPlayersElement.textContent = max;
    }
    
    // Update the widget with animated number display
    const widgetCount = document.querySelector('.widget-count');
    if (widgetCount && current !== '---') {
        const currentStr = current.toString().padStart(3, '0');
        const digits = currentStr.split('');
        widgetCount.innerHTML = digits.map(digit => 
            `<span class="count-separator">${digit}</span>`
        ).join('');
    } else if (widgetCount) {
        // Show dashes if offline or loading
        widgetCount.innerHTML = `
            <span class="count-separator">-</span>
            <span class="count-separator">-</span>
            <span class="count-separator">-</span>
        `;
    }
}

function updateServerStatus(isOnline) {
    // Update all status indicators
    const statusElements = document.querySelectorAll('.status-online');
    const heroBadge = document.querySelector('.hero-badge');
    
    statusElements.forEach(element => {
        if (isOnline) {
            element.innerHTML = '<span class="status-dot"></span>Online';
            element.style.color = 'var(--red-light)';
            element.classList.remove('status-offline');
        } else {
            element.innerHTML = '<span class="status-dot" style="background: #6b6b6b;"></span>Offline';
            element.style.color = 'var(--text-muted)';
            element.classList.add('status-offline');
        }
    });
    
    // Update hero badge
    if (heroBadge) {
        const badgeText = heroBadge.querySelector('span:last-child');
        if (badgeText) {
            badgeText.textContent = isOnline ? 'SERWER ONLINE' : 'SERWER OFFLINE';
        }
        
        const statusDot = heroBadge.querySelector('.status-dot');
        if (statusDot && !isOnline) {
            statusDot.style.background = '#6b6b6b';
        } else if (statusDot) {
            statusDot.style.background = '';
        }
    }
}

// ========================================
// Navigation
// ========================================

function initNavigation() {
    const header = document.getElementById('header');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Scroll effect for header
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // Mobile menu toggle
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
    }
    
    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 1024) {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    // Active link on scroll
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    });
}

// ========================================
// Smooth Scrolling
// ========================================

function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const headerHeight = document.getElementById('header').offsetHeight;
        const targetPosition = section.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// ========================================
// Connect to Server
// ========================================

function connectToServer() {
    // Method 1: Using cfx.re join link (recommended)
    window.location.href = `fivem://connect/cfx.re/join/${CONFIG.cfxServerCode}`;
    
    // Method 2: Direct IP connection (alternative)
    // window.location.href = `fivem://connect/${CONFIG.serverIP}`;
    
    // Fallback: Show instructions
    setTimeout(() => {
        alert(`Aby dołączyć do serwera:\n\n1. Uruchom FiveM\n2. Naciśnij F8 i wpisz: connect cfx.re/join/${CONFIG.cfxServerCode}\n\nLub wejdź przez:\n${CONFIG.discordInvite}`);
    }, 1000);
}

// ========================================
// Copy Server IP
// ========================================

function copyServerIP() {
    const serverIP = `connect cfx.re/join/${CONFIG.cfxServerCode}`;
    
    // Create temporary textarea to copy text
    const textarea = document.createElement('textarea');
    textarea.value = serverIP;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
        document.execCommand('copy');
        showNotification('IP serwera skopiowane!', 'success');
    } catch (err) {
        showNotification('Nie udało się skopiować', 'error');
    }
    
    document.body.removeChild(textarea);
}

// ========================================
// Notification System
// ========================================

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 2rem;
        background: ${type === 'success' ? 'var(--red-light)' : 'var(--red-dark)'};
        color: white;
        border-radius: 8px;
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        font-weight: 600;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ========================================
// Animation on Scroll
// ========================================

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all cards
    const cards = document.querySelectorAll('.about-card, .feature-card, .staff-card, .stat-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.animationDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
}

// ========================================
// Discord Widget (Optional)
// ========================================

function loadDiscordWidget() {
    // You can add Discord widget here if needed
    // Example: https://discord.com/widget?id=YOUR_SERVER_ID&theme=dark
}

// ========================================
// Performance Optimization
// ========================================

function optimizePerformance() {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ========================================
// Easter Eggs & Fun Features
// ========================================

function initEasterEggs() {
    let konamiCode = [];
    const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    
    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.key);
        konamiCode = konamiCode.slice(-10);
        
        if (konamiCode.join('') === konamiPattern.join('')) {
            showNotification('🎮 Gratulacje! Odkryłeś sekretny kod!', 'success');
            document.body.style.animation = 'rainbow 2s linear';
        }
    });
}

// ========================================
// Initialize Everything
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('%c🚀 Regnum Roleplay', 'color: #fa4953; font-size: 24px; font-weight: bold;');
    console.log('%cWitaj w konsoli developera!', 'color: #b40c1b; font-size: 14px;');
    console.log('%cJeśli widzisz jakieś błędy, zgłoś je na Discord!', 'color: #b8b8b8; font-size: 12px;');
    console.log('');
    console.log('%c💡 Wskazówka: Jeśli licznik graczy nie działa, sprawdź instrukcje w konsoli poniżej', 'color: #ffa500; font-size: 12px;');
    console.log('');
    
    // Initialize all features
    initNavigation();
    initSmoothScrolling();
    initScrollAnimations();
    optimizePerformance();
    initEasterEggs();
    
    // Fetch player count immediately and then at intervals
    fetchPlayerCount();
    setInterval(fetchPlayerCount, CONFIG.updateInterval);
    
    // Update copyright year
    const currentYear = new Date().getFullYear();
    document.querySelectorAll('.footer-bottom p').forEach(p => {
        if (p.textContent.includes('2024')) {
            p.textContent = p.textContent.replace('2024', currentYear);
        }
    });
});

// ========================================
// Export functions for global use
// ========================================

window.scrollToSection = scrollToSection;
window.connectToServer = connectToServer;
window.copyServerIP = copyServerIP;
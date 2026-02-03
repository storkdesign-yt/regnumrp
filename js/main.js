// ========================================
// Configuration
// ========================================

const CONFIG = {
    // Replace with your actual FiveM server IP:PORT
    serverIP: '83.168.105.17:30120',
    
    // CFX.re server code (if using cfx.re/join/yourcode)
    cfxServerCode: 'dmakaq',
    
    // Update interval for player count (in milliseconds)
    updateInterval: 10000, // 10 seconds
    
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
        // Try the CFX endpoint
        const endpoint = `https://servers-frontend.fivem.net/api/servers/single/${CONFIG.cfxServerCode}`;
        
        console.log(`Trying: ${endpoint}`);
        const response = await fetch(endpoint);
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: Server not found`);
        }
        
        const data = await response.json();
        console.log('✅ Server data received:', data);
        
        // Parse player data from the API response
        let playerCount = 0;
        let maxPlayers = 128;
        
        // The FiveM API returns data in the 'Data' object
        if (data && data.Data) {
            // Get current player count
            playerCount = parseInt(data.Data.clients) || 
                         parseInt(data.Data.selfReportedClients) || 
                         parseInt(data.Data.players) || 0;
            
            // Get max players - check both possible field names
            maxPlayers = parseInt(data.Data.sv_maxclients) || 
                        parseInt(data.Data.svMaxclients) || 128;
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
        console.log('   4. Incorrect CFX code');
        console.log('');
        console.log('🔧 Current Configuration:');
        console.log('   - Server IP: ' + CONFIG.serverIP);
        console.log('   - CFX Code: ' + CONFIG.cfxServerCode);
        console.log('');
        console.log('💡 Quick Fix: Enable manual mode in the CONFIG section');
        console.log('   Set manualMode: true and update manualPlayerCount');
        
        // Show loading state
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
    console.log('Test URL (paste in browser to test):');
    console.log(`https://servers-frontend.fivem.net/api/servers/single/${CONFIG.cfxServerCode}`);
    console.log('');
    console.log('If this doesn\'t work, enable manual mode.');
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
// ========================================
// Podania (Applications) System
// ========================================

// Google Forms URLs - Replace with your actual form URLs
const GOOGLE_FORMS = {
    'dzialalnosc': 'https://forms.gle/Ao7XL8Kn251ZCYbH9',
    'organizacja': 'https://forms.gle/bpjEvo32878bxrP47',
    'peda': 'https://forms.gle/mwh3Xd9r3mFnaiNj7',
    'trial-support': 'https://forms.gle/5FHvgrVaGBxEKkJW9',
    'trial-recruiter': 'https://forms.gle/TnHRBHrWcJxeL2Rg6'
};

// Form configurations
const FORM_CONFIGS = {
    'dzialalnosc': {
        title: 'Podanie o działalność',
        description: 'Wypełnij formularz, aby złożyć podanie o prowadzenie działalności',
        fields: [
            { name: 'entry.1392446209', label: 'Imię', type: 'text', required: true },
            { name: 'entry.184294948', label: 'Wiek', type: 'text', required: true },
            { name: 'entry.437894828', label: 'Discord ID', type: 'text', required: true },
            { name: 'entry.127153598', label: 'Czy zapoznałeś się informacją oraz wytycznymi co do działalności zawartej w ogłoszeniu oraz ją akceptujesz?', type: 'select', required: true, options: ['Tak', 'Nie'] },
            { name: 'entry.532684954', label: 'Czy zapoznałeś się z obowiązującym regulaminem firm oraz z wymogami?', type: 'select', required: true, options: ['Tak', 'Nie'] },
            { name: 'entry.2069942877', label: 'Nazwa Firmy', type: 'textarea', required: true },
            { name: 'entry.182995140', label: 'Jaki jest zamysł twojej firmy?', type: 'textarea', required: true },
            { name: 'entry.636871358', label: 'Co twoja firma wniesie na serwer', type: 'textarea', required: true },
            { name: 'entry.411116480', label: 'Lokalizacja Firmy', type: 'textarea', required: true },
            { name: 'entry.1714576130', label: 'W jaki sposób twoja firma będzie zarabiać', type: 'textarea', required: true },
            { name: 'entry.1033141881', label: 'Opisz swoją aktualną odgrywaną postać', type: 'textarea', required: true },
            { name: 'entry.1270000745', label: 'Dlaczego to właśnie ty powinieneś/aś dostać firmę?', type: 'textarea', required: true },
            { name: 'entry.1979208409', label: 'Jakie są twoje zainteresowania [OOC]', type: 'textarea', required: true },
            { name: 'entry.673989797', label: 'Dlaczego uważasz, że taka firma byłaby pożądana u graczy?', type: 'textarea', required: true },
            { name: 'entry.1368237543', label: 'Czy masz doświadczenie z zarządzaniem? [OOC]', type: 'textarea', required: true },
        ]
    },
    'organizacja': {
        title: 'Podanie o Organizację/Gang',
        description: 'Wypełnij formularz, aby założyć organizację lub gang',
        fields: [
            { name: 'entry.123456789', label: 'Nick w grze', type: 'text', required: true },
            { name: 'entry.987654321', label: 'Discord', type: 'text', required: true },
            { name: 'entry.111111111', label: 'Nazwa organizacji/gangu', type: 'text', required: true },
            { name: 'entry.222222222', label: 'Typ organizacji', type: 'select', required: true, options: ['Gang uliczny', 'Gang motocyklowy', 'Organizacja kryminalna', 'Legalna organizacja'] },
            { name: 'entry.333333333', label: 'Historia organizacji', type: 'textarea', required: true, helper: 'Opisz historię i tło organizacji' },
            { name: 'entry.444444444', label: 'Struktura i cele', type: 'textarea', required: true, helper: 'Opisz strukturę organizacji i jej główne cele' },
            { name: 'entry.555555555', label: 'Oczekiwana liczba członków', type: 'number', required: true },
        ]
    },
    'peda': {
        title: 'Podanie o Peda',
        description: 'Złóż podanie o unikalnego peda dla swojej postaci',
        fields: [
            { name: 'entry.123456789', label: 'Nick w grze', type: 'text', required: true },
            { name: 'entry.987654321', label: 'Discord', type: 'text', required: true },
            { name: 'entry.111111111', label: 'Nazwa peda', type: 'text', required: true },
            { name: 'entry.222222222', label: 'Link do peda', type: 'url', required: true, helper: 'Link do modelu peda (np. GTA5-Mods.com)' },
            { name: 'entry.333333333', label: 'Powód wniosku', type: 'textarea', required: true, helper: 'Dlaczego potrzebujesz tego peda do swojej postaci?' },
            { name: 'entry.444444444', label: 'Opis postaci', type: 'textarea', required: true, helper: 'Opisz swoją postać i jak ten ped wpasuje się w jej historię' },
        ]
    },
    'trial-support': {
        title: 'Podanie na Trial Supporta',
        description: 'Aplikuj na stanowisko Trial Supporta',
        fields: [
            { name: 'entry.123456789', label: 'Nick w grze', type: 'text', required: true },
            { name: 'entry.987654321', label: 'Discord', type: 'text', required: true },
            { name: 'entry.111111111', label: 'Wiek', type: 'number', required: true },
            { name: 'entry.222222222', label: 'Doświadczenie na serwerze', type: 'textarea', required: true, helper: 'Opisz swoje doświadczenie na serwerze Regnum' },
            { name: 'entry.333333333', label: 'Dostępność', type: 'textarea', required: true, helper: 'Ile godzin dziennie możesz poświęcić na pomoc graczom?' },
            { name: 'entry.444444444', label: 'Dlaczego chcesz zostać supportem?', type: 'textarea', required: true },
            { name: 'entry.555555555', label: 'Jak pomogłbyś społeczności?', type: 'textarea', required: true },
        ]
    },
    'trial-recruiter': {
        title: 'Podanie na Trial Recruitera',
        description: 'Aplikuj na stanowisko Trial Recruitera',
        fields: [
            { name: 'entry.123456789', label: 'Nick w grze', type: 'text', required: true },
            { name: 'entry.987654321', label: 'Discord', type: 'text', required: true },
            { name: 'entry.111111111', label: 'Wiek', type: 'number', required: true },
            { name: 'entry.222222222', label: 'Doświadczenie w rekrutacji', type: 'textarea', required: true, helper: 'Opisz swoje doświadczenie w rekrutacji lub szkoleniu nowych graczy' },
            { name: 'entry.333333333', label: 'Dostępność', type: 'textarea', required: true, helper: 'Ile godzin dziennie możesz poświęcić na rekrutację?' },
            { name: 'entry.444444444', label: 'Dlaczego chcesz zostać rekruterem?', type: 'textarea', required: true },
            { name: 'entry.555555555', label: 'Jak poprawisz proces whitelistowania?', type: 'textarea', required: true },
        ]
    }
};

let currentFormType = null;

function openPodaniaModal() {
    const modal = document.getElementById('podaniaModal');
    const selectionDiv = document.getElementById('applicationTypeSelection');
    const formContainer = document.getElementById('applicationFormContainer');
    
    modal.classList.add('active');
    selectionDiv.style.display = 'block';
    formContainer.style.display = 'none';
    document.body.style.overflow = 'hidden';
}

function closePodaniaModal() {
    const modal = document.getElementById('podaniaModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
    
    // Reset form after a delay
    setTimeout(() => {
        backToSelection();
    }, 300);
}

function selectApplicationType(type) {
    currentFormType = type;
    const config = FORM_CONFIGS[type];
    
    const selectionDiv = document.getElementById('applicationTypeSelection');
    const formContainer = document.getElementById('applicationFormContainer');
    const formTitle = document.getElementById('formTitle');
    const formDescription = document.getElementById('formDescription');
    const form = document.getElementById('applicationForm');
    
    // Update title and description
    formTitle.textContent = config.title;
    formDescription.textContent = config.description;
    
    // Build form
    form.innerHTML = '';
    
    config.fields.forEach(field => {
        const formGroup = document.createElement('div');
        formGroup.className = 'form-group';
        
        const label = document.createElement('label');
        label.innerHTML = `${field.label}${field.required ? ' <span class="required">*</span>' : ''}`;
        formGroup.appendChild(label);
        
        let input;
        
        if (field.type === 'textarea') {
            input = document.createElement('textarea');
            input.className = 'form-textarea';
            input.rows = 5;
        } else if (field.type === 'select') {
            input = document.createElement('select');
            input.className = 'form-select';
            
            const defaultOption = document.createElement('option');
            defaultOption.value = '';
            defaultOption.textContent = 'Wybierz opcję...';
            input.appendChild(defaultOption);
            
            field.options.forEach(option => {
                const optionElement = document.createElement('option');
                optionElement.value = option;
                optionElement.textContent = option;
                input.appendChild(optionElement);
            });
        } else {
            input = document.createElement('input');
            input.className = 'form-input';
            input.type = field.type || 'text';
        }
        
        input.name = field.name;
        input.required = field.required || false;
        input.placeholder = field.placeholder || '';
        
        formGroup.appendChild(input);
        
        if (field.helper) {
            const helper = document.createElement('div');
            helper.className = 'form-helper';
            helper.textContent = field.helper;
            formGroup.appendChild(helper);
        }
        
        form.appendChild(formGroup);
    });
    
    // Add submit button
    const submitBtn = document.createElement('button');
    submitBtn.type = 'submit';
    submitBtn.className = 'form-submit';
    submitBtn.textContent = 'Wyślij podanie';
    form.appendChild(submitBtn);
    
    // Add form submit handler
    form.onsubmit = handleFormSubmit;
    
    // Show form, hide selection
    selectionDiv.style.display = 'none';
    formContainer.style.display = 'block';
}

function backToSelection() {
    const selectionDiv = document.getElementById('applicationTypeSelection');
    const formContainer = document.getElementById('applicationFormContainer');
    const form = document.getElementById('applicationForm');
    
    selectionDiv.style.display = 'block';
    formContainer.style.display = 'none';
    form.reset();
    currentFormType = null;
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    if (!currentFormType) return;
    
    const formData = new FormData(e.target);
    const googleFormUrl = GOOGLE_FORMS[currentFormType];
    
    // Build the Google Form submission URL
    const params = new URLSearchParams();
    for (let [key, value] of formData.entries()) {
        params.append(key, value);
    }
    
    // Create hidden iframe for form submission
    const iframe = document.createElement('iframe');
    iframe.name = 'hidden_iframe';
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
    
    // Create temporary form
    const tempForm = document.createElement('form');
    tempForm.action = googleFormUrl;
    tempForm.method = 'POST';
    tempForm.target = 'hidden_iframe';
    
    for (let [key, value] of formData.entries()) {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = value;
        tempForm.appendChild(input);
    }
    
    document.body.appendChild(tempForm);
    tempForm.submit();
    
    // Show success message
    setTimeout(() => {
        showSuccessMessage();
        document.body.removeChild(tempForm);
        document.body.removeChild(iframe);
    }, 500);
}

function showSuccessMessage() {
    const formContainer = document.getElementById('applicationFormContainer');
    
    formContainer.innerHTML = `
        <div class="success-message active">
            <div class="success-icon">✅</div>
            <h3>Podanie wysłane!</h3>
            <p>Twoje podanie zostało pomyślnie wysłane. Odpowiedź otrzymasz na Discordzie.</p>
            <button class="btn btn-primary" onclick="closePodaniaModal()">Zamknij</button>
        </div>
    `;
}

// ========================================
// Export Podania functions
// ========================================

window.openPodaniaModal = openPodaniaModal;
window.closePodaniaModal = closePodaniaModal;
window.selectApplicationType = selectApplicationType;
window.backToSelection = backToSelection;
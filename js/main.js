// ========================================
// Configuration
// ========================================

const CONFIG = {
    serverIP: '83.168.105.17:30120',
    cfxServerCode: 'dmakaq',
    updateInterval: 10000,
    discordInvite: 'https://discord.gg/regnumrp',
    manualMode: false,
    manualPlayerCount: 45,
    manualMaxPlayers: 128,
};

// ========================================
// Player Count Fetching
// ========================================

async function fetchPlayerCount() {
    if (CONFIG.manualMode) {
        console.log('📝 Manual mode enabled');
        updatePlayerDisplay(CONFIG.manualPlayerCount, CONFIG.manualMaxPlayers);
        updateServerStatus(true);
        return;
    }
    
    console.log('🔄 Fetching player count...');
    
    try {
        const endpoint = `https://servers-frontend.fivem.net/api/servers/single/${CONFIG.cfxServerCode}`;
        console.log(`Trying: ${endpoint}`);
        const response = await fetch(endpoint);
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: Server not found`);
        }
        
        const data = await response.json();
        console.log('✅ Server data received:', data);
        
        let playerCount = 0;
        let maxPlayers = 128;
        
        if (data && data.Data) {
            playerCount = parseInt(data.Data.clients) || 
                         parseInt(data.Data.selfReportedClients) || 
                         parseInt(data.Data.players) || 0;
            
            maxPlayers = parseInt(data.Data.sv_maxclients) || 
                        parseInt(data.Data.svMaxclients) || 128;
        }
        
        console.log(`👥 Players: ${playerCount}/${maxPlayers}`);
        
        updatePlayerDisplay(playerCount, maxPlayers);
        updateServerStatus(true);
        
    } catch (error) {
        console.error('❌ Error fetching player count:', error);
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
    console.log(`Test URL: https://servers-frontend.fivem.net/api/servers/single/${CONFIG.cfxServerCode}`);
    console.log('=====================================');
}

function updatePlayerDisplay(current, max) {
    const playerCountElements = document.querySelectorAll('#playerCount');
    const playerCount2Element = document.getElementById('playerCount2');
    const maxPlayersElement = document.getElementById('maxPlayers');
    
    playerCountElements.forEach(element => {
        if (element) element.textContent = current;
    });
    
    if (playerCount2Element) {
        playerCount2Element.textContent = `${current} / ${max}`;
    }
    
    if (maxPlayersElement) {
        maxPlayersElement.textContent = max;
    }
}

function updateServerStatus(isOnline) {
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
}

// ========================================
// Navigation
// ========================================

function initNavigation() {
    const header = document.getElementById('header');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
    }
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 1024) {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
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
    window.location.href = `fivem://connect/cfx.re/join/${CONFIG.cfxServerCode}`;
    
    setTimeout(() => {
        alert(`Aby dołączyć do serwera:\n\n1. Uruchom FiveM\n2. Naciśnij F8 i wpisz: connect cfx.re/join/${CONFIG.cfxServerCode}\n\nLub wejdź przez:\n${CONFIG.discordInvite}`);
    }, 1000);
}

// ========================================
// Copy Server IP
// ========================================

function copyServerIP() {
    const serverIP = `connect cfx.re/join/${CONFIG.cfxServerCode}`;
    
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

const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
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
    
    const cards = document.querySelectorAll('.about-card, .feature-card, .staff-card, .stat-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.animationDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
}

function optimizePerformance() {
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

function initEasterEggs() {
    let konamiCode = [];
    const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    
    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.key);
        konamiCode = konamiCode.slice(-10);
        
        if (konamiCode.join('') === konamiPattern.join('')) {
            showNotification('🎮 Gratulacje! Odkryłeś sekretny kod!', 'success');
        }
    });
}

// ========================================
// Initialize Everything
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('%c🚀 Regnum Roleplay', 'color: #fa4953; font-size: 24px; font-weight: bold;');
    console.log('%cWitaj w konsoli developera!', 'color: #b40c1b; font-size: 14px;');
    
    initNavigation();
    initSmoothScrolling();
    initScrollAnimations();
    optimizePerformance();
    initEasterEggs();
    
    fetchPlayerCount();
    setInterval(fetchPlayerCount, CONFIG.updateInterval);
    
    const currentYear = new Date().getFullYear();
    document.querySelectorAll('.footer-bottom p').forEach(p => {
        if (p.textContent.includes('2024')) {
            p.textContent = p.textContent.replace('2024', currentYear);
        }
    });
});

window.scrollToSection = scrollToSection;
window.connectToServer = connectToServer;
window.copyServerIP = copyServerIP;

// ========================================
// Podania (Applications) System
// ========================================

// IMPORTANT: Use formResponse endpoint instead of viewform
const GOOGLE_FORMS = {
    'dzialalnosc': 'https://docs.google.com/forms/d/e/1FAIpQLScA0eDO-_EIxyBlq9QC9aF3yzYIERgIs4wxTQLer89MUz0bQQ/formResponse',
    'organizacja': 'https://docs.google.com/forms/d/e/1FAIpQLScETWppdvnmQplZJy9sWg8HtCqQaWgb6WiiVOPMMgGutK68pg/formResponse',
    'peda': 'https://docs.google.com/forms/d/e/1FAIpQLSfbNHm6p7jMZL6cl5mcKt69oQAYdA9pl76ByqK93pZ7nKS4SA/formResponse',
    'trial-support': 'https://docs.google.com/forms/d/e/1FAIpQLSfe2lqChEP1Pz6dZiMw5C7oLMZ9H8CYpvXBZHWSAkEYtXYEXQ/formResponse',
    'trial-recruiter': 'https://docs.google.com/forms/d/e/1FAIpQLSc8jf6tb_ZTZoJuPOXMGvI5bJA4KkxfJ5V1U6XY2LMkmhGuOA/formResponse',
};

const FORM_CONFIGS = {
    'dzialalnosc': {
        title: 'Podanie o działalność',
        description: 'Wypełnij formularz, aby złożyć podanie o prowadzenie działalności',
        fields: [
            { name: 'entry.1392446209', label: 'Imię', type: 'text', required: true },
            { name: 'entry.184294948', label: 'Wiek', type: 'text', required: true },
            { name: 'entry.437894828', label: 'Discord ID', type: 'text', required: true },
            { 
                name: 'entry.127153598', 
                label: 'Czy zapoznałeś się z informacją oraz wytycznymi co do działalności?', 
                type: 'select', 
                required: true, 
                options: ['Tak', 'Nie'] 
            },
            { 
                name: 'entry.532684954', 
                label: 'Czy zapoznałeś się z obowiązującym regulaminem firm?', 
                type: 'select', 
                required: true, 
                options: ['Tak', 'Nie'] 
            },
            { name: 'entry.2069942877', label: 'Nazwa Firmy', type: 'text', required: true },
            { name: 'entry.182995140', label: 'Jaki jest zamysł twojej firmy?', type: 'textarea', required: true },
            { name: 'entry.636871358', label: 'Co twoja firma wniesie na serwer?', type: 'textarea', required: true },
            { name: 'entry.411116480', label: 'Lokalizacja Firmy', type: 'textarea', required: true },
            { name: 'entry.1714576130', label: 'W jaki sposób twoja firma będzie zarabiać?', type: 'textarea', required: true },
            { name: 'entry.1033141881', label: 'Opisz swoją aktualną odgrywaną postać', type: 'textarea', required: true },
            { name: 'entry.1270000745', label: 'Dlaczego to właśnie ty powinieneś/aś dostać firmę?', type: 'textarea', required: true },
            { name: 'entry.1979208409', label: 'Jakie są twoje zainteresowania [OOC]?', type: 'textarea', required: true },
            { name: 'entry.673989797', label: 'Dlaczego uważasz, że taka firma byłaby pożądana u graczy?', type: 'textarea', required: true },
            { name: 'entry.1368237543', label: 'Czy masz doświadczenie z zarządzaniem? [OOC]', type: 'textarea', required: true },
        ]
    },
    'organizacja': {
        title: 'Podanie o Organizację/Gang',
        description: 'Wypełnij formularz, aby założyć organizację lub gang',
        fields: [
            { name: 'entry.1176766843', label: 'Adres email', type: 'text', required: true },
            { name: 'entry.1940706633', label: 'Discord ID', type: 'text', required: true },
            { name: 'entry.933736596', label: 'Wiek (Min. 16 Lat)', type: 'text', required: true },
            { name: 'entry.1681555082', label: 'Wymień osoby które dołączą do grupy przestępczej (Nick discord + ID discord) Minimum 10 osób', type: 'textarea', required: true },
            { 
                name: 'entry.799268697', 
                label: 'Rodzaj grupy przestępczej', 
                type: 'select', 
                required: true, 
                options: ['Organizacja', 'Gang - Ballas', 'Gang - Vagos', 'Gang - GSF', 'Gang - Marabunta'] 
            },
            { name: 'entry.454248832', label: 'Nazwa organizacji (Dotyczy tylko Organizacji | Nazwa nie może zawierać: Cyferek, Liczb, Polskich Nazw)', type: 'text', required: false },
            { name: 'entry.79087489', label: 'Dlaczego to właśnie ty powinieneś dostać organizacje/gang', type: 'textarea', required: true },
            { name: 'entry.1070482007', label: 'Co twoja organizacja/gang wniesie na serwer?', type: 'textarea', required: true },
            { 
                name: 'entry.2051617241', 
                label: 'Jakie macie doświadczenie w RP', 
                type: 'select', 
                required: true, 
                options: ['Słabe', 'Przeciętne', 'Bardzo Dobre', 'Hard RP'] 
            },
        ]
    },
    'peda': {
        title: 'Podanie o Peda',
        description: 'Złóż podanie o unikalnego peda dla swojej postaci',
        fields: [
            { name: 'entry.1168696317', label: 'Imię', type: 'text', required: true },
            { name: 'entry.2015826394', label: 'Wiek', type: 'text', required: true },
            { name: 'entry.1948920591', label: 'Discord ID', type: 'text', required: true },
            { 
                name: 'entry.29741602', 
                label: 'Czy jesteś w stanie zakupić drugą postać pod rozgrywkę na postaci z pedem? (2 Postać jest obowiązkowa)', 
                type: 'select', 
                required: true, 
                options: ['Tak', 'Nie'] 
            },
            { 
                name: 'entry.1323844569', 
                label: 'Jaki rodzaj peda chciałbyś odgrywać?', 
                type: 'select', 
                required: true, 
                options: ['Ped Inny (np. Starszy Pan/Pani)', 'Ped Zwierzaka (np. Pies,Kot)'] 
            },
            { name: 'entry.46533548', label: 'Od jakiego czasu grasz na serwerze?', type: 'text', required: true },
            { name: 'entry.366296895', label: 'Co i Kogo aktualnie odgrywasz na serwerze?', type: 'textarea', required: true },
            { name: 'entry.891215668', label: 'Model peda który masz zamiar odgrywać (Podaj link lub nazwę peda)', type: 'textarea', required: true },
            { name: 'entry.1885142044', label: 'Krótki opis planu  rozgrywki na postaci peda', type: 'textarea', required: true },
            { 
                name: 'entry.1528038621', 
                label: 'Czy posiadasz osoby z którymi będziesz odgrywał?', 
                type: 'select', 
                required: true, 
                options: ['Nie', 'Tak'] 
            },
            { name: 'entry.819531488', label: 'Czy posiadasz doświadczenie w odgrywaniu peda?', type: 'textarea', required: true },
            { name: 'entry.1473701144', label: 'Dlaczego akurat to twoje podanie o peda powinno zostać zaakceptowane?', type: 'textarea', required: true },
            
        ]
    },
    'trial-support': {
        title: 'Podanie na Trial Supporta',
        description: 'Aplikuj na stanowisko Trial Supporta',
        fields: [
            { name: 'entry.1935754366', label: 'Imię', type: 'text', required: true },
            { name: 'entry.714175555', label: 'Wiek', type: 'text', required: true },
            { name: 'entry.623552792', label: 'Discord ID', type: 'text', required: true },
            { name: 'entry.2056311245', label: 'Co Twoja obecność w Administracji wniesie do projektu?', type: 'textarea', required: true },
            { name: 'entry.346393848', label: 'Dlaczego chciałbyś/chciałabyś dołączyć do administracji?', type: 'textarea', required: true },
            { name: 'entry.842119622', label: 'Posiadasz doświadczenie w działaniach administracyjnych? (Jeśli tak, to jakie)', type: 'textarea', required: true },
            { name: 'entry.460308244', label: 'Jaką karę powinien otrzymać członek administracji za złamanie regulaminu serwera?', type: 'textarea', required: true },
            { name: 'entry.557489230', label: 'Czym jest dla Ciebie Roleplay? Opisz swoje podejście do RP', type: 'textarea', required: true },
            { name: 'entry.1898081229', label: 'Jakie przewinienie gracza ukarałbyś/ukarałabyś permamentnym wykluczeniem z rozgrywki?', type: 'textarea', required: true },
            { name: 'entry.1805251834', label: 'W jakim przypadku przerwałbyś/przerwałabyś akcje RP?', type: 'textarea', required: true },
            { name: 'entry.1003966389', label: 'Czy uważasz, że powinno praktykować się "cofanie akcji"?', type: 'textarea', required: true },
        ]
    },
    'trial-recruiter': {
        title: 'Podanie na Trial Recruitera',
        description: 'Aplikuj na stanowisko Trial Recruitera',
        fields: [
            { name: 'entry.1935754366', label: 'Imię', type: 'text', required: true },
            { name: 'entry.714175555', label: 'Wiek', type: 'text', required: true },
            { name: 'entry.623552792', label: 'Discord ID', type: 'text', required: true },
            { name: 'entry.2056311245', label: 'Co Twoja obecność w Recruiting Teamie wniesie do projektu?', type: 'textarea', required: true },
            { name: 'entry.346393848', label: 'Dlaczego chciałbyś/chciałabyś dołączyć do Recruiting Teamu?', type: 'textarea', required: true },
            { name: 'entry.842119622', label: 'Posiadasz doświadczenie jako WL CHECKER? (Jeśli tak, to jakie)', type: 'textarea', required: true },
            { name: 'entry.460308244', label: 'W jakim przypadku nie zaliczyłbyś pozytywnie whitelisty graczowi?', type: 'textarea', required: true },
            { name: 'entry.557489230', label: 'Czym jest dla Ciebie WL Checking?', type: 'textarea', required: true },
            { name: 'entry.1003966389', label: 'Czy uważasz, że powinno praktykować się "ułatwianie" wlki graczom którzy nie znają się aż tak na Role Play?', type: 'textarea', required: true },
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
    
    setTimeout(() => {
        // Only reset if we're not on the success screen
        const successMessage = document.querySelector('.success-message');
        if (!successMessage) {
            backToSelection();
        } else {
            // Reset everything manually for success screen
            const selectionDiv = document.getElementById('applicationTypeSelection');
            const formContainer = document.getElementById('applicationFormContainer');
            
            selectionDiv.style.display = 'block';
            formContainer.style.display = 'none';
            formContainer.innerHTML = `
                <div class="form-header">
                    <button class="back-btn" onclick="backToSelection()">← Wróć</button>
                    <h3 id="formTitle"></h3>
                    <p id="formDescription"></p>
                </div>
                <form id="applicationForm"></form>
            `;
            currentFormType = null;
        }
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
    
    formTitle.textContent = config.title;
    formDescription.textContent = config.description;
    
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
    
    const submitBtn = document.createElement('button');
    submitBtn.type = 'submit';
    submitBtn.className = 'form-submit';
    submitBtn.textContent = 'Wyślij podanie';
    form.appendChild(submitBtn);
    
    form.onsubmit = handleFormSubmit;
    
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
    
    const submitButton = e.target.querySelector('.form-submit');
    submitButton.disabled = true;
    submitButton.textContent = 'Wysyłanie...';
    
    const formData = new FormData(e.target);
    const googleFormUrl = GOOGLE_FORMS[currentFormType];
    
    console.log('Submitting to:', googleFormUrl);
    
    const iframe = document.createElement('iframe');
    iframe.name = 'hidden_iframe_' + Date.now();
    iframe.style.display = 'none';
    iframe.onload = function() {
        console.log('Form submitted!');
        setTimeout(() => {
            showSuccessMessage();
            if (iframe.parentNode) document.body.removeChild(iframe);
        }, 500);
    };
    
    document.body.appendChild(iframe);
    
    const tempForm = document.createElement('form');
    tempForm.action = googleFormUrl;
    tempForm.method = 'POST';
    tempForm.target = iframe.name;
    
    for (let [key, value] of formData.entries()) {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = value;
        tempForm.appendChild(input);
        console.log(`Field: ${key} = ${value}`);
    }
    
    document.body.appendChild(tempForm);
    tempForm.submit();
    
    setTimeout(() => {
        if (tempForm.parentNode) document.body.removeChild(tempForm);
    }, 1000);
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

window.openPodaniaModal = openPodaniaModal;
window.closePodaniaModal = closePodaniaModal;
window.selectApplicationType = selectApplicationType;
window.backToSelection = backToSelection;
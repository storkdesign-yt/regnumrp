# 🎯 REGNUM PANEL - KOMPLETNA INSTRUKCJA

## 📦 Co otrzymujesz?

Pełny, gotowy do uruchomienia panel zarządzania serwerem FiveM **Regnum** w kolorystyce czerwonej.

### Struktura Projektu

```
regnum-panel/
├── 📄 README.md              # Pełna dokumentacja
├── 📄 QUICKSTART.md          # Szybki start
├── 📄 DEPLOYMENT.md          # Instrukcje wdrożenia
├── 📄 package.json           # Zależności npm
├── 📄 vite.config.ts         # Konfiguracja Vite
├── 📄 tsconfig.json          # Konfiguracja TypeScript
├── 📄 index.html             # Główny plik HTML
│
├── 📁 public/                # Pliki statyczne
│   └── vite.svg              # Ikona
│
└── 📁 src/
    ├── 📁 components/        # Komponenty React
    │   ├── admin/            # Komponenty panelu admina
    │   ├── player/           # Komponenty strony gracza
    │   │   ├── Hero/         # Sekcja główna
    │   │   └── Navbar/       # Nawigacja
    │   └── shared/           # Komponenty współdzielone
    │       ├── Button/       # Przyciski
    │       ├── Card/         # Karty
    │       └── Input/        # Formularze
    │
    ├── 📁 config/            # Konfiguracja
    │   └── index.ts          # Ustawienia serwera
    │
    ├── 📁 layouts/           # Layouty
    │   ├── PlayerLayout.tsx  # Layout strony gracza
    │   └── AdminLayout.tsx   # Layout panelu admina
    │
    ├── 📁 pages/             # Strony
    │   ├── player/           # Strony dla graczy
    │   │   ├── HomePage.tsx
    │   │   ├── ApplicationPage.tsx
    │   │   ├── ChangelogPage.tsx
    │   │   └── StatusPage.tsx
    │   └── admin/            # Panel administracyjny
    │       ├── Dashboard.tsx
    │       ├── Applications.tsx
    │       ├── Players.tsx
    │       ├── Logs.tsx
    │       └── Settings.tsx
    │
    ├── 📁 store/             # Zustand state management
    │   └── index.ts          # Wszystkie store'y
    │
    ├── 📁 styles/            # Style globalne
    │   ├── variables.scss    # Zmienne kolorów (CZERWONE!)
    │   └── global.scss       # Style globalne
    │
    ├── 📁 types/             # TypeScript types
    │   └── index.ts          # Definicje typów
    │
    ├── App.tsx               # Główny komponent
    └── main.tsx              # Entry point
```

## 🚀 Szybki Start (3 kroki)

### 1. Instalacja
```bash
cd regnum-panel
npm install
```

### 2. Uruchomienie
```bash
npm run dev
```
Otwórz: http://localhost:5173/regnum-panel/

### 3. Konfiguracja
Edytuj `/src/config/index.ts` i ustaw swoje dane.

## 🎨 Kolorystyka

Panel wykorzystuje **czerwoną paletę kolorów**:

| Kolor | HEX | Zastosowanie |
|-------|-----|--------------|
| Primary | `#dc2626` | Główny kolor |
| Primary Light | `#ef4444` | Akcenty |
| Primary Dark | `#991b1b` | Cienie |

**Aby zmienić kolory:**
Edytuj `/src/styles/variables.scss`

## 📱 Co Działa?

### ✅ Gotowe Funkcjonalności

1. **Strona Główna (HomePage)**
   - Animowany Hero z statusem serwera
   - Sekcja funkcji (6 kart)
   - Statystyki serwera
   - Responsywny design

2. **Nawigacja (Navbar)**
   - Fixed navbar z blur effect
   - Responsywne menu mobilne
   - Linki do wszystkich sekcji

3. **Panel Admina (Dashboard)**
   - Statystyki podań
   - Ostatnie podania
   - Sidebar z nawigacją
   - System uprawnień

4. **Komponenty Współdzielone**
   - Button (5 wariantów)
   - Card (z hover effects)
   - Input/Textarea/Select

### 🚧 Do Dokończenia

Te strony mają placeholder'y (łatwo rozbudować):
- ApplicationPage (formularz podań)
- ChangelogPage (historia zmian)
- StatusPage (sprawdzanie statusu)
- AdminApplications (zarządzanie podaniami)
- AdminPlayers (zarządzanie graczami)
- AdminLogs (logi systemowe)
- AdminSettings (ustawienia)

## 🔧 Konfiguracja przed Deploy

### 1. Ustawienia Serwera
`/src/config/index.ts`:
```typescript
SERVER_NAME: 'Regnum',
SERVER_IP: 'connect regnum.pl',
MAX_PLAYERS: 64,
```

### 2. Discord OAuth
```typescript
DISCORD_CLIENT_ID: 'TWOJE_CLIENT_ID',
DISCORD_REDIRECT_URI: 'https://twoja-domena.pl/auth/callback',
```

### 3. JSONBin (baza danych)
```typescript
JSONBIN_API_KEY: 'TWOJ_API_KEY',
JSONBIN_BIN_ID: 'TWOJ_BIN_ID',
```

### 4. Discord Webhook
```typescript
DISCORD_WEBHOOK_URL: 'https://discord.com/api/webhooks/...',
```

### 5. Social Media
```typescript
SOCIAL: {
  discord: 'https://discord.gg/regnum',
  tiktok: 'https://tiktok.com/@regnum',
  instagram: 'https://instagram.com/regnum',
}
```

## 🌐 Deploy na GitHub Pages

### Automatyczny (Polecany)

```bash
# Zainstaluj gh-pages
npm install --save-dev gh-pages

# Dodaj do package.json scripts:
"deploy": "vite build && gh-pages -d dist"

# Deploy!
npm run deploy
```

### Manualny

```bash
# Build
npm run build

# Skopiuj dist do docs
cp -r dist docs

# Push do GitHub
git add .
git commit -m "Deploy"
git push

# Włącz GitHub Pages:
# Settings → Pages → Source: main → Folder: /docs
```

**WAŻNE:** Zmień `base` w `vite.config.ts`:
```typescript
base: '/NAZWA_TWOJEGO_REPO/',
```

## 🎯 Roadmap Rozwoju

### Faza 1 (Core) - ✅ GOTOWE
- [x] Struktura projektu
- [x] Routing
- [x] Komponenty podstawowe
- [x] Strona główna
- [x] Panel admina (struktura)
- [x] Kolorystyka czerwona

### Faza 2 (Funkcjonalności)
- [ ] Formularz podań
- [ ] Changelog z CRUD
- [ ] Status podania
- [ ] Discord OAuth integracja

### Faza 3 (Admin Panel)
- [ ] Zarządzanie podaniami (accept/reject)
- [ ] CRM graczy + blacklist
- [ ] Logi systemowe
- [ ] Ustawienia panelu

### Faza 4 (Backend)
- [ ] JSONBin API integracja
- [ ] Discord Webhooks
- [ ] Email notifications
- [ ] Backup system

## 💡 Tips & Tricks

### Zmiana Kolorów
Cały panel korzysta ze zmiennych SCSS, więc wystarczy zmienić w jednym miejscu:
```scss
// src/styles/variables.scss
$primary: #YOUR_COLOR;
```

### Dodawanie Nowych Stron
1. Stwórz komponent w `/src/pages/`
2. Dodaj route w `App.tsx`
3. Dodaj link w nawigacji

### Customizacja Animacji
Wszystkie animacje są w SCSS:
```scss
// src/components/player/Hero/Hero.scss
@keyframes fadeInUp { ... }
```

### Responsywność
Używamy breakpointów:
```scss
$breakpoint-sm: 640px;
$breakpoint-md: 768px;
$breakpoint-lg: 1024px;
$breakpoint-xl: 1280px;
```

## 📚 Dalsze Zasoby

- **Vite Docs:** https://vitejs.dev
- **React Router:** https://reactrouter.com
- **Zustand:** https://zustand-demo.pmnd.rs
- **SCSS Guide:** https://sass-lang.com/guide

## 🆘 Wsparcie

Jeśli masz pytania:
1. Sprawdź README.md
2. Przeczytaj DEPLOYMENT.md
3. Zobacz kod - jest dobrze skomentowany!

## 📝 Checkl Lista Pre-Deploy

- [ ] Zaktualizowałem CONFIG w `/src/config/index.ts`
- [ ] Ustawiłem poprawny `base` w `vite.config.ts`
- [ ] Zmieniłem social media linki
- [ ] Sprawdziłem działanie lokalnie (`npm run dev`)
- [ ] Zbudowałem projekt (`npm run build`)
- [ ] Przetestowałem build (`npm run preview`)
- [ ] Wdrożyłem na GitHub Pages
- [ ] Sprawdziłem działanie na produkcji

## 🎉 Gotowe!

Twój panel Regnum jest gotowy do użycia!

**Powodzenia z serwerem! 🚀**

---

*Stworzone z ❤️ dla społeczności Regnum FiveM*

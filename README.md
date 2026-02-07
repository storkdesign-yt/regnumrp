# 🚀 Regnum Panel - Zaawansowany System Zarządzania Serwerem FiveM

Panel zarządzania dla serwera FiveM **Regnum** z nowoczesnym interfejsem w kolorystyce czerwonej.

## ✨ Funkcje

### Strefa Gracza
- 🏠 **Landing Page** - Nowoczesna strona główna z animacjami
- 📝 **System Rekrutacji** - Formularz podań dla graczy
- 📜 **Changelog** - Historia zmian na serwerze
- 🔍 **Status Podania** - Sprawdzanie statusu aplikacji

### Panel Administracyjny
- 📊 **Dashboard** - Statystyki i przegląd podań
- 📋 **Zarządzanie Podaniami** - Akceptacja/odrzucanie z powodami
- 👥 **Mini-CRM Graczy** - Baza graczy z blacklistą
- 📑 **Logi Systemowe** - Pełna historia działań
- ⚙️ **Ustawienia** - Konfiguracja panelu

## 🛠️ Technologie

- **React 18** + TypeScript
- **Vite** - Szybki bundler
- **SCSS** - Zaawansowane stylowanie
- **Zustand** - Zarządzanie stanem
- **React Router** - Nawigacja
- **Remixicon** - Ikony

## 📦 Instalacja

```bash
# Zainstaluj zależności
npm install

# Uruchom w trybie deweloperskim
npm run dev

# Zbuduj dla produkcji
npm run build

# Podgląd buildu
npm run preview
```

## 🚀 Deployment na GitHub Pages

1. **Sklonuj repozytorium:**
```bash
git clone https://github.com/twoj-username/regnum-panel.git
cd regnum-panel
```

2. **Zainstaluj zależności:**
```bash
npm install
```

3. **Zbuduj projekt:**
```bash
npm run build
```

4. **Skopiuj zawartość folderu `dist` do swojego repozytorium GitHub**

5. **Włącz GitHub Pages:**
   - Przejdź do Settings → Pages
   - Wybierz branch (np. `main` lub `gh-pages`)
   - Wybierz folder `/root` lub `/docs` (w zależności gdzie umieścisz `dist`)
   - Zapisz

## ⚙️ Konfiguracja

Edytuj plik `/src/config/index.ts`:

```typescript
export const CONFIG = {
  SERVER_NAME: 'Regnum',
  SERVER_IP: 'connect regnum.pl',
  DISCORD_CLIENT_ID: 'YOUR_DISCORD_CLIENT_ID',
  JSONBIN_API_KEY: 'YOUR_JSONBIN_API_KEY',
  DISCORD_WEBHOOK_URL: 'YOUR_WEBHOOK_URL',
  // ... inne ustawienia
};
```

## 🎨 Kolorystyka

Panel wykorzystuje czerwoną paletę kolorów:
- Primary: `#dc2626`
- Primary Light: `#ef4444`
- Primary Dark: `#991b1b`

Kolory można zmienić w pliku `/src/styles/variables.scss`

## 📁 Struktura Projektu

```
regnum-panel/
├── public/              # Pliki statyczne
├── src/
│   ├── components/      # Komponenty React
│   │   ├── admin/       # Komponenty panelu admina
│   │   ├── player/      # Komponenty strony gracza
│   │   └── shared/      # Komponenty współdzielone
│   ├── config/          # Konfiguracja
│   ├── layouts/         # Layouty stron
│   ├── pages/           # Strony aplikacji
│   ├── store/           # Zustand store
│   ├── styles/          # Style globalne i zmienne
│   ├── types/           # TypeScript types
│   └── utils/           # Funkcje pomocnicze
├── index.html
├── package.json
└── vite.config.ts
```

## 🔐 Bezpieczeństwo

- Logowanie przez Discord OAuth2
- System uprawnień (Administrator, Moderator, Support)
- Zabezpieczenia przed spamem
- Walidacja danych

## 📱 Responsywność

Panel w pełni responsywny:
- 💻 Desktop (1920px+)
- 💻 Laptop (1280px+)
- 📱 Tablet (768px+)
- 📱 Mobile (320px+)

## 🤝 Wsparcie

W razie problemów:
1. Sprawdź Issues na GitHubie
2. Skontaktuj się na Discordzie
3. Przeczytaj dokumentację

## 📄 Licencja

Projekt stworzony dla serwera Regnum FiveM.

---

**Stworzono z ❤️ dla społeczności Regnum**

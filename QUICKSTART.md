# ⚡ Quick Start - Regnum Panel

## 1. Instalacja

```bash
npm install
```

## 2. Uruchomienie Lokalnie

```bash
npm run dev
```

Otwórz: http://localhost:5173/regnum-panel/

## 3. Konfiguracja

Edytuj `/src/config/index.ts`:

```typescript
SERVER_NAME: 'Regnum',              // Nazwa serwera
SERVER_IP: 'connect regnum.pl',     // IP serwera
DISCORD_CLIENT_ID: 'YOUR_ID',       // Discord OAuth
JSONBIN_API_KEY: 'YOUR_KEY',        // JSONBin dla bazy danych
DISCORD_WEBHOOK_URL: 'YOUR_URL',    // Webhook powiadomień
```

## 4. Build dla Produkcji

```bash
npm run build
```

Pliki w folderze `dist/`

## 5. Deploy na GitHub Pages

```bash
npm install --save-dev gh-pages
npm run deploy
```

## 6. Dostosowanie Kolorystyki

Edytuj `/src/styles/variables.scss`:

```scss
$primary: #dc2626;        // Zmień na swój kolor
$primary-light: #ef4444;
$primary-dark: #991b1b;
```

## Potrzebujesz Pomocy?

Przeczytaj:
- `README.md` - Pełna dokumentacja
- `DEPLOYMENT.md` - Instrukcje wdrożenia

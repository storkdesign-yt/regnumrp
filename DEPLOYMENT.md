# 📘 Instrukcja Wdrożenia na GitHub Pages

## Krok 1: Przygotowanie Repozytorium

1. **Utwórz nowe repozytorium na GitHubie:**
   - Nazwa: `regnum-panel` (lub dowolna)
   - Ustaw jako Public
   - NIE dodawaj README, .gitignore ani licencji (już mamy w projekcie)

2. **Sklonuj to repozytorium lokalnie:**
```bash
git clone https://github.com/TWOJA_NAZWA/regnum-panel.git
cd regnum-panel
```

## Krok 2: Dodanie Plików Projektu

Skopiuj wszystkie pliki z tego folderu do sklonowanego repozytorium.

## Krok 3: Konfiguracja dla GitHub Pages

1. **Zainstaluj gh-pages:**
```bash
npm install --save-dev gh-pages
```

2. **Dodaj do package.json (sekcja scripts):**
```json
"scripts": {
  "deploy": "vite build && gh-pages -d dist"
}
```

3. **Zaktualizuj vite.config.ts:**
Zmień `base: '/regnum-panel/'` na nazwę swojego repozytorium:
```typescript
base: '/NAZWA_TWOJEGO_REPO/',
```

## Krok 4: Build i Deploy

```bash
# Zainstaluj zależności
npm install

# Zbuduj projekt i wdróż
npm run deploy
```

## Krok 5: Konfiguracja GitHub Pages

1. Przejdź do swojego repozytorium na GitHubie
2. Settings → Pages
3. Source: wybierz branch `gh-pages`
4. Folder: wybierz `/ (root)`
5. Zapisz

Strona będzie dostępna pod adresem:
```
https://TWOJA_NAZWA.github.io/NAZWA_REPO/
```

## Metoda Alternatywna (bez gh-pages)

Jeśli wolisz manualnie:

1. **Zbuduj projekt:**
```bash
npm run build
```

2. **Skopiuj zawartość folderu `dist` do folderu `docs`:**
```bash
mkdir docs
cp -r dist/* docs/
```

3. **Commit i push:**
```bash
git add .
git commit -m "Deploy to GitHub Pages"
git push
```

4. **W ustawieniach GitHub Pages:**
   - Source: main branch
   - Folder: /docs

## Aktualizacja Strony

Przy każdej zmianie:

```bash
npm run deploy
```

lub manualnie:

```bash
npm run build
cp -r dist/* docs/
git add .
git commit -m "Update"
git push
```

## Ważne Uwagi

1. **Base URL:** Upewnij się, że `base` w `vite.config.ts` odpowiada nazwie repozytorium
2. **Routing:** React Router używa BrowserRouter z basename
3. **404:** GitHub Pages może wymagać dodatkowego pliku `404.html` dla SPA routing

## Dodatkowa Konfiguracja

**Plik 404.html dla SPA routing:**
Stwórz w folderze `public`:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <script>
      sessionStorage.redirect = location.href;
    </script>
    <meta http-equiv="refresh" content="0;URL='/'">
  </head>
</html>
```

## Troubleshooting

**Problem:** Strona nie ładuje się
- Sprawdź czy base URL jest poprawny
- Sprawdź czy GitHub Pages jest włączony
- Sprawdź czy branch `gh-pages` istnieje

**Problem:** Blank page
- Otwórz DevTools → Console
- Sprawdź błędy ładowania zasobów
- Zweryfikuj ścieżki w base URL

**Problem:** 404 przy odświeżeniu
- Dodaj plik `404.html` w `public`
- Lub użyj HashRouter zamiast BrowserRouter

## Wsparcie

Jeśli masz problemy, sprawdź:
- [Dokumentację Vite](https://vitejs.dev/guide/static-deploy.html)
- [GitHub Pages Docs](https://docs.github.com/en/pages)

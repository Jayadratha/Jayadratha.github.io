# Jayadratha Gayen – Academic Website

This repository contains the full source code for my professional academic website, generated on 2025-06-30.

## 🚀 Quick Start (GitHub Pages)

1. **Create a repository** named `jayadratha-gayen.github.io` on GitHub.
2. **Upload** all files and folders from this ZIP into the root of that repository.
3. Commit and push. GitHub Pages will automatically build and serve the site at `https://jayadratha-gayen.github.io`.
4. *(Optional)* Add a custom domain by creating a `CNAME` file containing your domain and updating DNS.

## 🌗 Day/Night Mode

– Toggle button in top-right lets visitors switch between light and dark themes. Preference is persisted in `localStorage`.

## 📈 Visitor Analytics

– Integrated Google Analytics 4 (replace `GA_MEASUREMENT_ID` in `index.html`).
– Private dashboard: append `?admin=true` to any page URL to view stats visible only to you.

## 🗂 Structure

```
assets/
  css/        → main.css, theme.css
  js/         → theme.js, analytics.js
  images/     → profile & graphics
files/         → cv.pdf (your resume) and other downloads
index.html … other pages
```

## 🛠 Local Development

You can preview locally with Python:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## 📄 License

Feel free to adapt for personal use. Attribution appreciated. © 2025 Jayadratha Gayen.

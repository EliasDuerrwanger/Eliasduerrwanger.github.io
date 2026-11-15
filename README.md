# Elias Dürrwanger – Photography

Minimal portfolio website for GitHub Pages (free).

## Files

```
index.html       Homepage – one random photo from HOME_IMAGES
work.html        Project grid (3 columns)
project.html     Slideshow for each project (opened via work.html)
about.html       Portrait + short bio + contact
impressum.html   Impressum – fill in the [placeholders] before going live!
404.html         Error page (GitHub uses it automatically)
css/style.css    Design
js/photos.js     <- the ONLY file you edit for photos and projects
js/main.js       Logic (no need to touch)
images/          Your photos, portrait.jpg, favicon.svg
.nojekyll        Empty file – do not delete
```

## Add your photos

Each project has its own folder: `images/big-bend/`, `images/purdue/`, `images/california/`,
`images/croatia/`, `images/alps/`.

1. Delete the placeholder photos in these folders.
2. Put your photos in the matching folder – resized to about 2000–2500 px on the long edge,
   300–600 KB each – and name them `01.jpg`, `02.jpg`, `03.jpg` ... (lowercase `.jpg`).
   `01.jpg` is the cover on the Work page.
3. Open `js/photos.js` and set `count` for each project to the number of photos in its folder.
   `HOME_IMAGES` lists the photos that may appear on the homepage (one is picked at random).
4. New project: create a new folder in `images/` (lowercase, no spaces) and copy one block in `PROJECTS`.
4. Replace `images/portrait.jpg` with your own portrait (same file name).

## Text

- Bio: `about.html`
- Impressum: `impressum.html` – add your address before publishing

## Test locally

Double-click `index.html` – everything works in the browser without a server.

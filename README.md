# Pearl Paradise Tours

A static website for **Pearl Paradise Tours** — Sri Lanka tour guides and custom itineraries. Structure and sections are inspired by [Sri Lanka Travel Partner](https://srilankatravelpartner.com/), with original branding and design.

## Contents

- **index.html** — Vite entry; single-page app with hero slider, day tours, rentals, services, testimonials, FAQ, and contact form
- **src/App.jsx** — Main React app (hero, itineraries, gallery, contact)
- **src/main.jsx** — React entry
- **css/style.css** — Layout and Pearl Paradise branding (ocean teal, pearl cream, gold accents)

## Run locally

```bash
npm install
npm run dev
```

Then visit `http://localhost:5173`. For a production build: `npm run build` (output in `dist/`).

## Customize

- **Copy & contact**: Edit `src/App.jsx` for phone, email, address, and any text.
- **Images**: Hero and gallery use local images in `images/` and `photo_gallery/`. Update paths in `App.jsx` or add new files.
- **Colors**: In `css/style.css`, change the `:root` variables (`--color-ocean`, `--color-gold`, `--color-pearl`, etc.) to match your brand.

## License

Use and modify as needed for Pearl Paradise Tours.

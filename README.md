# Pearl Paradise Tours

A static website for **Pearl Paradise Tours** — Sri Lanka tour guides and custom itineraries. Structure and sections are inspired by [Sri Lanka Travel Partner](https://srilankatravelpartner.com/), with original branding and design.

## Contents

- **index.html** — Single-page site with hero slider, day tours grid, tailor-made section, rentals, services, testimonials, FAQ, and contact form
- **css/style.css** — Layout and Pearl Paradise branding (ocean teal, pearl cream, gold accents)
- **js/main.js** — Hero slider, mobile menu, dropdowns, contact form feedback

## Run locally

Open `index.html` in a browser, or use a simple static server:

```bash
# Python 3
python -m http.server 8000

# Node (npx)
npx serve .
```

Then visit `http://localhost:8000`.

## Customize

- **Copy & contact**: Edit `index.html` for phone, email, address, and any text.
- **Images**: Hero and tour cards use Unsplash URLs. Replace with your own files (e.g. in an `images/` folder) and update the `style` or `src` attributes.
- **Colors**: In `css/style.css`, change the `:root` variables (`--color-ocean`, `--color-gold`, `--color-pearl`, etc.) to match your brand.

## License

Use and modify as needed for Pearl Paradise Tours.

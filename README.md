# Student relocation landing page

A static, single-page site for a personal housing-search service for international students. It uses plain HTML, CSS and a small amount of JavaScript, with no build step.

## Run it

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
```

## Placeholders to replace before launch

Search the project for these and swap in real values:

| Placeholder | Where |
| --- | --- |
| `[Business name]` | title, header, footer |
| `[Service city]` | title, hero, scope, FAQ, example report, footer |
| `[describe service area, e.g. districts or travel radius]` | FAQ "Which areas do you cover?" |
| `{{BOOKING_URL}}` | booking button in the final section |
| `[email@example.com]` | booking card and footer (also in the `mailto:` links) |
| `[+00 000 000 000]` and `https://wa.me/[number]` | WhatsApp contact in the booking card and footer |

Every "Book a free consultation" button elsewhere on the page scrolls to the booking section, so the external booking link only lives in one place.

## Files

- `index.html`: all content
- `styles.css`: design tokens at the top, then one block per section
- `script.js`: header theme switch, mobile menu, scroll reveals, the word-by-word statement reveal, and the example report tabs
- `assets/hero-contours.svg`: original hero line artwork
- `assets/favicon.svg`

## Notes

- The viewing report section is labelled as an illustrative example. Its property details are invented to show the format.
- All motion is turned off when the visitor's system asks for reduced motion.
- Content stays fully visible with JavaScript disabled.

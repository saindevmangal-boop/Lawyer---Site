# Advocate Narender Kumar — Website

A modern, responsive website for Advocate Narender Kumar (Advocate & Property Dealer, Palwal, Haryana).

## Folder Structure

```
lawyer-website/
├── index.html
├── about.html
├── services.html
├── property.html
├── contact.html
├── robots.txt
├── sitemap.xml
├── css/
│   ├── style.css        (main styles, tokens, components)
│   └── responsive.css   (media queries)
├── js/
│   └── script.js         (nav, dark mode, AOS/Swiper init, form validation, FAQ, counters)
├── images/               (SVG placeholders — swap for real photos)
└── README.md
```

## How to Use

1. Open `index.html` directly in a browser, or serve the folder with any static server
   (e.g. `npx serve .` or the VS Code "Live Server" extension) for the best experience.
2. Replace the placeholder SVGs in `images/` with real photographs:
   - `hero-law.svg` → hero background
   - `advocate-portrait.svg` → About section photo
   - `property1.svg` – `property6.svg` → property listing photos
   - `logo.svg`, `favicon.svg` → branding
3. Update contact details, office address, and property listings directly in the HTML files
   as needed — all client info is already filled in from the brief.
4. Replace the Google Maps embed URL in `contact.html` with your exact pinned location for
   a precise map (currently searches "Palwal, Haryana").
5. If you want the contact form to actually send emails, wire it up with **EmailJS**:
   - Add the EmailJS SDK script tag to `contact.html`.
   - Replace the `e.preventDefault()` success branch in `js/script.js`'s form handler with
     an `emailjs.send(...)` call using your service ID, template ID, and public key.

## Tech Used

- HTML5, CSS3, Vanilla JavaScript
- Bootstrap 5 grid utilities (CDN)
- Font Awesome 6 icons (CDN)
- Google Fonts — Poppins
- AOS (Animate on Scroll) library (CDN)
- Swiper.js for the testimonials carousel (CDN)

## Features Implemented

- Sticky, glassmorphism navigation with mobile hamburger menu
- Hero section with animated stat counters
- About, Services (12 cards), Property (6 listings), Why Choose Us, Testimonials (Swiper),
  FAQ accordion, and Contact sections/pages
- Dark mode toggle (session-persisted)
- Scroll progress bar, back-to-top button, WhatsApp & Call floating buttons
- Preloader animation
- Contact form with client-side validation (no backend — see EmailJS note above)
- SEO: meta tags, Open Graph tags, `LegalService` + `LocalBusiness`-style Schema.org
  markup, `robots.txt`, `sitemap.xml`
- Accessible: semantic HTML, ARIA labels on icon buttons, visible focus states, alt text
  on all images, `prefers-reduced-motion` support

## Notes

- All images are lightweight inline SVG placeholders so the site works immediately with
  zero dependencies — swap them for real photography before going live.
- The contact form validates on the client only; connect it to EmailJS, a backend endpoint,
  or a form service (e.g. Formspree) to actually deliver submissions.
- Update `https://advocatenarenderkumar.example/` throughout (canonical tags, sitemap,
  Open Graph) to the real production domain once deployed.

---
© 2026 Advocate Narender Kumar. All Rights Reserved.
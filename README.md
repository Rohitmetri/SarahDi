# Sarah Di ❤️ — Magical 3D World (Version 3)

A colorful, mobile-friendly personal website built with **HTML, CSS, vanilla JavaScript, Three.js, and GSAP**. Includes animated 3D objects, a rotating rainbow portrait ring, editable memory gallery, a treasured-photo section, a 3D envelope greeting, a surprise gift, a love-letter typewriter, lightbox navigation, and optional music.

## Quick start

1. Extract the ZIP. Keep the folder structure.
2. Open `index.html` in a browser, or run `python -m http.server 8000` from inside the site folder and visit `http://localhost:8000`.
3. Internet access is needed for the CDN versions of Three.js, GSAP, and Google Fonts. Personal photos remain local to your own website.

## Profile picture

Place Sarah Di's real photograph in `assets/images/sarah.jpg`. It appears in the hero's circular rainbow frame and the About section. Use a centered portrait.

## Add or change gallery memories — SOURCE CODE ONLY

1. Place your photo files inside `assets/images/`.
2. Open **`script.js`** in a code editor.
3. Find `const memories = [` near the start, and edit entries like this:

```js
const memories = [
  {
    src: 'assets/images/memory1.jpg',
    title: 'Beautiful Memory',
    description: 'A special moment with Sarah Di ❤️'
  },
  {
    src: 'assets/images/memory2.jpg',
    title: 'Happy Moments',
    description: 'Memories that last forever 💖'
  }
];
```

Add as many objects as you want. Each becomes a new interactive flip-card automatically. The `src` can also refer to a different local image path. There is **no photo upload UI, backend, or database**. If an image is missing, the card and lightbox show a pretty fallback rather than a broken image. Click or tap any gallery card for a larger view, and use the previous/next arrows or keyboard left/right keys to move between memories.

## Treasured memorable photo

Place your favorite single photo at `assets/images/memorable-photo.jpg`. This is the separate “One Photo. A Million Feelings” section. It also has a fallback if you haven't added the image.

## 3D greeting-card envelope

Tap the envelope or its glowing heart seal in the “A Special Greeting for Sarah Di ❤️” section. The envelope opens, and a heartfelt greeting card slides out with a 3D flip and confetti. Tap “Close the greeting” to replay. Edit the text in `index.html` inside the `id="greeting-card"` element.

## Optional music

Place an appropriately licensed audio file at `assets/audio/background.mp3`. The floating play/pause button only plays audio after interaction. No music is included in the download.

## Other personal messages

- `#typewriter` in `index.html` → long love letter.
- `#surprise-message` in `index.html` → gift surprise.
- `#greeting-card` in `index.html` → envelope greeting.

## Compatibility & performance

Responsive layouts for mobiles, tablets and desktops. 3D rendering scales down pixel density and particle counts on mobile, and full animations are disabled for users who prefer reduced motion. Some older devices may disable WebGL; the website still displays its CSS decorations and all written content. Keep 3D external CDNs available when publishing.

## Publishing

Upload the entire folder to your web host (Netlify, Vercel, GitHub Pages, etc.), including the `assets` folder. Do not upload the ZIP as your website's homepage — extract it first.


## V6: Three-page birthday greeting
Open the animated envelope in the Greeting card section to read three decorated pages. Page 1 preserves the original shayari; page 2 is an affectionate note; page 3 contains birthday blessings, a prayer, and the signature “Made by your cute brother Rohit 🥹❤️🫂”. Use Previous and Next to turn pages. The footer has also been updated with Rohit's signature. To edit messages, open `index.html` and find `data-greeting-page`.

## V7: Gallery visibility, deeper colors, and favicon
- The gallery's 3D cards now have full-sized inner faces and render even before the photos are added. Edit `memories` in `script.js` to set image paths, titles, and descriptions.
- Memories is deep indigo/navy with neon pastel cards; the letter and footer use darker jewel tones.
- Put Sarah's actual portrait at `assets/images/sarah.jpg`. The browser favicon automatically switches to her circular portrait with a rainbow ring. Until then, `assets/images/favicon.svg` displays a decorative placeholder. The static `assets/images/apple-touch-icon.png` is a placeholder for home-screen bookmarks and can be replaced with her photo.
- The ZIP does not contain Sarah's portrait or personal memory photos because no photograph was supplied.

## V8: Dark & light premium mix

The website now alternates elegant light areas and cinematic deep navy/purple areas: light hero, light About, dark Memories, light Forever Photo, dark Birthday, light Special Things, dark Greeting, dark Love Letter, light Surprise, and dark Footer. Mobile navigation and text colors are adjusted to remain readable. This is an integrated visual style, not a switchable theme toggle.


## Mixed-size memory photos
The gallery now supports portrait, square, and landscape photos automatically.

Just put your image files in `assets/images/` and update the `memories` array in `script.js`.
The website detects the image shape automatically and shows:
- landscape photos in wider cards
- portrait photos in taller cards
- square photos in balanced cards

So you can safely use a mix of horizontal and vertical memories.


## V10 — Photos installed from the supplied RAR
This package includes Sarah Di's actual personal photos, with the following placements:
- Hero rainbow ring: `assets/images/smiling.png`
- Meet Sarah Di portrait: `assets/images/cover_photo.jpg`
- One Photo, A Million Feelings: `assets/images/with sis.jpg`
- Memories: over 20 real photos from the supplied archive, in an automatic mixed horizontal/vertical gallery.
- Browser favicon and mobile home-screen icon: generated from `smiling.png`.

To change the gallery, edit the `const memories` array at the beginning of `script.js`. The original images are retained at their original quality in `assets/images/`.


## V11 gallery reliability fix
If the older build shows butterfly/flower placeholders instead of real photos, use V11. The prior version initially set photos to `display:none` while also lazy-loading them, which could prevent offscreen images from loading. V11 loads memory thumbnails reliably without hiding the image element, preserves the original images and captions, and contains the card transforms to avoid oversized/distorted photo cards. All 23 memory paths are verified against the included image files.

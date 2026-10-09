# Testing Tamada Companion

Tamada Companion does not yet have automated tests. Complete this checklist for release candidates and for changes involving shared rendering, cultural content, storage, audio, caching, or responsive behavior.

## Start-up and navigation

- [ ] Run `./server.ps1` without an error.
- [ ] Open `http://localhost:8081` and confirm the main toast guide renders.
- [ ] Confirm the browser console has no uncaught errors on initial load.
- [ ] Move forward and backward through all ten toast cards.
- [ ] Open Canonical Toasts, Etiquette & Rules, and Saved Vault.
- [ ] Confirm an unknown path returns HTTP 404.

## Toast guide and cultural content

- [ ] Confirm each card shows Georgian text, English translation, pronunciation, cultural meaning, response, and suggested song.
- [ ] Review changed Georgian text with a qualified native speaker.
- [ ] Review changed ceremonial guidance with a knowledgeable cultural practitioner.
- [ ] Confirm solemn and celebratory etiquette is not accidentally conflated.

## Generator and clipboard

- [ ] Generate a wedding toast with and without a guest name.
- [ ] Generate a birthday toast with and without a guest name.
- [ ] Check every other occasion and document the current shared fallback wording.
- [ ] Copy a canonical toast and a generated speech over `localhost` or HTTPS.
- [ ] Confirm clipboard failure does not make the rest of the app unusable.
- [ ] Confirm the unfinished custom-toast button is not represented as a completed feature.

## Saved vault and privacy

- [ ] Save a canonical toast and confirm duplicate saves are prevented.
- [ ] Reload the page and confirm the saved toast persists.
- [ ] Remove the saved toast.
- [ ] Clear site data and confirm the app recovers to its default state.
- [ ] Confirm normal use sends no application data to third parties.

## Audio

- [ ] Trigger the glass, horn, and choral effects after a user gesture.
- [ ] Start and stop the Panduri-inspired pattern repeatedly.
- [ ] Switch tabs while the pattern is active and confirm it remains controllable.
- [ ] Test with muted audio and with Web Audio unavailable.
- [ ] Confirm core content remains usable without sound.

## Offline and installability

- [ ] Load the app once, then verify cached pages and assets while offline.
- [ ] Confirm service-worker updates do not leave stale HTML or JavaScript active.
- [ ] Confirm the web manifest loads without an error.
- [ ] Record any installability warning about data-URI icons.

## Responsive and accessibility checks

- [ ] Test at approximately 375 px, 768 px, and 1280 px viewport widths.
- [ ] Zoom to 200% and confirm primary controls remain reachable.
- [ ] Navigate all controls with the keyboard and verify visible focus.
- [ ] Check modal focus entry, containment, and return.
- [ ] Check screen-reader names for icon-heavy controls.
- [ ] Check the experience with reduced-motion enabled.
- [ ] Run a browser accessibility audit and record unresolved findings.

## Android scaffold

- [ ] Do not report Android as supported until required assets and build files exist.
- [ ] When completed, verify offline assets, JavaScript, storage, clipboard behavior, audio, and back navigation in the WebView.

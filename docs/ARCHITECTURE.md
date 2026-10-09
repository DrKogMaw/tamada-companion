# Tamada Companion architecture

## Overview

Tamada Companion is a static, client-side application built with native ECMAScript modules, HTML, and CSS. It has no runtime framework, package manager, backend, database, or external content API.

```text
index.html
    ├── manifest.json
    ├── sw.js ───────────── Cache Storage
    └── js/app.js
          ├── js/toastData.js
          ├── js/audio.js ── Web Audio API
          ├── localStorage
          └── Clipboard API
```

## Rendering and state

`js/app.js` owns a small in-memory state object and re-renders the application into `#app` using HTML template strings. It tracks the selected toast, active tab, saved toasts, and Panduri playback state. Event handlers are attached after each render, while several actions are exposed on `window` for inline handlers.

This architecture is compact, but changes must account for full re-renders, lost element state, global handler names, timer cleanup, and safe handling of text inserted into HTML strings.

## Content model

`js/toastData.js` contains:

- ten canonical toast records;
- five etiquette records;
- five occasion choices for the generator;
- application title and introductory copy.

Toast records include Georgian and English text, pronunciation guidance, cultural meaning, a traditional response, and a suggested song. Content review should be separate from code review and should include a qualified Georgian-language and cultural reviewer.

## Persistence

The saved vault uses browser `localStorage` under the key `tamada_saved_toasts`. There is no schema version or migration layer. Changes to saved records should remain backward-compatible or add explicit migration and recovery behavior.

## Audio

`js/audio.js` synthesizes all current sounds with the Web Audio API. It does not download recordings. Audio contexts begin after user interaction because browsers commonly block autoplay. The Panduri-inspired pattern uses a repeating timer and must always retain a reliable stop path.

## Offline behavior

`sw.js` uses a cache-first strategy for a fixed list of local assets. The cache is currently named `tamada-companion-v1`. There is no activation handler to remove older caches and no update notification, so cache changes require deliberate versioning and regression testing.

## Local server

`server.ps1` serves the repository root on port `8081` and is intended only for local development. It has no TLS, authentication, production hardening, or advanced cache headers.

## Android scaffold

The Android activity creates a WebView with JavaScript and DOM storage enabled, then loads `file:///android_asset/index.html`. The referenced asset is not present and the project lacks the files needed for a reproducible Gradle build. Treat this directory as design scaffolding rather than a supported application target.

## Recommended evolution

1. Separate data, view rendering, and state transitions for testability.
2. Escape user-provided text and remove inline JavaScript composition.
3. Add automated tests for navigation, generation, persistence, caching, and audio state.
4. Add explicit service-worker cache lifecycle handling.
5. Complete or remove the Android wrapper before advertising Android support.

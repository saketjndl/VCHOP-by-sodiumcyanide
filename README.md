<div align="center">
  <img src="icons/VCHOP.png" alt="VCHOP shield" width="96" />
  <h1>VCHOP — VIT CGPA Privacy & Dark Mode Companion</h1>
  <p><em>Your CGPA is your business. Period.</em></p>
</div>

## Overview

VCHOP is a Manifest V3 browser extension designed for the VIT Bhopal portal (`vtop.vitbhopal.ac.in`). It blocks the CGPA dashboard API request, hides any fallback widgets that expose CGPA/CREDIT data, and gives you a persistent dark mode that activates instantly on every page load.

## Please ⭐ the repository if you liked the project. Thank You!

## Features

- **CGPA Request Blocking** – Uses Declarative Net Request rules to stop `vtop/get/dashboard/current/cgpa/credits` from ever reaching the server.
- **DOM Cleanup** – Removes the CGPA widget and the “CGPA and CREDIT Status” card (including “Error loading content” placeholders) on load and during dynamic updates.
- **Instant Dark Mode** – Persists your preference via `chrome.storage.sync` plus a local cache, ensuring the page renders in dark mode from the very first paint.
- **Elegant Popup UI** – A single-toggle interface with VCHOP branding (`~ by sodiumcyanide`) for quick control and feedback.

## File Structure

```
VCHOP/
├── manifest.json         # MV3 definition with permissions, DNR ruleset, content script
├── rules.json            # Declarative Net Request rule that blocks the CGPA endpoint
├── content.js            # DOM cleanup + dark mode injection and message handler
├── popup.html            # Dark themed control UI with branding + embedded styles
├── popup.js              # Toggle logic, storage sync, and messaging to the tab
└── icons/
    └── VCHOP.png         # Extension/action icon used across all sizes
```

## Getting Started

1. **Clone the repo**
   ```bash
   git clone https://github.com/saketjndl/VCHOP-by-sodiumcyanide.git
   cd VCHOP-by-sodiumcyanide
   ```
2. **Load as an unpacked extension**
   - Chrome/Edge: `chrome://extensions` → enable Developer Mode → “Load unpacked” → choose this folder.
   - Firefox (Manifest V3 preview / Nightly): `about:debugging#/runtime/this-firefox` → “Load Temporary Add-on” → select `manifest.json`.
3. **Visit VTOP**
   - Navigate to `https://vtop.vitbhopal.ac.in/vtop/`.
   - Open the popup to toggle dark mode. Any CGPA widget should already be hidden.

## Development Notes

- **Manifest:** Runs the content script at `document_start` to minimize flashing when enabling dark mode.
- **Storage:** Uses `chrome.storage.sync` for cross-device persistence plus `localStorage` for instant first-paint styling.
- **Dark Mode Styles:** Injected once per page via a `<style>` node (`extension-dark-mode-style`), toggling the `extension-dark-mode` class on `<body>`.
- **Messaging:** Popup sends `EXT_DARK_MODE_CHANGED` to the active tab whenever the toggle changes; the content script listens and updates immediately.

## Packaging

1. Bump the `version` in `manifest.json`.
2. Run `zip -r VCHOP.zip . -x \"*.git*\" \"_metadata/*\"`.
3. Upload `VCHOP.zip` to the Chrome Web Store or your target browser store.

## Roadmap Ideas

- Optional whitelist/soft-block mode to show CGPA only on demand.
- Additional theme presets (e.g., AMOLED, sepia).
- Telemetry-free analytics (purely local logs) to surface blocked request counts.

## Important Disclaimer: VCHOP's Purpose and Ethical Use

VCHOP is a browser extension developed for personal privacy enhancement and user experience customization on the vtop.vitbhopal.ac.in college portal. We want to be absolutely clear about its intent and functionality:

1. Client-Side Operation Only: VCHOP operates exclusively within your web browser. It modifies what you see on your screen and how your browser interacts with network requests to display content. It does NOT interact with, modify, store, or transmit any data on the college's servers. Your academic records, personal information, or any server-side data remain untouched.

2. Privacy-Focused: The primary function of VCHOP is to prevent the display of your CGPA on your personal dashboard. This is a privacy feature, ensuring that sensitive academic information is not inadvertently exposed to others who might view your screen.

3. User Experience Enhancement: The Dark Mode feature is solely for aesthetic preference and to reduce eye strain, enhancing your personal browsing experience on the portal.
No Unauthorized Access or Manipulation: VCHOP does NOT bypass any security measures, gain unauthorized access to information, or alter any grades, credentials, or official data. It does NOT perform any actions that could be considered hacking, exploiting vulnerabilities, or malicious interference with the college's systems.

4. Adherence to College Policies: While VCHOP modifies your personal browsing experience, it is designed with respect for the college's digital environment. It aims to be a silent, unobtrusive tool that simply gives you more control over your own view of the portal.
Your Responsibility: By installing and using VCHOP, you acknowledge that you are choosing to customize your personal browser's interaction with the college portal. You are responsible for understanding how browser extensions work and their impact on your own browsing experience.

In essence, VCHOP acts as a personal screen filter and content blocker, empowering you to control how the portal's information is presented to you, without any intent or capability to harm, compromise, or misuse the college's systems or data.

## License

MIT © sodiumcyanide


# EasyTranslate v2

Mobile-first English <-> German translation using Transformers.js and Xenova OPUS-MT models in the browser.

## Important
Do not open `index.html` directly with `file://` on iPhone/Safari. The browser needs an HTTPS origin for the browser ML stack and model downloads.

Deploy this folder as a static site on any HTTPS host, e.g. Vercel. No API key is required and there is no paid translation API.

The app prefers WebGPU when available and uses a quantized q4 model, with a WASM fallback. Models are cached by the browser after the first download.

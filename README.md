# EasyTranslate v3

Deutsch ↔ English Übersetzung direkt im Browser – ohne API-Key, ohne kostenpflichtige Übersetzungs-API und ohne eigenen Server.

## V3 – iPhone/Safari-Stabilität

V3 deaktiviert WebGPU bewusst und nutzt für die Übersetzung **WASM/CPU mit Q4**. Das vermeidet die Safari-WebContent-Abstürze, die bei WebGPU auf manchen iPhones auftreten können.

Die App muss über HTTPS geöffnet werden (z. B. Vercel). Beim ersten Übersetzen werden die benötigten Modelldateien aus dem Hugging-Face-Modellrepository geladen und anschließend vom Browser gecacht.

## Deployment

Die Dateien `index.html` und `vercel.json` können in das bestehende GitHub-Repository `Easy-translate` kopiert/ersetzt werden. Vercel übernimmt die neue Version anschließend automatisch.

## Modelle

- `Xenova/opus-mt-de-en`
- `Xenova/opus-mt-en-de`

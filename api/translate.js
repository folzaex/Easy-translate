export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  try {
    const { text, source, target } = req.body || {};
    if (!text || !source || !target) return res.status(400).json({ error: "Fehlende Angaben" });
    if (!["de","en"].includes(source) || !["de","en"].includes(target))
      return res.status(400).json({ error: "Nur Deutsch und Englisch werden unterstützt." });
    if (source === target) return res.status(200).json({ translation: text });

    const hosts = [
      "https://lingva.ml",
      "https://translate.igna.rocks",
      "https://translate.plausibility.cloud"
    ];
    let last = "Übersetzungsdienst nicht erreichbar.";
    for (const host of hosts) {
      try {
        const url = `${host}/api/v1/${source}/${target}/${encodeURIComponent(text)}`;
        const r = await fetch(url, { headers: { "User-Agent": "EasyTranslate/8" } });
        if (!r.ok) { last = `Dienst antwortete mit ${r.status}.`; continue; }
        const data = await r.json();
        if (data && data.translation) return res.status(200).json({ translation: data.translation });
        last = data?.error || "Keine Übersetzung erhalten.";
      } catch (e) { last = e?.message || last; }
    }
    return res.status(502).json({ error: last });
  } catch (e) {
    return res.status(500).json({ error: "Technischer Fehler bei der Übersetzung." });
  }
}

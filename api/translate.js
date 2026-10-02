export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({error:"Method not allowed"});
  const {text, source, target} = req.body || {};
  if (!text || !source || !target) return res.status(400).json({error:"Fehlende Angaben"});
  if (!["de","en"].includes(source) || !["de","en"].includes(target))
    return res.status(400).json({error:"Nur Deutsch und Englisch."});
  if (source === target) return res.status(200).json({translation:text});

  // Lingva documents both GET and POST REST v1. We use POST first.
  const hosts = [
    "https://lingva.ml",
    "https://translate.igna.rocks",
    "https://translate.plausibility.cloud",
    "https://translate.dr460nf1r3.org"
  ];
  let errors=[];
  for (const host of hosts) {
    try {
      const post = await fetch(`${host}/api/v1/${source}/${target}`, {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({query:text})
      });
      const pdata = await post.json().catch(()=>null);
      if (post.ok && pdata?.translation) return res.status(200).json({translation:pdata.translation});

      // Fallback to the documented GET endpoint for this instance.
      const get = await fetch(`${host}/api/v1/${source}/${target}/${encodeURIComponent(text)}`);
      const gdata = await get.json().catch(()=>null);
      if (get.ok && gdata?.translation) return res.status(200).json({translation:gdata.translation});

      errors.push(`${host}: ${post.status}/${get.status}`);
    } catch(e) {
      errors.push(`${host}: ${e?.message || "network error"}`);
    }
  }
  return res.status(502).json({error:"Keine der kostenlosen Lingva-Instanzen hat geantwortet. "+errors.join(" | ")});
}

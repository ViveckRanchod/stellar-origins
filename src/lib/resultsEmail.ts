import { final, galaxies, landing, results, type GalaxyId } from "@/content";

type Score = { id: GalaxyId; percent: number };

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const rich = (s: string) => esc(s).replace(/\*\*(.+?)\*\*/g, "<strong style=\"color:#f4f0ff\">$1</strong>");

// The results email: tables + inline styles, because email apps ignore most modern CSS.
// Colours match globals.css (void, midnight, lilac, ash, lavender). Images need the site's full address.
export function resultsEmail(scores: Score[], site: string) {
  const top = galaxies[scores[0].id];
  const e = final.email;

  const rows = scores
    .map(({ id, percent }, i) => {
      const colour = i === 0 ? "#b36ef5" : "#9382ff";
      return `
      <tr><td style="padding:14px 0 6px;font-size:15px;color:#f4f0ff">${esc(galaxies[id].name)}</td>
          <td align="right" style="padding:14px 0 6px;font-size:15px;font-weight:600;color:${i === 0 ? "#b36ef5" : "#f4f0ff"}">${percent}%</td></tr>
      <tr><td colspan="2" style="padding:0">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
          ${percent > 0 ? `<td width="${percent}%" style="height:6px;background:${colour};border-radius:3px;font-size:0;line-height:0">&nbsp;</td>` : ""}
          ${percent < 100 ? `<td style="height:6px;background:#1c1640;border-radius:3px;font-size:0;line-height:0">&nbsp;</td>` : ""}
        </tr></table>
      </td></tr>`;
    })
    .join("");

  const html = `<!doctype html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><meta name="color-scheme" content="dark"><title>${esc(e.subject)}</title></head>
<body style="margin:0;padding:0;background:#030014">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#030014;font-family:'Hanken Grotesk',Helvetica,Arial,sans-serif;color:#a8a6b7">
<tr><td align="center" style="padding:32px 16px">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px">
    <tr><td align="center" style="padding-bottom:24px">
      <img src="${site}${landing.logo}" alt="${esc(landing.logoAlt)}" width="96" style="display:block;width:96px;height:auto;border:0">
    </td></tr>
    <tr><td align="center" style="font-size:28px;line-height:1.25;font-weight:600;color:#f4f0ff;padding-bottom:10px">${esc(e.heading)}</td></tr>
    <tr><td align="center" style="font-size:16px;line-height:1.6;padding-bottom:28px">${rich(e.intro)}</td></tr>

    <tr><td style="background:#060317;border:1px solid #1c1640;border-radius:12px;overflow:hidden">
      <img src="${site}${top.image}" alt="" width="560" style="display:block;width:100%;height:auto;border:0;border-radius:12px 12px 0 0">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td style="padding:24px">
        <div style="font-family:'JetBrains Mono',Consolas,monospace;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#918ea0;padding-bottom:6px">${esc(results.rank(1))} · ${scores[0].percent}%</div>
        <div style="font-size:24px;font-weight:600;color:#f4f0ff;padding-bottom:4px">${esc(top.name)}</div>
        <div style="font-style:italic;padding-bottom:14px">${esc(top.tagline)}</div>
        <div style="font-size:15px;line-height:1.6;color:#f4f0ff">${rich(top.topMatch)}</div>
      </td></tr></table>
    </td></tr>

    <tr><td style="padding:32px 0 4px;font-family:'JetBrains Mono',Consolas,monospace;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#918ea0">${esc(e.allGalaxies)}</td></tr>
    <tr><td><table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows}</table></td></tr>

    <tr><td align="center" style="padding:36px 0 8px">
      <a href="${site}/results" style="display:inline-block;background:#5046e4;color:#ffffff;text-decoration:none;font-weight:600;font-size:15px;padding:14px 28px;border-radius:999px">${esc(e.button)}</a>
    </td></tr>
    <tr><td align="center" style="padding-top:24px;font-size:12px;color:#54525f">Stellar Origins · ${esc(landing.logoAlt)}</td></tr>
  </table>
</td></tr></table>
</body></html>`;

  // Plain-text copy for email apps that don't show HTML.
  const text = [e.heading, "", e.intro.replace(/\*\*/g, ""), "", ...scores.map((s) => `${galaxies[s.id].name}: ${s.percent}%`), "", `${e.button}: ${site}/results`].join("\n");

  return { html, text };
}

import { final, galaxies, landing, results, type GalaxyId } from "@/content";

type Score = { id: GalaxyId; percent: number };

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const rich = (s: string) => esc(s).replace(/\*\*(.+?)\*\*/g, "<strong style=\"color:#f4f0ff\">$1</strong>");

// The results email: tables + inline styles, because email apps ignore most modern CSS.
// Colours match globals.css (void, midnight, lilac, ash, lavender). Images need the site's full address.
export function resultsEmail(scores: Score[], site: string) {
  const e = final.email;

  // One card per galaxy, like the results page: picture with rank, name and % laid over it.
  // background-image shows in Gmail and Apple Mail; Outlook on Windows shows the dark fill instead.
  const card = ({ id, percent }: Score, i: number) => {
    const g = galaxies[id];
    const top = i === 0;
    const img = `${site}${g.image}`;
    return `
    <tr><td style="padding-bottom:20px">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#060317;border:1px solid #1c1640;border-radius:12px;overflow:hidden">
        <tr><td background="${img}" bgcolor="#10093a" height="${top ? 320 : 220}" valign="bottom" style="height:${top ? 320 : 220}px;background:#10093a url('${img}') center / cover no-repeat;border-radius:12px 12px 0 0">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:rgba(3,0,20,0.72)"><tr>
            <td valign="bottom" style="padding:18px 20px">
              <div style="font-family:'JetBrains Mono',Consolas,monospace;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#a8a6b7;padding-bottom:4px">${esc(results.rank(i + 1))}</div>
              <div style="font-size:${top ? 28 : 22}px;line-height:1.2;font-weight:600;color:#f4f0ff">${esc(g.name)}</div>
            </td>
            <td align="right" valign="bottom" style="padding:18px 20px;font-size:${top ? 56 : 40}px;line-height:1;font-weight:600;color:${top ? "#b36ef5" : "#f4f0ff"};white-space:nowrap">${percent}%</td>
          </tr></table>
        </td></tr>
        <tr><td style="padding:18px 20px 20px">
          <div style="font-style:italic${top ? ";padding-bottom:12px" : ""}">${esc(g.tagline)}</div>
          ${top ? `<div style="font-size:15px;line-height:1.6;color:#f4f0ff">${rich(g.topMatch)}</div>` : ""}
        </td></tr>
      </table>
    </td></tr>`;
  };

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

    ${scores.map(card).join("")}

    <tr><td align="center" style="padding:16px 0 8px">
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

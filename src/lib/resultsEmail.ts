import { final, landing } from "@/content";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// The results email: a short note; the feedback report and documents travel as PDF attachments.
// Tables + inline styles, because email apps ignore most modern CSS. Colours match globals.css.
export function resultsEmail(site: string) {
  const e = final.email;
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
    <tr><td align="center" style="font-size:16px;line-height:1.6;padding-bottom:28px">${esc(e.intro)}</td></tr>
    <tr><td align="center" style="padding:8px 0">
      <a href="${site}/results" style="display:inline-block;background:#5046e4;color:#ffffff;text-decoration:none;font-weight:600;font-size:15px;padding:14px 28px;border-radius:999px">${esc(e.button)}</a>
    </td></tr>
    <tr><td align="center" style="padding-top:24px;font-size:12px;color:#54525f">Stellar Origins · ${esc(landing.logoAlt)}</td></tr>
  </table>
</td></tr></table>
</body></html>`;
  const text = [e.heading, "", e.intro, "", `${e.button}: ${site}/results`].join("\n");
  return { html, text };
}

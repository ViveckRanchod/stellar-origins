/* eslint-disable jsx-a11y/alt-text -- react-pdf <Image> has no alt; a PDF picture is not an HTML <img> */
import { readFile } from "node:fs/promises";
import path from "node:path";
import { Document, Image, Page, StyleSheet, Text, View, renderToBuffer } from "@react-pdf/renderer";
import {
  characterBuild,
  characterImage,
  disruption,
  final,
  galaxies,
  galaxyHeadings,
  landing,
  results,
  type GalaxyId,
  type Question,
} from "@/content";

// Document 1: the student's feedback report, a PDF in the site's colours (globals.css).
// Pictures are read from public/ on the server (next.config.ts ships them with the function), because
// password-protected preview sites can't be fetched from inside themselves.
// ponytail: built-in Helvetica, not the site's Hanken Grotesk; register the font's .ttf with Font.register to match exactly.

type Answer = Record<string, string | string[] | undefined>;
type Score = { id: GalaxyId; percent: number };
type QA = [Question, Answer[string]];
export type ReportData = { name: string; date: string; scores: Score[]; answers: Record<string, Answer> };

const c = { void: "#060317", panel: "#10093a", line: "#1c1640", lilac: "#f4f0ff", ash: "#a8a6b7", fog: "#918ea0", lavender: "#9382ff" };

const s = StyleSheet.create({
  page: { backgroundColor: c.void, color: c.ash, fontFamily: "Helvetica", fontSize: 10.5, lineHeight: 1.5, padding: 40 },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 28 },
  logo: { width: 64 },
  meta: { textAlign: "right", fontSize: 9, color: c.fog },
  name: { fontSize: 14, color: c.lilac, fontFamily: "Helvetica-Bold" },
  title: { fontSize: 26, color: c.lilac, fontFamily: "Helvetica-Bold", marginBottom: 20 },
  h2: { fontSize: 16, color: c.lilac, fontFamily: "Helvetica-Bold", marginTop: 8, marginBottom: 12 },
  label: { fontSize: 8, letterSpacing: 1.5, textTransform: "uppercase", color: c.fog, marginBottom: 2 },
  card: { backgroundColor: c.panel, borderRadius: 8, overflow: "hidden" }, // one per page, so no margin to spill over
  cardBody: { padding: 16, gap: 6 },
  galaxyImage: { width: 190, height: 190, objectFit: "contain", alignSelf: "center", marginTop: 16, borderRadius: 6 }, // square artwork, name included
  bar: { height: 3, backgroundColor: c.line, borderRadius: 2, marginTop: 4 },
  summary: { backgroundColor: c.panel, borderRadius: 8, padding: 16, gap: 12 },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end" },
  galaxyName: { fontSize: 15, color: c.lilac, fontFamily: "Helvetica-Bold" },
  percent: { fontSize: 26, fontFamily: "Helvetica-Bold", color: c.lilac },
  italic: { fontFamily: "Helvetica-Oblique" },
  bold: { fontFamily: "Helvetica-Bold", color: c.lilac },
  bullet: { flexDirection: "row", gap: 6, paddingLeft: 4 },
  character: { width: 180, height: 240, objectFit: "contain", alignSelf: "center", marginBottom: 12 },
  qa: { borderLeftWidth: 2, borderLeftColor: c.lavender, paddingLeft: 12, marginBottom: 14 },
});

// **word** → bold, like Rich in kit.tsx.
const Rich = ({ text }: { text: string }) =>
  text.split(/\*\*(.+?)\*\*/).map((part, i) => (i % 2 ? <Text key={i} style={s.bold}>{part}</Text> : part));

const file = (publicPath: string) =>
  readFile(path.join(process.cwd(), "public", publicPath)).then(
    (data) => ({ data, format: publicPath.endsWith(".png") ? ("png" as const) : ("jpg" as const) }),
    () => null, // not uploaded yet: leave the picture out
  );

// Written answers in flow order, grouped by activity. Skipped optional answers are left out.
function reflections(a: Record<string, Answer>) {
  const f = characterBuild.future;
  const list = (step: string, items: Question[]) => items.map((q, i): QA => [q, a[step]?.[`answer_${i + 1}`]]);
  const groups: { heading: string; items: QA[] }[] = [
    {
      heading: characterBuild.activityName,
      items: [
        [characterBuild.avatar.justification, a.avatar?.justification],
        [characterBuild.customize.justification, a.customize?.justification],
      ],
    },
    {
      heading: f.title,
      items: [
        [{ text: f.question }, a.future?.future],
        [{ text: f.why }, a.future?.future_why],
        [{ text: f.needs }, a.future?.future_needs],
      ],
    },
    { heading: disruption.questions.title, items: list("disruption-questions", disruption.questions.items) },
    { heading: disruption.chat.title, items: list("group", disruption.chat.items) },
  ];
  return groups
    .map((g) => ({ ...g, items: g.items.filter(([, ans]) => String(ans ?? "").trim()) }))
    .filter((g) => g.items.length);
}

export async function feedbackReport({ name, date, scores, answers }: ReportData) {
  const r = final.report;
  const n = Number(String(answers.avatar?.avatar).split("_")[1]);
  const x = Number(String(answers.customize?.accessory).split("_")[1]) || 0;
  const [logo, character, ...galaxyImages] = await Promise.all([
    file(landing.logo),
    n ? file(characterImage(n, x)) : null,
    ...scores.map((g) => file(galaxies[g.id].image)),
  ]);

  const doc = (
    <Document title={r.fileName.replace(/\.pdf$/, "")} author="Stellar Origins">
      <Page size="A4" style={s.page}>
        <View style={s.header} fixed>
          {logo ? <Image src={logo} style={s.logo} /> : <Text style={s.name}>Stellar Origins</Text>}
          <View>
            <Text style={[s.meta, s.name]}>{name}</Text>
            <Text style={s.meta}>{date}</Text>
          </View>
        </View>

        <Text style={s.title}>{r.title}</Text>

        {character && (
          <View wrap={false}>
            <Text style={s.h2}>{r.characterTitle}</Text>
            <Image src={character} style={s.character} />
          </View>
        )}

        <Text style={s.h2}>{r.galaxiesTitle}</Text>
        <View style={s.summary} wrap={false}>
          {scores.map((score, i) => (
            <View key={score.id}>
              <View style={s.row}>
                <Text style={i === 0 ? s.bold : {}}>{galaxies[score.id].name}</Text>
                <Text style={s.bold}>{score.percent}%</Text>
              </View>
              <View style={s.bar}>
                <View style={{ width: `${score.percent}%`, height: 3, borderRadius: 2, backgroundColor: c.lavender }} />
              </View>
            </View>
          ))}
        </View>

        {scores.map((score, i) => {
          const g = galaxies[score.id];
          const img = galaxyImages[i];
          return (
            <View key={score.id} style={s.card} wrap={false} break>
              {img && <Image src={img} style={s.galaxyImage} />}
              <View style={s.cardBody}>
                <View style={s.row}>
                  <View>
                    <Text style={s.label}>{results.rank(i + 1)}</Text>
                    <Text style={s.galaxyName}>{g.name}</Text>
                  </View>
                  <Text style={[s.percent, i === 0 ? { color: c.lavender } : {}]}>{score.percent}%</Text>
                </View>
                <Text style={s.italic}>{g.tagline}</Text>
                {i === 0 && <Text style={s.bold}>{g.topMatch}</Text>}
                <Text><Rich text={g.description} /></Text>
                <Text style={s.bold}>{galaxyHeadings.feel}:</Text>
                {g.feel.map((t) => <View key={t} style={s.bullet}><Text>•</Text><Text>{t}</Text></View>)}
                <Text style={s.bold}>{galaxyHeadings.offered}:</Text>
                {g.offered.map((t) => <View key={t} style={s.bullet}><Text>•</Text><Text>{t}</Text></View>)}
                <Text><Text style={s.bold}>{galaxyHeadings.success}</Text> {g.success}</Text>
                <Text>{g.closing}</Text>
              </View>
            </View>
          );
        })}

        {reflections(answers).map((group, gi) => (
          <View key={group.heading} break={gi === 0}>
            {gi === 0 && <Text style={s.title}>{r.answersTitle}</Text>}
            <Text style={s.h2}>{group.heading}</Text>
            {group.items.map(([q, ans]) => (
              <View key={q.text} style={s.qa} wrap={false}>
                {q.title && <Text style={s.bold}>{q.title}</Text>}
                <Text style={{ color: c.fog, marginBottom: 4 }}><Rich text={q.text} /></Text>
                <Text style={{ color: c.lilac }}>{String(ans)}</Text>
              </View>
            ))}
          </View>
        ))}
      </Page>
    </Document>
  );
  return renderToBuffer(doc);
}

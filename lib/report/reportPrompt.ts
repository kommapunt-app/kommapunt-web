import { getReportPurposeLabel } from "./types";
import { VALUE_DETAIL_HEADINGS } from "@/lib/value-detail-labels";
import type {
  ReportBubbleSnapshot,
  ReportGenerateRequest,
  ReportPurpose,
} from "./types";

const SYSTEM_PROMPT = `Jy is 'n reflektiewe gids vir Komma. — 'n Afrikaanse platform oor waardes, prioriteite en standpunte.

Jou rol kombineer:
- 'n sielkundige se empatie en luisterhouding
- 'n waardespecialis se begrip van hoe prioriteite mense se keuses vorm
- 'n reflektiewe gespreksleier wat mense help om na te dink, nie om hulle te etiketteer nie

Skryf in Afrikaans. Komma.-toon: warm, duidelik, menslik, nadenkend.

STreng reëls:
- Dit is reflektiewe terugvoer, NIE 'n sielkundige diagnose nie
- Moenie sekereheid voorgee nie ("jy is definitief...", "dit bewys dat...")
- Gebruik taal soos "dit kan duid", "vir baie mense", "dit mag help om te dink"
- Moenie kliniese terme of patologie gebruik nie
- Respekteer dat waardes konteks en keuse beïnvloed
- Pas die lens van die verslag se doel aan (persoonlik, werk, ens.)
- Skryf prakties en toepaslik, sonder om te predik`;

function formatBubbleList(bubbles: ReportBubbleSnapshot[]): string {
  return bubbles
    .map(
      (bubble) =>
        `${bubble.rank}. ${bubble.nameAf} (${bubble.nameEn}) — score: ${bubble.score}`,
    )
    .join("\n");
}

export function buildReportUserPrompt(request: ReportGenerateRequest): string {
  const { form, bubbles } = request;
  const topFive = bubbles.slice(0, 5);
  const purposeLabel = getReportPurposeLabel(form.purpose);

  return `Skep 'n volledige Komma. terugvoerverslag vir hierdie persoon.

Gebruiker:
- Naam: ${form.name}
- Ouderdom: ${form.age}
- Doel van verslag: ${purposeLabel}

Top 5 Bubbles (meeste gewig):
${formatBubbleList(topFive)}

Volledige hiërargie (Top 10):
${formatBubbleList(bubbles.slice(0, 10))}

Verslag moet die volgende afdelings bevat (in Afrikaans):

1. **Hiërargie-interpretasie**
   Hoe pas die top waardes saam? Wat vertel die rangorde moontlik oor wat vir hierdie persoon gewig dra?

2. **Individuele waarde-verduidelikings**
   Vir elke Top 5 waarde: kort, persoonlike verduideliking in konteks van hul rang.
   Gebruik waar toepaslik hierdie Komma.-afdelingstitels:
   - "${VALUE_DETAIL_HEADINGS.whenImportant}"
   - "${VALUE_DETAIL_HEADINGS.strength}"
   - "${VALUE_DETAIL_HEADINGS.redFlags}"

3. **Gedrag in kontekste**
   Vir elk: konflik, kommunikasie, leierskap, kreatiwiteit, besluitneming, detail vs. groter prentjie, verandering, verhoudings.
   Skryf hoe hierdie waarde-hiërargie *kan* manifesteer — nie as feit nie.

4. **Sterkpunte**
   3–5 bullets: moontlike sterktes wat uit die hiërargie spruit.

5. **Blinde kolletjies**
   3–5 bullets: moontlike valkuile — wanneer flikker die ligte rooi vir hierdie waarde-hiërargie.

6. **Refleksievrae**
   5–8 open vrae vir persoonlike nadenke, gekoppel aan hul Top 5 en doel (${purposeLabel}).

Antwoord as gestruktureerde JSON wat pas by die KommaReportContent-skema.`;
}

export function buildReportPrompts(request: ReportGenerateRequest): {
  system: string;
  user: string;
} {
  return {
    system: SYSTEM_PROMPT,
    user: buildReportUserPrompt(request),
  };
}

export function getPurposeContextHint(purpose: ReportPurpose): string {
  const hints: Record<ReportPurpose, string> = {
    persoonlik:
      "Fokus op selfkennis, lewensrigting, innerlike kompas en persoonlike groei.",
    werk:
      "Fokus op werkplek-prioriteite, samewerking, prestasie en professionele keuses.",
    leierskap:
      "Fokus op hoe waardes leierstyle, besluite en span-dinamika kan beïnvloed.",
    verhouding:
      "Fokus op nabyheid, grense, kommunikasie en vertroue in verhoudings.",
    span:
      "Fokus op span-waardes, verskil, saamwerk en gedeelde rigting.",
  };

  return hints[purpose];
}

import { buildReportDocument } from "@/lib/report/reportTemplate";
import { buildReportPrompts } from "@/lib/report/reportPrompt";
import type {
  ReportGenerateRequest,
  ReportGenerateResponse,
  ReportPurpose,
} from "@/lib/report/types";
import { REPORT_PURPOSES } from "@/lib/report/types";

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPurpose(purpose: string): purpose is ReportPurpose {
  return REPORT_PURPOSES.some((option) => option.id === purpose);
}

function validateRequest(body: unknown): {
  ok: true;
  data: ReportGenerateRequest;
} | {
  ok: false;
  message: string;
} {
  if (!body || typeof body !== "object") {
    return { ok: false, message: "Ongeldige versoek." };
  }

  const payload = body as Partial<ReportGenerateRequest>;

  if (!payload.form || typeof payload.form !== "object") {
    return { ok: false, message: "Vormdata ontbreek." };
  }

  const { name, email, age, purpose } = payload.form;

  if (!name?.trim()) {
    return { ok: false, message: "Naam is verplig." };
  }

  if (!email?.trim() || !isValidEmail(email.trim())) {
    return { ok: false, message: "Geldige e-pos is verplig." };
  }

  if (!age?.trim()) {
    return { ok: false, message: "Ouderdom is verplig." };
  }

  if (!purpose || !isValidPurpose(purpose)) {
    return { ok: false, message: "Kies 'n geldige doel vir die verslag." };
  }

  if (!Array.isArray(payload.bubbles) || payload.bubbles.length === 0) {
    return { ok: false, message: "Bubble-resultate ontbreek." };
  }

  return {
    ok: true,
    data: {
      form: {
        name: name.trim(),
        email: email.trim(),
        age: age.trim(),
        purpose,
      },
      bubbles: payload.bubbles,
      bubbleImageDataUrl: payload.bubbleImageDataUrl ?? null,
    },
  };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = validateRequest(body);

    if (!validation.ok) {
      return Response.json(
        { status: "error", message: validation.message } satisfies ReportGenerateResponse,
        { status: 400 },
      );
    }

    const reportId = crypto.randomUUID();

    // Prepare prompts for future AI integration — not sent to a model yet.
    const prompts = buildReportPrompts(validation.data);
    void prompts;

    const document = buildReportDocument(validation.data, reportId);

    // Future: call AI with prompts, parse JSON into document.content, render PDF.
    void document;

    const response: ReportGenerateResponse = {
      status: "placeholder",
      message: "Jou volledige terugvoer kom binnekort.",
      reportId,
    };

    return Response.json(response);
  } catch {
    return Response.json(
      {
        status: "error",
        message: "Kon nie die verslag voorberei nie. Probeer weer.",
      } satisfies ReportGenerateResponse,
      { status: 500 },
    );
  }
}

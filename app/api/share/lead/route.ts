import { insertShareLead } from "@/lib/supabase/admin";
import {
  isValidEmail,
  type ShareLeadBubbleResult,
  type ShareLeadRequest,
  type ShareLeadResponse,
} from "@/lib/share-leads";

function isValidBubbleResults(value: unknown): value is ShareLeadBubbleResult[] {
  if (!Array.isArray(value) || value.length === 0) {
    return false;
  }

  return value.every(
    (item) =>
      item &&
      typeof item === "object" &&
      typeof item.id === "string" &&
      typeof item.rank === "number" &&
      typeof item.score === "number" &&
      typeof item.nameAf === "string" &&
      typeof item.nameEn === "string" &&
      typeof item.category === "string",
  );
}

function validateBody(body: unknown): ShareLeadRequest | null {
  if (!body || typeof body !== "object") {
    return null;
  }

  const payload = body as Partial<ShareLeadRequest>;
  const name = payload.name?.trim();
  const email = payload.email?.trim();

  if (!name || !email || !isValidEmail(email)) {
    return null;
  }

  if (!isValidBubbleResults(payload.bubbleResults)) {
    return null;
  }

  return {
    name,
    email,
    bubbleResults: payload.bubbleResults,
  };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const payload = validateBody(body);

    if (!payload) {
      return Response.json(
        {
          ok: false,
          message: "Naam, geldige e-pos en Bubble-resultate is verplig.",
        } satisfies ShareLeadResponse,
        { status: 400 },
      );
    }

    await insertShareLead({
      name: payload.name,
      email: payload.email,
      bubble_results: payload.bubbleResults,
    });

    return Response.json({
      ok: true,
      message: "Besonderhede gestoor.",
    } satisfies ShareLeadResponse);
  } catch (error) {
    const message =
      error instanceof Error && error.message === "Database is not configured."
        ? "Kon nie jou besonderhede stoor nie. Probeer later weer."
        : "Kon nie jou besonderhede stoor nie. Probeer weer.";

    return Response.json(
      { ok: false, message } satisfies ShareLeadResponse,
      { status: 500 },
    );
  }
}

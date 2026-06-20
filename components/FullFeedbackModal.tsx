"use client";

import { useEffect, useState, type RefObject } from "react";
import { Button } from "@/components/Button";
import type { RankedBubbleResult } from "@/lib/results";
import { exportBubbleVisualAsPng } from "@/lib/share-bubbles";
import {
  REPORT_PURPOSES,
  type ReportGenerateResponse,
  type ReportPurpose,
  type ReportRequestForm,
  toReportBubbleSnapshots,
} from "@/lib/report/types";

type ModalStep = "form" | "loading" | "result";

interface FullFeedbackModalProps {
  open: boolean;
  onClose: () => void;
  rankedBubbles: RankedBubbleResult[];
  exportRef: RefObject<HTMLElement | null>;
  photoUrl?: string | null;
}

const EMPTY_FORM: ReportRequestForm = {
  name: "",
  email: "",
  age: "",
  purpose: "persoonlik",
};

const inputClassName =
  "w-full rounded-2xl border-4 border-komma-black bg-white px-4 py-3 text-base font-semibold shadow-[3px_3px_0_0_#000] outline-none transition-shadow placeholder:text-komma-black/40 focus:shadow-[4px_4px_0_0_#FF1493] sm:px-5 sm:py-3.5";

export function FullFeedbackModal({
  open,
  onClose,
  rankedBubbles,
  exportRef,
  photoUrl = null,
}: FullFeedbackModalProps) {
  const [step, setStep] = useState<ModalStep>("form");
  const [form, setForm] = useState<ReportRequestForm>(EMPTY_FORM);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [resultMessage, setResultMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && step !== "loading") {
        onClose();
      }
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose, step]);

  useEffect(() => {
    if (!open) {
      setStep("form");
      setForm(EMPTY_FORM);
      setErrorMessage(null);
      setResultMessage(null);
    }
  }, [open]);

  function updateField<K extends keyof ReportRequestForm>(
    key: K,
    value: ReportRequestForm[K],
  ) {
    setForm((current) => ({ ...current, [key]: value }));
    setErrorMessage(null);
  }

  async function blobToDataUrl(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(blob);
    });
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setErrorMessage(null);
    setStep("loading");

    try {
      let bubbleImageDataUrl: string | null = null;
      const exportElement = exportRef.current;

      if (exportElement) {
        try {
          const blob = await exportBubbleVisualAsPng(exportElement, photoUrl);
          bubbleImageDataUrl = await blobToDataUrl(blob);
        } catch {
          bubbleImageDataUrl = null;
        }
      }

      const response = await fetch("/api/report/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          form,
          bubbles: toReportBubbleSnapshots(rankedBubbles),
          bubbleImageDataUrl,
        }),
      });

      const data = (await response.json()) as ReportGenerateResponse;

      if (!response.ok || data.status === "error") {
        setErrorMessage(data.message ?? "Kon nie die verslag voorberei nie.");
        setStep("form");
        return;
      }

      setResultMessage(data.message);
      setStep("result");
    } catch {
      setErrorMessage("Kon nie die verslag voorberei nie. Probeer weer.");
      setStep("form");
    }
  }

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center px-4 py-6 sm:items-center sm:px-6 sm:py-8">
      <button
        type="button"
        className="absolute inset-0 bg-komma-black/45"
        aria-label="Sluit modal"
        onClick={step === "loading" ? () => {} : onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="full-feedback-modal-title"
        className="relative max-h-[90vh] w-full max-w-md overflow-y-auto rounded-[2rem] border-4 border-komma-black bg-komma-yellow p-5 shadow-[6px_6px_0_0_#000] sm:p-7"
      >
        {step !== "loading" ? (
          <button
            type="button"
            onClick={onClose}
            aria-label="Sluit"
            className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full border-4 border-komma-black bg-[#F5F5F0] text-xl font-extrabold shadow-[3px_3px_0_0_#000] transition-transform hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_#FF1493] sm:right-5 sm:top-5"
          >
            ×
          </button>
        ) : null}

        <h2
          id="full-feedback-modal-title"
          className="mb-2 pr-12 text-2xl font-extrabold tracking-tight sm:text-3xl"
        >
          Volledige terugvoer
        </h2>

        {step === "form" ? (
          <>
            <p className="mb-6 text-sm font-semibold leading-relaxed text-komma-black/70 sm:text-base">
              Kry &apos;n volledige Komma.-verslag gebaseer op jou Bubble-hiërargie.
              Reflektiewe terugvoer — nie &apos;n sielkundige diagnose nie.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="report-name"
                  className="mb-1.5 block text-sm font-extrabold"
                >
                  Naam
                </label>
                <input
                  id="report-name"
                  type="text"
                  required
                  autoComplete="name"
                  value={form.name}
                  onChange={(event) => updateField("name", event.target.value)}
                  className={inputClassName}
                  placeholder="Jou naam"
                />
              </div>

              <div>
                <label
                  htmlFor="report-email"
                  className="mb-1.5 block text-sm font-extrabold"
                >
                  E-pos
                </label>
                <input
                  id="report-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={form.email}
                  onChange={(event) => updateField("email", event.target.value)}
                  className={inputClassName}
                  placeholder="naam@voorbeeld.co.za"
                />
              </div>

              <div>
                <label
                  htmlFor="report-age"
                  className="mb-1.5 block text-sm font-extrabold"
                >
                  Ouderdom
                </label>
                <input
                  id="report-age"
                  type="text"
                  required
                  inputMode="numeric"
                  value={form.age}
                  onChange={(event) => updateField("age", event.target.value)}
                  className={inputClassName}
                  placeholder="bv. 34"
                />
              </div>

              <fieldset>
                <legend className="mb-2 text-sm font-extrabold">
                  Doel van verslag
                </legend>
                <div className="flex flex-wrap gap-2">
                  {REPORT_PURPOSES.map((option) => (
                    <label
                      key={option.id}
                      className={`cursor-pointer rounded-full border-4 border-komma-black px-4 py-2 text-sm font-extrabold shadow-[3px_3px_0_0_#000] transition-transform hover:-translate-y-0.5 ${
                        form.purpose === option.id
                          ? "bg-komma-pink text-white"
                          : "bg-white"
                      }`}
                    >
                      <input
                        type="radio"
                        name="report-purpose"
                        value={option.id}
                        checked={form.purpose === option.id}
                        onChange={() =>
                          updateField("purpose", option.id as ReportPurpose)
                        }
                        className="sr-only"
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
              </fieldset>

              {errorMessage ? (
                <p className="text-sm font-bold text-komma-pink">{errorMessage}</p>
              ) : null}

              <Button type="submit" className="w-full px-6 py-4 text-base sm:text-lg">
                Skep my verslag
              </Button>
            </form>
          </>
        ) : null}

        {step === "loading" ? (
          <div className="py-8 text-center">
            <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full border-4 border-komma-black bg-komma-pink shadow-[4px_4px_0_0_#000]">
              <span className="size-8 animate-pulse rounded-full border-4 border-komma-black bg-white" />
            </div>
            <p className="text-lg font-extrabold sm:text-xl">
              Jou verslag word voorberei…
            </p>
            <p className="mt-2 text-sm font-semibold text-komma-black/65 sm:text-base">
              Ons lees jou Bubble-hiërargie en bou jou persoonlike terugvoer.
            </p>
          </div>
        ) : null}

        {step === "result" ? (
          <div className="py-4">
            <div className="mb-6 rounded-2xl border-4 border-komma-black bg-[#F5F5F0] px-5 py-6 text-center shadow-[4px_4px_0_0_#000]">
              <p className="text-lg font-extrabold leading-relaxed sm:text-xl">
                {resultMessage ?? "Jou volledige terugvoer kom binnekort."}
              </p>
              <p className="mt-3 text-sm font-semibold text-komma-black/65 sm:text-base">
                Ons stuur jou verslag na {form.email} sodra dit gereed is.
              </p>
            </div>

            <Button onClick={onClose} className="w-full px-6 py-4 text-base sm:text-lg">
              Goed
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

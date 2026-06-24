"use client";

import { useEffect, useState, type RefObject } from "react";
import { Button } from "@/components/Button";
import { DateOfBirthField } from "@/components/DateOfBirthField";
import { persistBubbleProfile } from "@/lib/bubble-profile/persist";
import { PROVINCE_OPTIONS } from "@/lib/bubble-profile/demographics";
import {
  inputClassName,
  selectClassName,
} from "@/lib/bubble-profile/form-styles";
import { buildBubbleProfileContact } from "@/lib/bubble-profile/session";
import type { BubbleProfileContact } from "@/lib/bubble-profile/types";
import { downloadBubbleVisual } from "@/lib/bubble-profile/export-actions";
import type { RankedBubbleResult } from "@/lib/results";

interface ShareBubblesModalProps {
  open: boolean;
  onClose: () => void;
  exportRef: RefObject<HTMLElement | null>;
  rankedBubbles: RankedBubbleResult[];
  photoUrl?: string | null;
  onSaved?: (contact: BubbleProfileContact) => void;
}

export function ShareBubblesModal({
  open,
  onClose,
  exportRef,
  rankedBubbles,
  photoUrl = null,
  onSaved,
}: ShareBubblesModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [province, setProvince] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && !isSubmitting) {
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
  }, [open, onClose, isSubmitting]);

  useEffect(() => {
    if (!open) {
      setName("");
      setEmail("");
      setDateOfBirth("");
      setProvince("");
      setErrorMessage(null);
      setIsSubmitting(false);
    }
  }, [open]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setErrorMessage(null);

    const contactResult = buildBubbleProfileContact({
      name,
      email,
      dateOfBirth,
      province: province as BubbleProfileContact["province"],
    });

    if ("error" in contactResult) {
      setErrorMessage(contactResult.error);
      return;
    }

    setIsSubmitting(true);

    try {
      const savedContact = contactResult.contact;

      await persistBubbleProfile(rankedBubbles, savedContact);
      onSaved?.(savedContact);
      await downloadBubbleVisual(exportRef, photoUrl);
      onClose();
    } catch (error) {
      console.error("[ShareBubblesModal] save failed", error);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Kon nie jou Bubbles af laai nie. Probeer weer.",
      );
    } finally {
      setIsSubmitting(false);
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
        onClick={isSubmitting ? () => {} : onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="share-bubbles-modal-title"
        className="relative max-h-[90vh] w-full max-w-md overflow-y-auto rounded-[2rem] border-4 border-komma-black bg-komma-yellow p-5 shadow-[6px_6px_0_0_#000] sm:p-7"
      >
        {!isSubmitting ? (
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
          id="share-bubbles-modal-title"
          className="mb-2 pr-12 text-2xl font-extrabold tracking-tight sm:text-3xl"
        >
          Deel my Bubbles
        </h2>

        {isSubmitting ? (
          <div className="py-8 text-center">
            <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full border-4 border-komma-black bg-komma-pink shadow-[4px_4px_0_0_#000]">
              <span className="size-8 animate-pulse rounded-full border-4 border-komma-black bg-white" />
            </div>
            <p className="text-lg font-extrabold sm:text-xl">
              Jou Bubbles word voorberei…
            </p>
            <p className="mt-2 text-sm font-semibold text-komma-black/65 sm:text-base">
              Ons stoor jou profiel en laai jou Bubbles af.
            </p>
          </div>
        ) : (
          <>
            <p className="mb-6 text-sm font-semibold leading-relaxed text-komma-black/70 sm:text-base">
              Vul die vorm in om jou profiel te stoor en af te laai.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="share-name" className="mb-1.5 block text-sm font-extrabold">
                  Naam
                </label>
                <input
                  id="share-name"
                  type="text"
                  required
                  autoComplete="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className={inputClassName}
                  placeholder="Jou naam"
                />
              </div>

              <div>
                <label htmlFor="share-email" className="mb-1.5 block text-sm font-extrabold">
                  E-pos
                </label>
                <input
                  id="share-email"
                  type="email"
                  required
                  autoComplete="email"
                  inputMode="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className={inputClassName}
                  placeholder="naam@voorbeeld.co.za"
                />
              </div>

              <div className="sm:col-span-2">
                <DateOfBirthField
                  id="share-date-of-birth"
                  value={dateOfBirth}
                  onChange={setDateOfBirth}
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="share-province" className="mb-1.5 block text-sm font-extrabold">
                  Provinsie
                </label>
                <select
                  id="share-province"
                  required
                  value={province}
                  onChange={(event) => setProvince(event.target.value)}
                  className={selectClassName}
                >
                  <option value="" disabled>
                    Kies
                  </option>
                  {PROVINCE_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {errorMessage ? (
                <p className="text-sm font-bold text-komma-pink">{errorMessage}</p>
              ) : null}

              <Button
                type="submit"
                className="w-full px-6 py-4 text-base sm:text-lg"
              >
                Laai my Bubbles af
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

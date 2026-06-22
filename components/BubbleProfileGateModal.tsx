"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/Button";
import { buildBubbleProfileRequest } from "@/lib/bubble-profile/build-payload";
import { saveBubbleProfile } from "@/lib/bubble-profile/api";
import {
  AGE_GROUP_OPTIONS,
  PROVINCE_OPTIONS,
} from "@/lib/bubble-profile/demographics";
import {
  inputClassName,
  selectClassName,
} from "@/lib/bubble-profile/form-styles";
import {
  saveBubbleProfileToSession,
  validateBubbleProfileContact,
} from "@/lib/bubble-profile/session";
import type { BubbleProfileContact } from "@/lib/bubble-profile/types";
import type { RankedBubbleResult } from "@/lib/results";

interface BubbleProfileGateModalProps {
  open: boolean;
  onClose: () => void;
  onSaved: (contact: BubbleProfileContact) => void;
  rankedBubbles: RankedBubbleResult[];
  initialContact?: BubbleProfileContact | null;
}

export function BubbleProfileGateModal({
  open,
  onClose,
  onSaved,
  rankedBubbles,
  initialContact = null,
}: BubbleProfileGateModalProps) {
  const [name, setName] = useState(initialContact?.name ?? "");
  const [email, setEmail] = useState(initialContact?.email ?? "");
  const [ageGroup, setAgeGroup] = useState(initialContact?.ageGroup ?? "");
  const [province, setProvince] = useState(initialContact?.province ?? "");
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
      setErrorMessage(null);
      setIsSubmitting(false);
    }
  }, [open]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setErrorMessage(null);

    const contact = {
      name,
      email,
      ageGroup: ageGroup as BubbleProfileContact["ageGroup"],
      province: province as BubbleProfileContact["province"],
    };

    const validationError = validateBubbleProfileContact(contact);

    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = buildBubbleProfileRequest(rankedBubbles, contact);
      await saveBubbleProfile(payload);

      const savedContact: BubbleProfileContact = {
        name: contact.name.trim(),
        email: contact.email.trim(),
        ageGroup: contact.ageGroup,
        province: contact.province,
      };

      saveBubbleProfileToSession(savedContact);
      onSaved(savedContact);
    } catch (error) {
      console.error("[BubbleProfileGateModal] save failed", error);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Kon nie jou profiel stoor nie. Probeer weer.",
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
        className="absolute inset-0 bg-komma-black/50 backdrop-blur-sm"
        aria-label="Sluit modal"
        onClick={isSubmitting ? () => {} : onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="bubble-profile-gate-title"
        className="relative z-10 max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-[2rem] border-4 border-komma-black bg-komma-yellow p-5 shadow-[6px_6px_0_0_#FF1493] sm:p-7"
      >
        {!isSubmitting ? (
          <button
            type="button"
            onClick={onClose}
            aria-label="Sluit"
            className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full border-4 border-komma-black bg-white text-xl font-extrabold shadow-[3px_3px_0_0_#000] transition-transform hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_#FF1493] sm:right-5 sm:top-5"
          >
            ×
          </button>
        ) : null}

        <div className="mb-5 flex items-start gap-4 pr-10">
          <div className="flex size-14 shrink-0 items-center justify-center rounded-full border-4 border-komma-black bg-komma-pink text-xl font-extrabold shadow-[3px_3px_0_0_#000] sm:size-16 sm:text-2xl">
            i
          </div>
          <div>
            <h2
              id="bubble-profile-gate-title"
              className="text-2xl font-extrabold tracking-tight sm:text-3xl"
            >
              Eers &apos;n vinnige vorm
            </h2>
            <p className="mt-1 text-sm font-semibold leading-relaxed text-komma-black/70 sm:text-base">
              Voordat jy jou Bubbles kan sien, aflaai of deel, het ons net &apos;n
              paar minimumbesonderhede nodig.
            </p>
          </div>
        </div>

        {isSubmitting ? (
          <div className="py-8 text-center">
            <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full border-4 border-komma-black bg-komma-pink shadow-[4px_4px_0_0_#000]">
              <span className="size-8 animate-pulse rounded-full border-4 border-komma-black bg-white" />
            </div>
            <p className="text-lg font-extrabold sm:text-xl">Stoor tans jou profiel…</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="gate-name" className="mb-1.5 block text-sm font-extrabold">
                  Naam
                </label>
                <input
                  id="gate-name"
                  type="text"
                  required
                  autoComplete="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className={inputClassName}
                  placeholder="Jou naam"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="gate-email" className="mb-1.5 block text-sm font-extrabold">
                  E-pos
                </label>
                <input
                  id="gate-email"
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

              <div>
                <label htmlFor="gate-age" className="mb-1.5 block text-sm font-extrabold">
                  Ouderdom
                </label>
                <select
                  id="gate-age"
                  required
                  value={ageGroup}
                  onChange={(event) => setAgeGroup(event.target.value)}
                  className={selectClassName}
                >
                  <option value="" disabled>
                    Kies
                  </option>
                  {AGE_GROUP_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="gate-province" className="mb-1.5 block text-sm font-extrabold">
                  Provinsie
                </label>
                <select
                  id="gate-province"
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
            </div>

            {errorMessage ? (
              <p className="text-sm font-bold text-komma-pink">{errorMessage}</p>
            ) : null}

            <Button
              type="submit"
              className="w-full px-6 py-4 text-base sm:text-lg"
            >
              Stoor en ontsluit
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}

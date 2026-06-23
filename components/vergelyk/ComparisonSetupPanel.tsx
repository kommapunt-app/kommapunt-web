"use client";

import { useState } from "react";
import { Button } from "@/components/Button";
import { getComparisonTypeDefinition } from "@/lib/profile-comparison/comparison-types";
import type { ComparisonType } from "@/lib/profile-comparison/types";

interface ComparisonSetupPanelProps {
  comparisonType: ComparisonType;
  initiatorProfileId: string;
  disabled?: boolean;
  isSubmitting?: boolean;
  onSubmit: (input: {
    leftProfileId: string;
    rightProfileId: string;
  }) => Promise<void>;
}

export function ComparisonSetupPanel({
  comparisonType,
  initiatorProfileId,
  disabled = false,
  isSubmitting = false,
  onSubmit,
}: ComparisonSetupPanelProps) {
  const typeDefinition = getComparisonTypeDefinition(comparisonType);
  const [leftProfileId, setLeftProfileId] = useState(initiatorProfileId);
  const [rightProfileId, setRightProfileId] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);

    if (!leftProfileId.trim() || !rightProfileId.trim()) {
      setErrorMessage("Beide profiel-ID's is verplig.");
      return;
    }

    if (leftProfileId.trim() === rightProfileId.trim()) {
      setErrorMessage("Kies twee verskillende profiele.");
      return;
    }

    try {
      await onSubmit({
        leftProfileId: leftProfileId.trim(),
        rightProfileId: rightProfileId.trim(),
      });
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Kon nie vergelyking uitvoer nie.",
      );
    }
  }

  return (
    <section className="rounded-[2rem] border-4 border-komma-black bg-white p-6 shadow-[6px_6px_0_0_#000] sm:p-8">
      <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
        Begin &apos;n vergelyking
      </h2>
      <p className="mt-2 text-sm font-semibold text-komma-black/70 sm:text-base">
        {typeDefinition?.label ?? "Profielvergelyking"} — plak publieke profiel-ID&apos;s
        of gebruik jou eie profiel as beginpunt.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="left-profile-id" className="mb-1.5 block text-sm font-extrabold">
              {typeDefinition?.leftLabel ?? "Links"}
            </label>
            <input
              id="left-profile-id"
              type="text"
              value={leftProfileId}
              onChange={(event) => setLeftProfileId(event.target.value)}
              disabled={disabled || isSubmitting}
              className="w-full rounded-2xl border-4 border-komma-black bg-[#FFFEF5] px-4 py-3 text-sm font-semibold shadow-[3px_3px_0_0_#000] focus:outline-none focus:ring-2 focus:ring-komma-pink"
              placeholder="Profiel-ID"
            />
          </div>

          <div>
            <label htmlFor="right-profile-id" className="mb-1.5 block text-sm font-extrabold">
              {typeDefinition?.rightLabel ?? "Regs"}
            </label>
            <input
              id="right-profile-id"
              type="text"
              value={rightProfileId}
              onChange={(event) => setRightProfileId(event.target.value)}
              disabled={disabled || isSubmitting}
              className="w-full rounded-2xl border-4 border-komma-black bg-[#FFFEF5] px-4 py-3 text-sm font-semibold shadow-[3px_3px_0_0_#000] focus:outline-none focus:ring-2 focus:ring-komma-pink"
              placeholder="Profiel-ID"
            />
          </div>
        </div>

        <p className="text-xs font-semibold text-komma-black/55">
          Profiel-ID&apos;s kom van publieke profielskakels soos{" "}
          <code className="rounded bg-komma-yellow px-1 py-0.5">
            kommapunt.co.za/profile/…
          </code>
        </p>

        {errorMessage ? (
          <p className="text-sm font-bold text-komma-pink">{errorMessage}</p>
        ) : null}

        <Button
          type="submit"
          disabled={disabled || isSubmitting}
          className="w-full px-6 py-4 text-base sm:w-auto sm:text-lg"
        >
          {isSubmitting ? "Vergelyk tans…" : "Vergelyk profiele"}
        </Button>
      </form>
    </section>
  );
}

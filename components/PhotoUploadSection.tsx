"use client";

import { useRef } from "react";

interface PhotoUploadSectionProps {
  photoUrl: string | null;
  onPhotoChange: (url: string | null) => void;
}

export function PhotoUploadSection({
  photoUrl,
  onPhotoChange,
}: PhotoUploadSectionProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file?.type.startsWith("image/")) {
      return;
    }

    onPhotoChange(URL.createObjectURL(file));
  }

  function handleRemove() {
    onPhotoChange(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  return (
    <section className="mx-auto mb-10 max-w-md text-center sm:mb-12">
      <h2 className="text-xl font-extrabold tracking-tight sm:text-2xl">
        Voeg jou foto by
      </h2>

      <div className="mt-4 flex flex-col items-center gap-3">
        <input
          ref={inputRef}
          id="photo-upload"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="sr-only"
        />
        <label htmlFor="photo-upload">
          <span className="inline-flex cursor-pointer items-center justify-center rounded-full border-4 border-komma-black bg-white px-6 py-3 text-sm font-bold shadow-[4px_4px_0_0_#000] transition-all hover:-translate-y-0.5 hover:bg-komma-yellow hover:shadow-[5px_5px_0_0_#000] active:translate-y-0 sm:text-base">
            Laai foto op
          </span>
        </label>

        {photoUrl && (
          <button
            type="button"
            onClick={handleRemove}
            className="text-sm font-semibold text-komma-black/60 underline decoration-komma-pink decoration-2 underline-offset-4 transition-colors hover:text-komma-black"
          >
            Verwyder foto
          </button>
        )}
      </div>

      <p className="mt-3 text-sm leading-relaxed text-komma-black/55">
        Jou foto bly net op jou toestel vir hierdie weergawe.
      </p>
    </section>
  );
}

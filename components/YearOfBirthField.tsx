"use client";

import {
  getDefaultYearOfBirth,
  getYearOfBirthOptions,
} from "@/lib/bubble-profile/year-of-birth";
import { selectClassName } from "@/lib/bubble-profile/form-styles";

interface YearOfBirthFieldProps {
  id: string;
  value: number;
  onChange: (value: number) => void;
  required?: boolean;
  className?: string;
}

export function YearOfBirthField({
  id,
  value,
  onChange,
  required = true,
  className = "",
}: YearOfBirthFieldProps) {
  const years = getYearOfBirthOptions();
  const selectedYear = value || getDefaultYearOfBirth();

  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-extrabold">
        Year of Birth
      </label>
      <select
        id={id}
        name={id}
        required={required}
        value={String(selectedYear)}
        onChange={(event) => {
          const nextValue = Number(event.target.value);

          if (Number.isInteger(nextValue)) {
            onChange(nextValue);
          }
        }}
        className={`${selectClassName} min-h-[3.25rem]`}
      >
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
      <p className="mt-2 text-xs font-semibold leading-relaxed text-komma-black/60 sm:text-sm">
        Your age group will be calculated automatically.
      </p>
    </div>
  );
}

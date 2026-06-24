"use client";

import {
  getMaxDateOfBirthInput,
  getMinDateOfBirthInput,
} from "@/lib/bubble-profile/date-of-birth";
import { inputClassName } from "@/lib/bubble-profile/form-styles";

interface DateOfBirthFieldProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  className?: string;
}

export function DateOfBirthField({
  id,
  value,
  onChange,
  required = true,
  className = "",
}: DateOfBirthFieldProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-extrabold">
        Date of Birth
      </label>
      <input
        id={id}
        name={id}
        type="date"
        required={required}
        value={value}
        min={getMinDateOfBirthInput()}
        max={getMaxDateOfBirthInput()}
        onChange={(event) => onChange(event.target.value)}
        className={`${inputClassName} min-h-[3.25rem] appearance-none`}
      />
      <p className="mt-2 text-xs font-semibold leading-relaxed text-komma-black/60 sm:text-sm">
        Your age group will be calculated automatically.
      </p>
    </div>
  );
}

'use client';

import { SelectProps } from '@radix-ui/react-select';
import { FormLabel } from './form';

export type OptionFields = { value: string; label: string }[];

type SelectFieldProps = {
  label?: string;
  options: OptionFields;
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
} & SelectProps;

export default function SelectField({
  label,
  options,
  value,
  placeholder = "選択してください",
  onChange,
}: SelectFieldProps) {
  return (
    <div>
      {label && <FormLabel>{label}</FormLabel>}
      <select value={value} onChange={(e) => onChange?.(e.target.value)} className="flex h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm w-[180px]">
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

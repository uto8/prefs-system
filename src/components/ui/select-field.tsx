'use client';

import { SelectProps } from '@radix-ui/react-select';
import { FieldError } from 'react-hook-form';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectGroup,
    SelectItem
} from '../ui/select';

type SelectFieldVariant = 'outlined' | 'vertical' | 'inline';

type SelectFieldProps = {
    variant?: SelectFieldVariant;
    label?: string;
    options: { value: string; label: string }[];
    value?: string;
    placeholder?: string | false;
    errors?: FieldError | undefined,
    onChange?: (value: string) => void;
    onBlur?: React.FocusEventHandler<HTMLSelectElement>;
} & SelectProps;

export default function SelectField({
    variant = 'outlined',
    label,
    options,
    value,
    placeholder = false,
    errors,
    onChange,
    onOpenChange,
}: SelectFieldProps) {
  console.log(errors)
  console.log(variant)
    return (
      <>
      <label htmlFor="">{label}</label>
        <Select
          value={value && value !== '' ? value : 'none'}
          onValueChange={(val) => onChange?.(val === 'none' ? '' : val)}
          onOpenChange={(open) => onOpenChange?.(open)}
        >
          <SelectTrigger>
              <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {placeholder && <SelectItem value="none">{placeholder}</SelectItem>}
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </>

    );
}
